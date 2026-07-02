import { useState, useEffect, useRef } from 'react';

export const useMicrophone = () => {
  const [isSupported, setIsSupported] = useState(true);
  const [hasPermission, setHasPermission] = useState(null); // null = unknown, true = granted, false = denied
  const [isBlowing, setIsBlowing] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Check support
    const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasAudioContext = !!(window.AudioContext || window.webkitAudioContext);
    
    if (!hasMediaDevices || !hasAudioContext) {
      setIsSupported(false);
      setHasPermission(false);
    }

    // Cleanup on unmount
    return () => {
      stopMic();
    };
  }, []);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      setHasPermission(true);
      startAnalyzing(stream);
      return true;
    } catch (err) {
      console.warn("Microphone access denied:", err);
      setHasPermission(false);
      setError(err);
      return false;
    }
  };

  const startAnalyzing = (stream) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      
      // We want high frequency resolution
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Blowing into a microphone creates a lot of low-frequency wind noise.
        // We will isolate the lower frequencies (bins 0 to 6) to detect blows.
        let lowFreqSum = 0;
        const lowFreqCount = 6;
        for (let i = 0; i < lowFreqCount; i++) {
          lowFreqSum += dataArray[i];
        }
        const lowFreqAverage = lowFreqSum / lowFreqCount;
        
        // General volume (RMS style)
        let totalSum = 0;
        for (let i = 0; i < bufferLength; i++) {
          totalSum += dataArray[i];
        }
        const avgVolume = totalSum / bufferLength;
        
        const normVolume = Math.min(1, avgVolume / 128);
        const normLowFreq = Math.min(1, lowFreqAverage / 128);

        setVolume(normVolume);

        // Blow detection threshold: high level of low-frequency wind turbulence
        if (normLowFreq > 0.45) {
          setIsBlowing(true);
        } else {
          setIsBlowing(false);
        }

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.error("Error setting up Web Audio analyzer:", err);
      setError(err);
    }
  };

  const stopMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setIsBlowing(false);
    setVolume(0);
  };

  return {
    isSupported,
    hasPermission,
    isBlowing,
    volume,
    requestPermission,
    stopMic,
    error
  };
};

export default useMicrophone;
