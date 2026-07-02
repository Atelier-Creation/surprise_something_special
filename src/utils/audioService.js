// Audio Service using Web Audio API synthesis for robust offline/fallback audio
// and optionally Howler for rich audio if files are loaded.
import { Howl } from 'howler';
import { birthdayData } from '../data/birthdayData';

class AudioService {
  constructor() {
    this.ctx = null;
    this.bgMusicHowl = null;
    this.sfxHowls = {};
    this.synthInterval = null;
    this.isSynthPlaying = false;
    this.musicEnabled = false;

    // Happy Birthday melody notes (frequency, duration in ms, delay in ms)
    // C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25
    this.melody = [
      { note: 261.63, dur: 300, delay: 0 },   // Hap-
      { note: 261.63, dur: 150, delay: 350 }, // py
      { note: 293.66, dur: 450, delay: 500 }, // Birth-
      { note: 261.63, dur: 450, delay: 1000 },// day
      { note: 349.23, dur: 450, delay: 1500 },// to
      { note: 329.63, dur: 900, delay: 2000 },// you
      
      { note: 261.63, dur: 300, delay: 3000 },// Hap-
      { note: 261.63, dur: 150, delay: 3350 },// py
      { note: 293.66, dur: 450, delay: 3500 },// Birth-
      { note: 261.63, dur: 450, delay: 4000 },// day
      { note: 392.00, dur: 450, delay: 4500 },// to
      { note: 349.23, dur: 900, delay: 5000 },// you
      
      { note: 261.63, dur: 300, delay: 6000 },// Hap-
      { note: 261.63, dur: 150, delay: 6350 },// py
      { note: 523.25, dur: 450, delay: 6500 },// Birth-
      { note: 440.00, dur: 450, delay: 7000 },// day
      { note: 349.23, dur: 450, delay: 7500 },// dear
      { note: 329.63, dur: 450, delay: 8000 },// So-
      { note: 293.66, dur: 900, delay: 8500 },// phia
      
      { note: 466.16, dur: 300, delay: 9600 },// Hap-
      { note: 466.16, dur: 150, delay: 9950 },// py
      { note: 440.00, dur: 450, delay: 10100 },// Birth-
      { note: 349.23, dur: 450, delay: 10600 },// day
      { note: 392.00, dur: 450, delay: 11100 },// to
      { note: 349.23, dur: 900, delay: 11600 } // you
    ];
    this.melodyDuration = 13000; // total duration in ms
  }

  initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Set up standard audio elements (using Howler for web URLs)
  initHowler() {
    if (this.bgMusicHowl) return;

    // Primary background music score
    this.bgMusicHowl = new Howl({
      src: ['/Happy_Birthday_Background_Score.mp3'],
      html5: true,
      loop: true,
      volume: 0.5,
      onloaderror: (id, err) => {
        console.warn("Primary background score failed to load, falling back to existing music", err);
        this.loadFallbackMusic();
      }
    });

    Object.keys(birthdayData.music).forEach(key => {
      if (key !== 'bgMusic') {
        this.sfxHowls[key] = new Howl({
          src: [birthdayData.music[key]],
          volume: 0.8,
          onloaderror: (id, err) => {
            console.warn(`Howler SFX ${key} failed to load, using synth fallback`);
          }
        });
      }
    });
  }

  loadFallbackMusic() {
    if (this.bgMusicHowl) {
      try {
        this.bgMusicHowl.unload();
      } catch (e) {
        console.warn("Failed to unload primary Howler instance", e);
      }
    }
    this.bgMusicHowl = new Howl({
      src: [birthdayData.music.bgMusic],
      html5: true,
      loop: true,
      volume: 0.5,
      onloaderror: (id, err) => {
        console.warn("Howler BG Music failed to load, falling back to Synthesizer", err);
        if (this.musicEnabled) {
          this.startSynthMelody();
        }
      }
    });
    if (this.musicEnabled) {
      try {
        this.bgMusicHowl.play();
      } catch (e) {
        console.warn("Howler fallback play failed, initiating synthesizer fallback", e);
        this.startSynthMelody();
      }
    }
  }

  playMusic() {
    this.initContext();
    this.initHowler();
    this.musicEnabled = true;

    // Try playing Howler background music first
    if (this.bgMusicHowl && !this.bgMusicHowl.playing()) {
      try {
        this.bgMusicHowl.play();
        return;
      } catch (e) {
        console.warn("Howler play failed, initiating synthesizer fallback", e);
      }
    }

    // Synthesizer Fallback
    this.startSynthMelody();
  }

  stopMusic() {
    this.musicEnabled = false;
    if (this.bgMusicHowl) {
      this.bgMusicHowl.pause();
    }
    this.stopSynthMelody();
  }

  startSynthMelody() {
    if (this.isSynthPlaying) return;
    this.isSynthPlaying = true;
    this.initContext();

    const playMelodyIteration = () => {
      if (!this.isSynthPlaying || !this.musicEnabled) return;

      this.melody.forEach(noteItem => {
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        // soft wave type
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(noteItem.note, this.ctx.currentTime + noteItem.delay / 1000);

        // Envelope
        const startTime = this.ctx.currentTime + noteItem.delay / 1000;
        const endTime = startTime + noteItem.dur / 1000;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.05); // Attack
        gainNode.gain.setValueAtTime(0.12, endTime - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, endTime); // Release

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(endTime);
      });
    };

    // Play immediately
    playMelodyIteration();
    // Loop
    this.synthInterval = setInterval(playMelodyIteration, this.melodyDuration);
  }

  stopSynthMelody() {
    this.isSynthPlaying = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // Play Sound Effects (sfxName can be: 'candleBlow', 'applause', 'cakeCut')
  playSFX(sfxName) {
    this.initContext();
    this.initHowler();

    const howl = this.sfxHowls[sfxName];
    if (howl && howl.state() === 'loaded') {
      howl.play();
      return;
    }

    // Synthesized Sound Effects Fallback
    this.synthesizeSFX(sfxName);
  }

  synthesizeSFX(name) {
    if (!this.ctx) return;
    
    if (name === 'candleBlow') {
      // White noise for blowing candles out
      const bufferSize = this.ctx.sampleRate * 0.6; // 0.6 seconds
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } else if (name === 'cakeCut') {
      // Sweep for knife slice
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } else if (name === 'applause') {
      // Play a lovely chord sequence representing cheers
      const notes = [329.63, 392.00, 523.25, 659.25]; // E5, G5, C6, E6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.05);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + index * 0.05 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.05);
        osc.stop(this.ctx.currentTime + 1.2);
      });
    } else if (name === 'cameraClick') {
      // Shutter sound effect (combination of high frequency burst and decay)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    }
  }
}

export const audioService = new AudioService();
export default audioService;
