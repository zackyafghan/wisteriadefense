/* ==========================================================================
   AUDIO SYNTHESIZER ENGINE (Web Audio API)
   Generates rich Demon Slayer sound effects and Japanese Taiko/Koto BGM
   Includes custom synthesis for all 16 Slayers and Bosses
   ========================================================================== */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.bgmPlaying = false;
        this.sfxMuted = false;
        this.bgmMuted = false;
        this.masterVolume = 0.8;
        this.bgmVolume = 0.4;
        this.sfxVolume = 0.7;
        this.bgmInterval = null;
        this.bgmStep = 0;
        this.initialized = false;

        this.loadSettings();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('kny_audio_settings');
            if (saved) {
                const data = JSON.parse(saved);
                this.masterVolume = data.masterVolume ?? 0.8;
                this.bgmVolume = data.bgmVolume ?? 0.4;
                this.sfxVolume = data.sfxVolume ?? 0.7;
                this.bgmMuted = data.bgmMuted ?? false;
                this.sfxMuted = data.sfxMuted ?? false;
            }
        } catch (e) {
            console.warn('Failed to load audio settings', e);
        }
    }

    saveSettings() {
        try {
            const data = {
                masterVolume: this.masterVolume,
                bgmVolume: this.bgmVolume,
                sfxVolume: this.sfxVolume,
                bgmMuted: this.bgmMuted,
                sfxMuted: this.sfxMuted
            };
            localStorage.setItem('kny_audio_settings', JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save audio settings', e);
        }
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.initialized = true;
        } catch (e) {
            console.warn("Web Audio API not supported", e);
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setMasterVolume(val) {
        this.masterVolume = Math.max(0, Math.min(1, val));
        this.saveSettings();
    }

    setBgmVolume(val) {
        this.bgmVolume = Math.max(0, Math.min(1, val));
        this.saveSettings();
    }

    setSfxVolume(val) {
        this.sfxVolume = Math.max(0, Math.min(1, val));
        this.saveSettings();
    }

    // --- SFX: Wisteria Petal Pickup Chime ---
    playPetalPickup() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const notes = [587.33, 880.00, 1174.66];
        const gainLevel = 0.2 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.06);

            gain.gain.setValueAtTime(gainLevel, now + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.06);
            osc.stop(now + idx * 0.06 + 0.35);
        });
    }

    // --- SFX: Sword Slash ---
    playSwordSlash() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.25 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        const bufferSize = this.ctx.sampleRate * 0.12;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.exponentialRampToValueAtTime(800, now + 0.12);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3 * this.sfxVolume * this.masterVolume, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.14);
        noise.start(now);
        noise.stop(now + 0.12);
    }

    // --- SFX: Water Splash ---
    playWaterSplash() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.35 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const bufferSize = this.ctx.sampleRate * 0.22;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.linearRampToValueAtTime(1400, now + 0.08);
        filter.frequency.linearRampToValueAtTime(200, now + 0.22);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.22);
    }

    // --- SFX: Thunder Slash ---
    playThunderSlash() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.4 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        const snap = this.ctx.createOscillator();
        const snapGain = this.ctx.createGain();
        snap.type = 'square';
        snap.frequency.setValueAtTime(2200, now);
        snap.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        snapGain.gain.setValueAtTime(0.35 * this.sfxVolume * this.masterVolume, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        snap.connect(snapGain);
        snapGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
        snap.start(now);
        snap.stop(now + 0.08);
    }

    // --- SFX: Flame Roar ---
    playFlameRoar() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.4 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(240, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.45);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
    }

    // --- SFX: Poison Stiletto ---
    playPoisonStab() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.25 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.18);
    }

    // --- SFX: Explosion ---
    playExplosion() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.6 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        const bufferSize = this.ctx.sampleRate * 0.45;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5 * this.sfxVolume * this.masterVolume, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
        noise.start(now);
        noise.stop(now + 0.45);
    }

    // --- NEW SFX: Wind Breathing Cyclone (Sanemi) ---
    playWindCyclone() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.4 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const bufferSize = this.ctx.sampleRate * 0.35;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.linearRampToValueAtTime(1800, now + 0.15);
        filter.frequency.linearRampToValueAtTime(300, now + 0.35);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.35);
    }

    // --- NEW SFX: Stone Earthquake Slam (Gyomei) ---
    playStoneSlam() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.55 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.5);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);

        setTimeout(() => this.playExplosion(), 50);
    }

    // --- NEW SFX: Mist Breathing Haze (Muichiro) ---
    playMistWhoosh() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.3 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(800, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.4);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    // --- NEW SFX: Love Whip Slash (Mitsuri) ---
    playWhipSlash() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.35 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(2200, now + 0.06);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.18);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
    }

    // --- NEW SFX: Nichirin Shotgun Blast (Genya) ---
    playShotgunBlast() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.5 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        const snap = this.ctx.createOscillator();
        const snapGain = this.ctx.createGain();
        snap.type = 'square';
        snap.frequency.setValueAtTime(3000, now);
        snap.frequency.exponentialRampToValueAtTime(100, now + 0.07);
        snapGain.gain.setValueAtTime(0.4 * this.sfxVolume * this.masterVolume, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        snap.connect(snapGain);
        snapGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
        snap.start(now);
        snap.stop(now + 0.07);
    }

    // --- NEW SFX: Skill Trigger Chime (Jurus Siap / Diaktifkan) ---
    playSkillActivate() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.35 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const notes = [440.00, 554.37, 659.25, 880.00]; // A Major chime
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);

            gain.gain.setValueAtTime(gainLevel, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.4);
        });
    }

    // --- SFX: Demon Hit ---
    playDemonHit() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.2 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    // --- SFX: Demon Death ---
    playDemonDeath() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.25 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    // --- SFX: Torii Gate Activation ---
    playToriiActivate() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.4 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const gongNotes = [196.00, 293.66, 392.00];
        gongNotes.forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(gainLevel, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 1.8);
        });
    }

    // --- SFX: Hinokami Kagura Ultimate ---
    playHinokamiKagura() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.5 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.8);
        osc.frequency.exponentialRampToValueAtTime(80, now + 1.6);

        gain.gain.setValueAtTime(0.1 * this.sfxVolume * this.masterVolume, now);
        gain.gain.linearRampToValueAtTime(gainLevel, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.6);
        setTimeout(() => this.playExplosion(), 800);
    }

    // --- SFX: UI Placements & Clicks ---
    playPlaceUnit() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.2 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    playUiClick() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.15 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, now);

        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    // --- SFX: Victory ---
    playVictory() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.3 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const melody = [
            { f: 523.25, d: 0.15, t: 0.0 },
            { f: 659.25, d: 0.15, t: 0.15 },
            { f: 783.99, d: 0.18, t: 0.3 },
            { f: 880.00, d: 0.22, t: 0.48 },
            { f: 1046.50, d: 0.6, t: 0.72 }
        ];

        melody.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, now + item.t);

            gain.gain.setValueAtTime(gainLevel, now + item.t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + item.t);
            osc.stop(now + item.t + item.d);
        });
    }

    // --- SFX: Defeat ---
    playDefeat() {
        if (!this.ctx || this.sfxMuted) return;
        this.resume();
        const now = this.ctx.currentTime;
        const gainLevel = 0.25 * this.sfxVolume * this.masterVolume;
        if (gainLevel <= 0.0001) return;

        const chords = [329.63, 293.66, 261.63, 220.00];
        chords.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + idx * 0.18);

            gain.gain.setValueAtTime(gainLevel, now + idx * 0.18);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.18);
            osc.stop(now + idx * 0.18 + 0.6);
        });
    }

    // --- BGM: Japanese Taiko & Koto Loop ---
    startBGM() {
        if (this.bgmPlaying || !this.ctx || this.bgmMuted) return;
        this.resume();
        this.bgmPlaying = true;
        this.bgmStep = 0;

        const scale = [293.66, 311.13, 392.00, 440.00, 466.16, 587.33, 622.25];
        const tempo = 220;

        this.bgmInterval = setInterval(() => {
            if (this.bgmMuted || !this.bgmPlaying) return;
            const now = this.ctx.currentTime;
            const step = this.bgmStep % 32;

            if (step % 4 === 0) {
                this.playTaikoDrum(step % 8 === 0 ? 80 : 110, step % 8 === 0 ? 0.35 : 0.22);
            }

            if (step % 8 === 6) {
                this.playHyoshigiClap();
            }

            if (step % 2 === 0) {
                const noteIndex = Math.floor(Math.sin(this.bgmStep * 0.35) * 3 + 3) % scale.length;
                const freq = scale[noteIndex];
                
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);

                const volume = (this.bgmVolume * this.masterVolume) * 0.28;
                if (volume > 0.0001) {
                    gain.gain.setValueAtTime(volume, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(now);
                    osc.stop(now + 0.28);
                }
            }

            this.bgmStep++;
        }, tempo);
    }

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
        this.bgmPlaying = false;
    }

    playTaikoDrum(freq, vol) {
        if (!this.ctx || this.bgmMuted) return;
        const now = this.ctx.currentTime;

        const realVol = vol * this.bgmVolume * this.masterVolume;
        if (realVol <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.24);

        gain.gain.setValueAtTime(realVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.24);
    }

    playHyoshigiClap() {
        if (!this.ctx || this.bgmMuted) return;
        const now = this.ctx.currentTime;

        const realVol = 0.15 * this.bgmVolume * this.masterVolume;
        if (realVol <= 0.0001) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

        gain.gain.setValueAtTime(realVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    toggleSFX() {
        this.sfxMuted = !this.sfxMuted;
        this.saveSettings();
        return !this.sfxMuted;
    }

    toggleBGM() {
        this.bgmMuted = !this.bgmMuted;
        if (this.bgmMuted) {
            this.stopBGM();
        } else {
            this.startBGM();
        }
        this.saveSettings();
        return !this.bgmMuted;
    }
}

// Global Sound Instance
const sound = new SoundEngine();
