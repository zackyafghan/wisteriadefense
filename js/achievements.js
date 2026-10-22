/* ==========================================================================
   ACHIEVEMENTS & SCORE SYSTEM (Sistem Skor & Pencapaian)
   Tracks in-game scores, combo multipliers, unlocks, and persistent stats
   ========================================================================== */

class AchievementManager {
    constructor() {
        this.storageKey = 'kny_wisteria_defense_achievements_v1';
        this.score = 0;
        this.highScore = 0;
        this.combo = 0;
        this.comboTimer = 0;
        this.comboMultiplier = 1.0;
        
        // Persistent statistics
        this.stats = {
            totalDemonsKilled: 0,
            tanjiroKills: 0,
            zenitsuKills: 0,
            inosukeKills: 0,
            nezukoKills: 0,
            shinobuKills: 0,
            rengokuKills: 0,
            tengenBombKills: 0,
            giyuSlowCount: 0,
            wisteriaCollected: 0,
            hinokamiUsed: 0,
            toriiTriggered: 0,
            bossesKilled: {
                rui: 0,
                akaza: 0,
                muzan: 0
            },
            levelsCompleted: [],
            highestWave: 0
        };

        // Achievement Definitions
        this.achievements = [
            {
                id: 'first_blood',
                title: 'Lulus Seleksi Akhir',
                sub: 'Mizunoto Rank',
                desc: 'Selesaikan Level 1 di Gunung Fujikasane.',
                icon: '🌸',
                points: 100,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 1
            },
            {
                id: 'tanjiro_master',
                title: 'Tebasan Pernapasan Air',
                sub: 'Mizu no Kokyu',
                desc: 'Kalahkan 25 iblis menggunakan Tanjiro Kamado.',
                icon: '🌊',
                points: 150,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 25
            },
            {
                id: 'zenitsu_speed',
                title: 'Kilat Kecepatan Dewa',
                sub: 'Hekireki Issen',
                desc: 'Kalahkan 20 iblis menggunakan Zenitsu Agatsuma.',
                icon: '⚡',
                points: 150,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 20
            },
            {
                id: 'inosuke_beast',
                title: 'Serbuan Raja Gunung',
                sub: 'Inoshishi Musou',
                desc: 'Kalahkan 25 iblis jarak dekat bersama Inosuke Hashibira.',
                icon: '🐗',
                points: 150,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 25
            },
            {
                id: 'nezuko_blood',
                title: 'Ledakan Darah Iblis',
                sub: 'Bakketsu Exploding Blood',
                desc: 'Bakar dan kalahkan 20 iblis menggunakan Nezuko Kamado.',
                icon: '🩸',
                points: 150,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 20
            },
            {
                id: 'shinobu_poison',
                title: 'Tarian Capung Racun',
                sub: 'Mushi no Kokyu',
                desc: 'Racuni dan tumbangkan 20 iblis menggunakan Shinobu Kocho.',
                icon: '🦋',
                points: 200,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 20
            },
            {
                id: 'rengoku_flame',
                title: 'Bakar Semangat Jiwamu!',
                sub: 'Kokoro o Moyase',
                desc: 'Hanguskan 35 iblis dengan jurus Kyojuro Rengoku.',
                icon: '🔥',
                points: 200,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 35
            },
            {
                id: 'giyu_calm',
                title: 'Ketenangan Air (Nagi)',
                sub: 'Dead Calm',
                desc: 'Perlambat dan redam serangan 25 iblis dengan Giyu Tomioka.',
                icon: '🌊',
                points: 200,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 25
            },
            {
                id: 'tengen_flashy',
                title: 'Pesta Suara Flamboyan',
                sub: 'Tengen Bombs',
                desc: 'Ledakkan 30 iblis dengan Bom Suara Flamboyan Uzui Tengen.',
                icon: '💥',
                points: 200,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 30
            },
            {
                id: 'hinokami_kagura',
                title: 'Tarian Dewa Api',
                sub: 'Hinokami Kagura',
                desc: 'Aktifkan Ultimate Hinokami Kagura sebanyak 3 kali.',
                icon: '☀️',
                points: 250,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 3
            },
            {
                id: 'wisteria_billionaire',
                title: 'Penguasa Lembah Wisteria',
                sub: 'Wisteria Master',
                desc: 'Kumpulkan total 2.500 Kelopak Bunga Wisteria.',
                icon: '🌸',
                points: 250,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 2500
            },
            {
                id: 'perfect_defense',
                title: 'Benteng Tak Tertembus',
                sub: 'Untouchable Torii',
                desc: 'Menangkan ronde tanpa satupun Gerbang Torii yang terpicu.',
                icon: '⛩️',
                points: 300,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 1
            },
            {
                id: 'boss_rui',
                title: 'Penenun Jaring Gugur',
                sub: 'Lower Moon 5 Slain',
                desc: 'Kalahkan Boss Rui di Gunung Natagumo.',
                icon: '🕷️',
                points: 350,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 1
            },
            {
                id: 'boss_akaza',
                title: 'Pukulan Kehancuran Patah',
                sub: 'Upper Moon 3 Slain',
                desc: 'Kalahkan Boss Akaza di Atas Gerbong Kereta.',
                icon: '❄️',
                points: 400,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 1
            },
            {
                id: 'boss_muzan',
                title: 'Akhir Sang Raja Iblis',
                sub: 'Demon King Defeated',
                desc: 'Kalahkan Muzan Kibutsuji dan selamatkan dunia manusia!',
                icon: '👑',
                points: 500,
                unlocked: false,
                unlockDate: null,
                progress: 0,
                maxProgress: 1
            }
        ];

        this.load();
    }

    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const data = JSON.parse(saved);
                this.highScore = data.highScore || 0;
                if (data.stats) {
                    this.stats = { ...this.stats, ...data.stats };
                }
                if (data.achievements) {
                    data.achievements.forEach(savedAch => {
                        const existing = this.achievements.find(a => a.id === savedAch.id);
                        if (existing) {
                            existing.unlocked = savedAch.unlocked;
                            existing.unlockDate = savedAch.unlockDate;
                            existing.progress = savedAch.progress || 0;
                        }
                    });
                }
            }
        } catch (e) {
            console.warn('Failed to load achievement data from localStorage', e);
        }
    }

    save() {
        try {
            const data = {
                highScore: this.highScore,
                stats: this.stats,
                achievements: this.achievements.map(a => ({
                    id: a.id,
                    unlocked: a.unlocked,
                    unlockDate: a.unlockDate,
                    progress: a.progress
                }))
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save achievements', e);
        }
    }

    resetRunScore() {
        this.score = 0;
        this.combo = 0;
        this.comboTimer = 0;
        this.comboMultiplier = 1.0;
        this.updateScoreUI();
    }

    // --- Scoring & Combo Logic ---
    addScore(basePoints, slayerType = null) {
        const multiplied = Math.round(basePoints * this.comboMultiplier);
        this.score += multiplied;

        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        // Combo Increment
        this.combo++;
        this.comboTimer = 3.5; // seconds to keep combo active
        this.comboMultiplier = Math.min(3.0, 1.0 + (this.combo * 0.05));

        // Track Slayer-specific kill stats
        if (slayerType) {
            this.trackSlayerKill(slayerType);
        }

        this.updateScoreUI();
        this.checkScoreAchievements();
        return multiplied;
    }

    update(dt) {
        if (this.comboTimer > 0) {
            this.comboTimer -= dt;
            if (this.comboTimer <= 0) {
                this.combo = 0;
                this.comboMultiplier = 1.0;
                this.updateScoreUI();
            }
        }
    }

    updateScoreUI() {
        const scoreElem = document.getElementById('stat-score');
        const highElem = document.getElementById('stat-highscore');
        const comboElem = document.getElementById('stat-combo');

        if (scoreElem) scoreElem.textContent = this.score.toLocaleString();
        if (highElem) highElem.textContent = this.highScore.toLocaleString();
        if (comboElem) {
            if (this.combo > 1) {
                comboElem.textContent = `Combo x${this.combo} (${this.comboMultiplier.toFixed(1)}x)`;
                comboElem.parentElement.style.display = 'flex';
            } else {
                comboElem.parentElement.style.display = 'none';
            }
        }
    }

    trackSlayerKill(slayerType) {
        this.stats.totalDemonsKilled++;
        switch (slayerType) {
            case 'tanjiro':
                this.stats.tanjiroKills++;
                this.updateProgress('tanjiro_master', this.stats.tanjiroKills);
                break;
            case 'zenitsu':
                this.stats.zenitsuKills++;
                this.updateProgress('zenitsu_speed', this.stats.zenitsuKills);
                break;
            case 'inosuke':
                this.stats.inosukeKills++;
                this.updateProgress('inosuke_beast', this.stats.inosukeKills);
                break;
            case 'nezuko':
                this.stats.nezukoKills++;
                this.updateProgress('nezuko_blood', this.stats.nezukoKills);
                break;
            case 'shinobu':
                this.stats.shinobuKills++;
                this.updateProgress('shinobu_poison', this.stats.shinobuKills);
                break;
            case 'rengoku':
                this.stats.rengokuKills++;
                this.updateProgress('rengoku_flame', this.stats.rengokuKills);
                break;
            case 'bomb':
                this.stats.tengenBombKills++;
                this.updateProgress('tengen_flashy', this.stats.tengenBombKills);
                break;
        }
        this.save();
    }

    trackWisteriaCollected(amount) {
        this.stats.wisteriaCollected += amount;
        this.updateProgress('wisteria_billionaire', this.stats.wisteriaCollected);
        this.save();
    }

    trackHinokamiUsed() {
        this.stats.hinokamiUsed++;
        this.updateProgress('hinokami_kagura', this.stats.hinokamiUsed);
        this.save();
    }

    trackGiyuSlow() {
        this.stats.giyuSlowCount++;
        this.updateProgress('giyu_calm', this.stats.giyuSlowCount);
        this.save();
    }

    trackBossKilled(bossId) {
        if (bossId === 'boss_rui') {
            this.stats.bossesKilled.rui++;
            this.unlock('boss_rui');
        } else if (bossId === 'boss_akaza') {
            this.stats.bossesKilled.akaza++;
            this.unlock('boss_akaza');
        } else if (bossId === 'boss_muzan') {
            this.stats.bossesKilled.muzan++;
            this.unlock('boss_muzan');
        }
        this.save();
    }

    trackLevelComplete(levelNumber, toriiTriggeredCount) {
        if (!this.stats.levelsCompleted.includes(levelNumber)) {
            this.stats.levelsCompleted.push(levelNumber);
        }
        if (levelNumber === 1) {
            this.unlock('first_blood');
        }
        if (toriiTriggeredCount === 0) {
            this.unlock('perfect_defense');
        }
        this.save();
    }

    checkScoreAchievements() {
        // Can add milestone checks if needed
    }

    updateProgress(achId, currentVal) {
        const ach = this.achievements.find(a => a.id === achId);
        if (!ach || ach.unlocked) return;

        ach.progress = Math.min(ach.maxProgress, currentVal);
        if (ach.progress >= ach.maxProgress) {
            this.unlock(achId);
        }
    }

    unlock(achId) {
        const ach = this.achievements.find(a => a.id === achId);
        if (!ach || ach.unlocked) return;

        ach.unlocked = true;
        ach.progress = ach.maxProgress;
        ach.unlockDate = new Date().toLocaleDateString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        this.save();
        this.showToast(ach);
        if (window.sound) {
            window.sound.playVictory();
        }
    }

    showToast(ach) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">${ach.icon}</div>
            <div class="toast-content">
                <span class="toast-tag">PENCAPAIAN TERBUKA! (+${ach.points} Poin)</span>
                <span class="toast-title">${ach.title}</span>
                <span class="toast-desc">${ach.desc}</span>
            </div>
        `;

        container.appendChild(toast);
        // Force reflow
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    }

    getTotalAchievementScore() {
        return this.achievements.reduce((total, ach) => {
            return ach.unlocked ? total + ach.points : total;
        }, 0);
    }

    getMaxAchievementScore() {
        return this.achievements.reduce((total, ach) => total + ach.points, 0);
    }

    renderModalContent() {
        const list = document.getElementById('achievements-list');
        const scoreHeader = document.getElementById('achievements-total-points');
        if (!list) return;

        const totalEarned = this.getTotalAchievementScore();
        const maxScore = this.getMaxAchievementScore();
        const unlockedCount = this.achievements.filter(a => a.unlocked).length;

        if (scoreHeader) {
            scoreHeader.textContent = `${totalEarned.toLocaleString()} / ${maxScore.toLocaleString()} Poin (${unlockedCount}/${this.achievements.length} Terbuka)`;
        }

        list.innerHTML = '';
        this.achievements.forEach(ach => {
            const row = document.createElement('div');
            row.className = `achievement-row ${ach.unlocked ? 'unlocked' : ''}`;
            const pct = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

            row.innerHTML = `
                <div class="achievement-badge-icon">${ach.icon}</div>
                <div class="achievement-details">
                    <div class="achievement-name">${ach.title} <span style="font-size:0.75rem; color:#ffd54f;">[${ach.sub}]</span></div>
                    <div class="achievement-desc">${ach.desc}</div>
                    <div class="achievement-progress-wrap">
                        <div class="achievement-mini-bar">
                            <div class="achievement-mini-fill" style="width: ${pct}%"></div>
                        </div>
                        <span class="achievement-text-progress">${ach.progress} / ${ach.maxProgress}</span>
                    </div>
                </div>
                <div class="achievement-points">
                    ${ach.unlocked ? `✅ +${ach.points} Poin` : `🔒 +${ach.points} Poin`}
                </div>
            `;
            list.appendChild(row);
        });
    }
}

// Global Achievement Instance
const achievements = new AchievementManager();
