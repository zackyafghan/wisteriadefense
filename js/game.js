/* ==========================================================================
   GAME ENGINE & CORE CONTROLLER
   Gradual level progression, relaxed early-game pacing, and unlock system
   ========================================================================== */

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Grid Configuration (5 rows x 9 columns, matching classic PvZ)
        this.rows = 5;
        this.cols = 9;
        this.gridStartX = 110;
        this.gridStartY = 70;
        this.cellWidth = 100;
        this.cellHeight = 84;

        this.canvas.width = 1040;
        this.canvas.height = 510;

        // Player Progress & Unlocks
        this.maxUnlockedLevel = this.loadMaxUnlockedLevel();

        // Game State
        this.state = 'TITLE';
        this.currentLevel = 1;
        this.isEndless = false;
        this.gameSpeed = 1.0;
        this.wisteria = 200; // Comfortable starting wisteria
        this.hinokamiCharge = 0;
        this.hinokamiReady = false;

        // Entities
        this.grid = [];
        this.demons = [];
        this.projectiles = [];
        this.demonProjectiles = [];
        this.petalDrops = [];
        this.toriiGates = [];

        // Selection & Tools
        this.selectedCard = null;
        this.cardCooldowns = {};
        this.shovelActive = false;
        this.mousePos = { x: -1, y: -1, col: -1, row: -1 };

        // Wave & Level Management
        this.waveTimer = 0;
        this.waveInterval = 22; // Relaxed interval between waves
        this.currentWave = 0;
        this.totalWaves = 3;
        this.isPreparing = true;
        this.naturalPetalTimer = 5.0; // Petals drop frequently

        // Screen Shake
        this.shakeTime = 0;
        this.shakeIntensity = 0;

        // Hinokami Ultimate Animation
        this.hinokamiAnimTimer = 0;

        // Setup
        this.initGrid();
        this.initTorii();
        this.bindEvents();
        this.initCardUI();
        this.updateLevelSelectUI();

        // Animation Loop
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    loadMaxUnlockedLevel() {
        try {
            const saved = localStorage.getItem('kny_max_unlocked_level');
            return saved ? Math.max(1, parseInt(saved, 10)) : 1;
        } catch (e) {
            return 1;
        }
    }

    saveMaxUnlockedLevel(lvl) {
        try {
            this.maxUnlockedLevel = Math.max(this.maxUnlockedLevel, lvl);
            localStorage.setItem('kny_max_unlocked_level', this.maxUnlockedLevel.toString());
            this.updateLevelSelectUI();
            this.initCardUI();
        } catch (e) {
            console.warn('Failed to save max unlocked level', e);
        }
    }

    initGrid() {
        this.grid = [];
        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.grid[r][c] = null;
            }
        }
    }

    initTorii() {
        this.toriiGates = [];
        for (let r = 0; r < this.rows; r++) {
            this.toriiGates.push({
                row: r,
                x: 52,
                y: this.gridStartY + r * this.cellHeight + this.cellHeight / 2,
                hasBlade: true,
                triggered: false,
                triggerX: 52,
                speed: 850
            });
        }
    }

    getCellCenter(col, row) {
        return {
            x: this.gridStartX + col * this.cellWidth + this.cellWidth / 2,
            y: this.gridStartY + row * this.cellHeight + this.cellHeight / 2
        };
    }

    getRowY(row) {
        return this.gridStartY + row * this.cellHeight + this.cellHeight / 2;
    }

    // --- LEVEL CONFIGURATIONS & PROGRESSION ---
    loadLevel(levelNum, endless = false) {
        this.currentLevel = levelNum;
        this.isEndless = endless;
        this.state = 'PLAYING';
        this.wisteria = 200; // 200 Wisteria at start
        this.hinokamiCharge = 0;
        this.hinokamiReady = false;
        this.currentWave = 0;
        this.isPreparing = true;

        // Reset entities
        this.initGrid();
        this.initTorii();
        this.demons = [];
        this.projectiles = [];
        this.demonProjectiles = [];
        this.petalDrops = [];
        particles.reset();
        achievements.resetRunScore();

        // Level Wave & Preparation Timers
        if (endless) {
            this.totalWaves = 999;
            this.waveTimer = 12.0;
            this.updateLevelUI('Mode Bertahan Hidup (Endless)');
        } else {
            const levelInfo = [
                {
                    name: 'Level 1: Seleksi Akhir Hutan Wisteria',
                    waves: 3,
                    prepTime: 18.0,
                    msg: 'TUTORIAL: Tanam Dupa Wisteria & Siagakan Tanjiro!'
                },
                {
                    name: 'Level 2: Penyerangan Kuil Malam',
                    waves: 4,
                    prepTime: 15.0,
                    msg: 'Batu Urokodaki & Zenitsu Agatsuma Telah Terbuka!'
                },
                {
                    name: 'Level 3: Rumah Drum Kyogai',
                    waves: 5,
                    prepTime: 13.0,
                    msg: 'Inosuke & Bom Uzui Siap Beraksi! Waspada Iblis Armor!'
                },
                {
                    name: 'Level 4: Hutan Gunung Natagumo',
                    waves: 6,
                    prepTime: 12.0,
                    msg: 'Nezuko & Shinobu Bergabung! Hadapi Boss Rui!'
                },
                {
                    name: 'Level 5: Kereta Mugen Train',
                    waves: 7,
                    prepTime: 10.0,
                    msg: 'Kobarkan Semangat Rengoku! Bersiap Melawan Akaza!'
                },
                {
                    name: 'Level 6: Infinity Castle',
                    waves: 8,
                    prepTime: 8.0,
                    msg: 'Pertempuran Puncak Melawan Raja Iblis Muzan Kibutsuji!'
                }
            ];
            const info = levelInfo[levelNum - 1] || levelInfo[0];
            this.totalWaves = info.waves;
            this.waveTimer = info.prepTime;
            this.updateLevelUI(info.name);
            this.showBanner(`MULAI ${info.name.split(':')[0]}!`, info.msg, 3.2);
        }

        // Reset Card cooldowns
        for (const key in SLAYER_CONFIG) {
            this.cardCooldowns[key] = 0;
        }

        this.initCardUI();
        this.updateHUD();
        sound.startBGM();
    }

    updateLevelUI(name) {
        const titleElem = document.getElementById('stat-level-title');
        if (titleElem) titleElem.textContent = name;
    }

    // --- CARDS HUD WITH LOCKING SYSTEM ---
    initCardUI() {
        const rack = document.getElementById('cards-rack');
        if (!rack) return;
        rack.innerHTML = '';

        for (const [key, data] of Object.entries(SLAYER_CONFIG)) {
            const isUnlocked = this.isEndless || (data.unlockLevel <= this.maxUnlockedLevel);
            const card = document.createElement('div');
            card.className = `slayer-card ${!isUnlocked ? 'locked' : ''}`;
            card.dataset.type = key;

            const thumb = sprites.createCardThumbnail(key);
            const thumbWrap = document.createElement('div');
            thumbWrap.className = 'card-thumb';
            thumbWrap.appendChild(thumb);

            if (!isUnlocked) {
                card.innerHTML = `
                    <div class="card-lock-badge">🔒 Lvl ${data.unlockLevel}</div>
                    <div class="card-name">${data.name.split(' ')[0]}</div>
                    <div class="card-cost">${data.cost}🌸</div>
                `;
                card.title = `Terkunci! Selesaikan Level ${data.unlockLevel - 1} untuk membuka ${data.name}.`;
            } else {
                card.innerHTML = `
                    <div class="card-cooldown" id="cd-${key}"></div>
                    <div class="card-name">${data.name.split(' ')[0]}</div>
                    <div class="card-cost">${data.cost}🌸</div>
                `;
                card.title = `${data.name} (${data.cost}🌸) - ${data.desc}`;
                card.addEventListener('click', () => this.selectCard(key, card));
            }

            card.insertBefore(thumbWrap, card.children[1]);
            rack.appendChild(card);
        }

        // Shovel Tool
        const shovelBtn = document.getElementById('tool-shovel');
        if (shovelBtn) {
            shovelBtn.onclick = () => {
                this.shovelActive = !this.shovelActive;
                shovelBtn.classList.toggle('active', this.shovelActive);
                if (this.shovelActive) {
                    this.deselectCard();
                }
                sound.playUiClick();
            };
        }

        // Ultimate Button
        const ultimateBtn = document.getElementById('tool-ultimate');
        if (ultimateBtn) {
            ultimateBtn.onclick = () => {
                if (this.hinokamiReady) {
                    this.triggerHinokamiKagura();
                }
            };
        }
    }

    updateLevelSelectUI() {
        document.querySelectorAll('.level-card').forEach(card => {
            const lvl = card.dataset.level;
            if (lvl === 'endless') {
                // Endless unlocked if level 5 or higher reached
                const unlocked = this.maxUnlockedLevel >= 5;
                card.classList.toggle('locked', !unlocked);
                let lockIcon = card.querySelector('.level-lock-icon');
                if (!unlocked && !lockIcon) {
                    lockIcon = document.createElement('span');
                    lockIcon.className = 'level-lock-icon';
                    lockIcon.textContent = '🔒';
                    card.appendChild(lockIcon);
                } else if (unlocked && lockIcon) {
                    lockIcon.remove();
                }
            } else {
                const lvlNum = parseInt(lvl, 10);
                const isUnlocked = lvlNum <= this.maxUnlockedLevel;
                card.classList.toggle('locked', !isUnlocked);
                let lockIcon = card.querySelector('.level-lock-icon');
                if (!isUnlocked && !lockIcon) {
                    lockIcon = document.createElement('span');
                    lockIcon.className = 'level-lock-icon';
                    lockIcon.textContent = '🔒';
                    card.appendChild(lockIcon);
                } else if (isUnlocked && lockIcon) {
                    lockIcon.remove();
                }
            }
        });
    }

    selectCard(type, cardElem) {
        if (this.shovelActive) {
            this.shovelActive = false;
            document.getElementById('tool-shovel')?.classList.remove('active');
        }

        const data = SLAYER_CONFIG[type];
        if (!this.isEndless && data.unlockLevel > this.maxUnlockedLevel) {
            return;
        }

        if (this.cardCooldowns[type] > 0 || this.wisteria < data.cost) {
            sound.playUiClick();
            return;
        }

        if (this.selectedCard === type) {
            this.deselectCard();
        } else {
            this.deselectCard();
            this.selectedCard = type;
            cardElem.classList.add('active');
            sound.playUiClick();
        }
    }

    deselectCard() {
        this.selectedCard = null;
        document.querySelectorAll('.slayer-card').forEach(c => c.classList.remove('active'));
    }

    // --- HINOKAMI ULTIMATE ---
    addUltimateCharge(amount) {
        this.hinokamiCharge = Math.min(100, this.hinokamiCharge + amount);
        this.updateUltimateUI();
    }

    updateUltimateUI() {
        const btn = document.getElementById('tool-ultimate');
        const fill = document.getElementById('ultimate-fill');
        if (!btn || !fill) return;

        fill.style.width = `${this.hinokamiCharge}%`;
        if (this.hinokamiCharge >= 100) {
            this.hinokamiReady = true;
            btn.classList.add('ready');
        } else {
            this.hinokamiReady = false;
            btn.classList.remove('ready');
        }
    }

    triggerHinokamiKagura() {
        if (!this.hinokamiReady) return;
        this.hinokamiReady = false;
        this.hinokamiCharge = 0;
        this.updateUltimateUI();

        this.shakeTime = 1.6;
        this.shakeIntensity = 10;
        this.hinokamiAnimTimer = 2.0;
        sound.playHinokamiKagura();
        achievements.trackHinokamiUsed();

        this.showBanner('HINOKAMI KAGURA!', 'Tarian Dewa Api: Enbu Menghanguskan Seluruh Iblis!', 2.2);

        for (let r = 0; r < this.rows; r++) {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    particles.createFlameBurst(150 + i * 150, this.getRowY(r), 25);
                }, i * 90);
            }
        }

        setTimeout(() => {
            for (let i = this.demons.length - 1; i >= 0; i--) {
                const demon = this.demons[i];
                demon.takeDamage(3500, 'rengoku', this);
            }
        }, 750);
    }

    // --- WISTERIA CURRENCY ---
    addWisteria(amount) {
        this.wisteria += amount;
        this.updateHUD();
    }

    spendWisteria(amount) {
        if (this.wisteria >= amount) {
            this.wisteria -= amount;
            this.updateHUD();
            return true;
        }
        return false;
    }

    updateHUD() {
        const wisteriaElem = document.getElementById('wisteria-count');
        if (wisteriaElem) wisteriaElem.textContent = this.wisteria;

        for (const [key, data] of Object.entries(SLAYER_CONFIG)) {
            const card = document.querySelector(`.slayer-card[data-type="${key}"]`);
            if (card && !card.classList.contains('locked')) {
                const canAfford = this.wisteria >= data.cost;
                const onCooldown = (this.cardCooldowns[key] || 0) > 0;
                card.classList.toggle('disabled', !canAfford || onCooldown);
            }
        }
    }

    // --- SPAWNING & TARGETING ---
    spawnPetalDrop(x, y, value = 25, isFalling = false, targetY = 0) {
        this.petalDrops.push(new PetalDrop(x, y, value, isFalling, targetY));
    }

    spawnProjectile(proj) {
        this.projectiles.push(proj);
    }

    spawnDemonProjectile(proj) {
        this.demonProjectiles.push(proj);
    }

    findFirstDemonInRow(row, minX) {
        let closest = null;
        let minDistance = 9999;
        for (const demon of this.demons) {
            if (demon.row === row && demon.x > minX) {
                const dist = demon.x - minX;
                if (dist < minDistance) {
                    minDistance = dist;
                    closest = demon;
                }
            }
        }
        return closest;
    }

    getDemonsInRange(row, minX, maxX) {
        return this.demons.filter(d => d.row === row && d.x >= minX && d.x <= maxX);
    }

    getSlayerAt(row, x) {
        const col = Math.floor((x - this.gridStartX) / this.cellWidth);
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
            return this.grid[row][col];
        }
        return null;
    }

    removeSlayer(slayer) {
        if (this.grid[slayer.row] && this.grid[slayer.row][slayer.col] === slayer) {
            this.grid[slayer.row][slayer.col] = null;
            particles.createWisteriaPetals(slayer.x, slayer.y, 10);
        }
    }

    detonateBomb(row, col, x, y) {
        sound.playExplosion();
        particles.createBloodExplosion(x, y, 40);
        this.shakeTime = 0.6;
        this.shakeIntensity = 8;

        const minRow = Math.max(0, row - 1);
        const maxRow = Math.min(this.rows - 1, row + 1);
        const minX = x - this.cellWidth * 1.5;
        const maxX = x + this.cellWidth * 1.5;

        for (let r = minRow; r <= maxRow; r++) {
            const demonsInBox = this.getDemonsInRange(r, minX, maxX);
            demonsInBox.forEach(demon => {
                demon.takeDamage(1500, 'bomb', this);
            });
        }
    }

    applyGiyuNagi(centerRow, x) {
        const minR = Math.max(0, centerRow - 1);
        const maxR = Math.min(this.rows - 1, centerRow + 1);
        for (let r = minR; r <= maxR; r++) {
            const demons = this.getDemonsInRange(r, x - 100, x + 380);
            demons.forEach(d => {
                d.applySlow(0.4, 3.0);
                d.takeDamage(45, 'giyu', this);
            });
        }
    }

    triggerAkazaShockwave(row, x) {
        particles.createWaterSplash(x, this.getRowY(row), 20);
        const targets = [];
        const r1 = Math.max(0, row - 1);
        const r2 = Math.min(this.rows - 1, row + 1);
        for (let r = r1; r <= r2; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c]) {
                    targets.push(this.grid[r][c]);
                }
            }
        }
        targets.forEach(s => {
            s.takeDamage(50);
            particles.addSlashTrail(x, this.getRowY(row), s.x, s.y, '#00e5ff', 3);
        });
    }

    spawnMuzanMinions(x) {
        for (let i = 0; i < 2; i++) {
            const r = Math.floor(Math.random() * this.rows);
            const type = Math.random() < 0.5 ? 'fast' : 'armored';
            const demon = new Demon(type, r, x + 40 + i * 30, this.currentLevel);
            demon.y = this.getRowY(r);
            this.demons.push(demon);
            particles.createPoisonMist(demon.x, demon.y, 10);
        }
    }

    // --- REFINED PROGRESSIVE WAVE SPAWNER ---
    updateWaves(dt) {
        if (this.state !== 'PLAYING') return;

        // Wave Progress Fill
        const fillBar = document.getElementById('wave-progress-fill');
        if (fillBar) {
            const wavePct = Math.min(100, (this.currentWave / this.totalWaves) * 100);
            fillBar.style.width = `${wavePct}%`;
        }

        // Frequent natural Wisteria Petals falling from sky (every 5-7.5s)
        this.naturalPetalTimer -= dt;
        if (this.naturalPetalTimer <= 0) {
            this.naturalPetalTimer = 5.5 + Math.random() * 2.5;
            const dropX = this.gridStartX + Math.random() * (this.cols * this.cellWidth);
            const targetY = this.gridStartY + 40 + Math.random() * (this.rows * this.cellHeight - 60);
            this.spawnPetalDrop(dropX, 10, 25, true, targetY);
        }

        // Preparation phase countdown
        if (this.isPreparing) {
            this.waveTimer -= dt;
            if (this.waveTimer <= 0) {
                this.isPreparing = false;
                this.currentWave = 1;
                this.waveTimer = this.waveInterval;
                this.spawnWave(1);
            }
            return;
        }

        // Wave interval countdown
        this.waveTimer -= dt;
        if (this.waveTimer <= 0) {
            this.currentWave++;
            if (this.currentWave > this.totalWaves) {
                // If all waves triggered and no demons remain, victory!
                if (this.demons.length === 0) {
                    this.onLevelCleared();
                }
                return;
            }

            this.waveTimer = this.waveInterval;
            this.spawnWave(this.currentWave);
        } else {
            // Also check victory if past total waves
            if (this.currentWave >= this.totalWaves && this.demons.length === 0) {
                this.onLevelCleared();
            }
        }
    }

    spawnWave(waveNum) {
        const isFinalWave = waveNum === this.totalWaves;

        if (isFinalWave) {
            this.showBanner('GELOMBANG TERAKHIR!', 'Serangan Puncak Iblis Bersiap!', 2.8, true);
            sound.playToriiActivate();
        } else {
            this.showBanner(`GELOMBANG ${waveNum}!`, 'Iblis Mendekat dari Arah Hutan...', 2.0);
        }

        // Wave compositions tailored strictly per level for smooth learning curve:
        let demonList = [];

        if (this.currentLevel === 1) {
            // LEVEL 1: Gentle tutorial!
            // Wave 1: 2 slow lesser demons spaced 8 seconds apart!
            // Wave 2: 3 lesser demons spaced 6 seconds apart!
            // Wave 3 (Final): 4 lesser demons + 1 fast demon spaced 5 seconds apart!
            if (waveNum === 1) {
                demonList = ['lesser', 'lesser'];
            } else if (waveNum === 2) {
                demonList = ['lesser', 'lesser', 'lesser'];
            } else {
                demonList = ['lesser', 'lesser', 'fast', 'lesser', 'lesser'];
            }
        } else if (this.currentLevel === 2) {
            // LEVEL 2: Introduces Fast Demons
            if (waveNum === 1) {
                demonList = ['lesser', 'fast', 'lesser'];
            } else if (waveNum === 2) {
                demonList = ['lesser', 'fast', 'lesser', 'fast'];
            } else if (waveNum === 3) {
                demonList = ['lesser', 'lesser', 'fast', 'lesser', 'fast'];
            } else {
                demonList = ['fast', 'lesser', 'fast', 'lesser', 'fast', 'lesser'];
            }
        } else if (this.currentLevel === 3) {
            // LEVEL 3: Introduces Armored Oni & Yahaba
            if (waveNum === 1) {
                demonList = ['lesser', 'fast', 'armored'];
            } else if (waveNum === 2) {
                demonList = ['fast', 'armored', 'lesser', 'yahaba'];
            } else if (waveNum === 3) {
                demonList = ['armored', 'fast', 'lesser', 'armored', 'yahaba'];
            } else {
                demonList = ['armored', 'armored', 'fast', 'yahaba', 'fast', 'lesser'];
            }
        } else if (this.currentLevel === 4) {
            // LEVEL 4: Introduces Susamaru & Boss Rui
            if (waveNum < this.totalWaves) {
                const pool = ['lesser', 'fast', 'armored', 'susamaru'];
                const count = 3 + waveNum;
                for (let i = 0; i < count; i++) {
                    demonList.push(pool[Math.floor(Math.random() * pool.length)]);
                }
            } else {
                demonList = ['armored', 'susamaru', 'fast', 'armored', 'susamaru', 'fast'];
            }
        } else if (this.currentLevel === 5) {
            // LEVEL 5: Mugen Train & Boss Akaza
            if (waveNum < this.totalWaves) {
                const pool = ['fast', 'armored', 'susamaru', 'yahaba'];
                const count = 4 + waveNum;
                for (let i = 0; i < count; i++) {
                    demonList.push(pool[Math.floor(Math.random() * pool.length)]);
                }
            } else {
                demonList = ['armored', 'yahaba', 'susamaru', 'armored', 'fast', 'armored'];
            }
        } else {
            // LEVEL 6 / ENDLESS
            const pool = ['lesser', 'fast', 'armored', 'susamaru', 'yahaba'];
            const count = 4 + waveNum * 2;
            for (let i = 0; i < count; i++) {
                demonList.push(pool[Math.floor(Math.random() * pool.length)]);
            }
        }

        // Spawn demons with relaxed spacing (3.5 to 5.0 seconds between spawns!)
        const spawnDelay = this.currentLevel === 1 ? 5500 : Math.max(2200, 4800 - this.currentLevel * 400);

        demonList.forEach((type, idx) => {
            setTimeout(() => {
                if (this.state !== 'PLAYING') return;
                const r = Math.floor(Math.random() * this.rows);
                const spawnX = this.canvas.width + 30 + Math.random() * 50;
                const demon = new Demon(type, r, spawnX, this.currentLevel);
                demon.y = this.getRowY(r);
                this.demons.push(demon);
            }, idx * spawnDelay);
        });

        // Spawn Boss on Final Wave
        if (isFinalWave) {
            const bossDelay = (demonList.length * spawnDelay) + 2000;
            setTimeout(() => {
                if (this.state !== 'PLAYING') return;
                let bossType = null;
                if (this.currentLevel === 4) bossType = 'rui';
                else if (this.currentLevel === 5) bossType = 'akaza';
                else if (this.currentLevel >= 6) bossType = 'muzan';

                if (bossType) {
                    const bossRow = Math.floor(this.rows / 2);
                    const boss = new Demon(bossType, bossRow, this.canvas.width + 60, this.currentLevel);
                    boss.y = this.getRowY(bossRow);
                    this.demons.push(boss);
                    particles.createBloodExplosion(boss.x, boss.y, 25);
                }
            }, bossDelay);
        }
    }

    // --- GAME LOOP & UPDATES ---
    loop(timestamp) {
        const dt = Math.min(0.1, (timestamp - this.lastTime) / 1000) * this.gameSpeed;
        this.lastTime = timestamp;

        if (this.state === 'PLAYING') {
            this.update(dt);
        }

        this.draw();
        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        achievements.update(dt);
        particles.update(dt);
        this.updateWaves(dt);

        // Update Card Cooldowns
        for (const [key, data] of Object.entries(SLAYER_CONFIG)) {
            if (this.cardCooldowns[key] > 0) {
                this.cardCooldowns[key] -= dt;
                const cdOverlay = document.getElementById(`cd-${key}`);
                if (cdOverlay) {
                    const pct = Math.max(0, (this.cardCooldowns[key] / data.cooldown) * 100);
                    cdOverlay.style.height = `${pct}%`;
                }
            }
        }
        this.updateHUD();

        if (this.shakeTime > 0) this.shakeTime -= dt;
        if (this.hinokamiAnimTimer > 0) this.hinokamiAnimTimer -= dt;

        // Update Slayers
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const slayer = this.grid[r][c];
                if (slayer) {
                    slayer.update(dt, this);
                    if (slayer.hp <= 0) {
                        this.grid[r][c] = null;
                    }
                }
            }
        }

        // Update Projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.update(dt);

            let hit = false;
            for (const demon of this.demons) {
                if (demon.row === p.row && Math.abs(demon.x - p.x) < 30) {
                    const isSpent = p.onHitDemon(demon, this);
                    if (isSpent) {
                        hit = true;
                        break;
                    }
                }
            }

            if (hit || p.x > this.canvas.width + 40) {
                this.projectiles.splice(i, 1);
            }
        }

        // Update Demon Projectiles
        for (let i = this.demonProjectiles.length - 1; i >= 0; i--) {
            const dp = this.demonProjectiles[i];
            dp.update(dt);

            const targetSlayer = this.getSlayerAt(dp.row, dp.x);
            if (targetSlayer) {
                targetSlayer.takeDamage(dp.damage);
                particles.createBloodExplosion(dp.x, dp.y, 6);
                sound.playDemonHit();
                this.demonProjectiles.splice(i, 1);
                continue;
            }

            if (dp.x < 30) {
                this.demonProjectiles.splice(i, 1);
            }
        }

        // Update Demons
        for (let i = this.demons.length - 1; i >= 0; i--) {
            const demon = this.demons[i];
            demon.update(dt, this);

            if (demon.hp <= 0) {
                this.demons.splice(i, 1);
                continue;
            }

            // Check Torii Gate lifeline
            if (demon.x <= this.gridStartX - 20) {
                const torii = this.toriiGates[demon.row];
                if (torii && torii.hasBlade && !torii.triggered) {
                    torii.triggered = true;
                    torii.hasBlade = false;
                    sound.playToriiActivate();
                    achievements.stats.toriiTriggered++;
                    this.showBanner('GERBANG TORII AKTIF!', 'Pedang Nichirin Suci Menyapu Seluruh Baris!', 1.8);
                } else if (!torii || (!torii.hasBlade && !torii.triggered)) {
                    this.onGameOver();
                    return;
                }
            }
        }

        // Update Active Torii Gates
        for (const torii of this.toriiGates) {
            if (torii.triggered) {
                torii.triggerX += torii.speed * dt;
                particles.addSlashTrail(torii.triggerX - 30, torii.y, torii.triggerX, torii.y, '#00e5ff', 5);

                for (let i = this.demons.length - 1; i >= 0; i--) {
                    const d = this.demons[i];
                    if (d.row === torii.row && Math.abs(d.x - torii.triggerX) < 50) {
                        d.takeDamage(9999, 'tanjiro', this);
                    }
                }

                if (torii.triggerX > this.canvas.width + 60) {
                    torii.triggered = false;
                }
            }
        }

        // Update Resource Drops
        for (let i = this.petalDrops.length - 1; i >= 0; i--) {
            const drop = this.petalDrops[i];
            const remove = drop.update(dt);
            if (remove) {
                this.petalDrops.splice(i, 1);
            }
        }
    }

    // --- DRAWING & RENDERING ---
    draw() {
        this.ctx.save();

        if (this.shakeTime > 0) {
            const sx = (Math.random() - 0.5) * this.shakeIntensity;
            const sy = (Math.random() - 0.5) * this.shakeIntensity;
            this.ctx.translate(sx, sy);
        }

        this.drawBackground();
        this.drawGrid();

        // Draw Torii Gates
        for (const torii of this.toriiGates) {
            if (torii.triggered) {
                this.ctx.save();
                this.ctx.translate(torii.triggerX, torii.y);
                this.ctx.fillStyle = '#00e5ff';
                this.ctx.fillRect(-20, -4, 40, 8);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(-15, -2, 30, 4);
                this.ctx.restore();
            } else {
                sprites.drawToriiGate(this.ctx, torii.x, torii.y, torii.hasBlade);
            }
        }

        this.drawPlacementGhost();

        // Draw Slayers
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const slayer = this.grid[r][c];
                if (slayer) {
                    slayer.draw(this.ctx);
                }
            }
        }

        // Draw Projectiles
        for (const p of this.projectiles) p.draw(this.ctx);
        for (const dp of this.demonProjectiles) dp.draw(this.ctx);

        // Draw Demons
        for (const demon of this.demons) demon.draw(this.ctx);

        // Draw Particles & Floating Texts
        particles.draw(this.ctx);

        // Draw Resource Drops
        for (const drop of this.petalDrops) drop.draw(this.ctx);

        // Draw Preparation Countdown Overlay
        if (this.isPreparing && this.state === 'PLAYING') {
            this.drawPrepCountdown();
        }

        // Hinokami Kagura Screen Overlay
        if (this.hinokamiAnimTimer > 0) {
            const alpha = Math.min(0.7, this.hinokamiAnimTimer * 0.5);
            this.ctx.fillStyle = `rgba(255, 69, 0, ${alpha})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.font = "900 44px 'Cinzel', serif";
            this.ctx.fillStyle = '#ffffff';
            this.ctx.textAlign = 'center';
            this.ctx.fillText("HINOKAMI KAGURA: ENBU", this.canvas.width / 2, this.canvas.height / 2);
        }

        this.ctx.restore();
    }

    drawPrepCountdown() {
        const secs = Math.ceil(this.waveTimer);
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(15, 6, 26, 0.85)';
        this.ctx.strokeStyle = '#00e676';
        this.ctx.lineWidth = 2;

        const boxW = 440;
        const boxH = 34;
        const boxX = (this.canvas.width - boxW) / 2;
        const boxY = 16;

        this.ctx.beginPath();
        this.ctx.roundRect(boxX, boxY, boxW, boxH, 17);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.font = "700 14px 'Plus Jakarta Sans', sans-serif";
        this.ctx.fillStyle = '#00e676';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(`⏳ WAKTU BERSIAP: ${secs} DETIK LAGI! Tanam Dupa 🌸 & Tanjiro 🌊`, this.canvas.width / 2, boxY + boxH / 2);
        this.ctx.restore();
    }

    drawBackground() {
        const w = this.canvas.width;
        const h = this.canvas.height;

        const sky = this.ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, '#0c0517');
        sky.addColorStop(0.5, '#1b0c2e');
        sky.addColorStop(1, '#0e0417');
        this.ctx.fillStyle = sky;
        this.ctx.fillRect(0, 0, w, h);

        // Full Moon
        this.ctx.save();
        const moonGrad = this.ctx.createRadialGradient(920, 50, 10, 920, 50, 70);
        moonGrad.addColorStop(0, 'rgba(255, 255, 230, 0.95)');
        moonGrad.addColorStop(0.4, 'rgba(255, 240, 180, 0.5)');
        moonGrad.addColorStop(1, 'rgba(255, 240, 180, 0)');
        this.ctx.fillStyle = moonGrad;
        this.ctx.beginPath();
        this.ctx.arc(920, 50, 70, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#ffffe0';
        this.ctx.beginPath();
        this.ctx.arc(920, 50, 28, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Mountain Silhouettes
        this.ctx.fillStyle = '#140822';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 160);
        this.ctx.lineTo(200, 60);
        this.ctx.lineTo(440, 150);
        this.ctx.lineTo(700, 50);
        this.ctx.lineTo(950, 160);
        this.ctx.lineTo(w, 110);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(0, h);
        this.ctx.closePath();
        this.ctx.fill();

        // Wisteria Vines
        this.ctx.save();
        for (let i = 0; i < 18; i++) {
            const vx = 30 + i * 58;
            const vy = 10 + (i % 3) * 12;
            const vh = 35 + (i % 4) * 14;
            this.ctx.strokeStyle = '#2e7d32';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(vx, 0);
            this.ctx.quadraticCurveTo(vx + 6, vy, vx, vh);
            this.ctx.stroke();

            this.ctx.fillStyle = (i % 2 === 0) ? '#ce93d8' : '#ba68c8';
            for (let j = 0; j < 5; j++) {
                this.ctx.beginPath();
                this.ctx.arc(vx + (j % 2 === 0 ? -3 : 3), vh - j * 6, 4, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        this.ctx.restore();
    }

    drawGrid() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const gx = this.gridStartX + c * this.cellWidth;
                const gy = this.gridStartY + r * this.cellHeight;

                const isEven = (r + c) % 2 === 0;
                this.ctx.fillStyle = isEven ? 'rgba(38, 18, 60, 0.72)' : 'rgba(26, 12, 42, 0.72)';
                this.ctx.fillRect(gx, gy, this.cellWidth, this.cellHeight);

                this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(gx, gy, this.cellWidth, this.cellHeight);
            }
        }

        if (this.mousePos.col >= 0 && this.mousePos.row >= 0) {
            const hx = this.gridStartX + this.mousePos.col * this.cellWidth;
            const hy = this.gridStartY + this.mousePos.row * this.cellHeight;
            this.ctx.strokeStyle = this.shovelActive ? '#ff1744' : '#ffd700';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(hx, hy, this.cellWidth, this.cellHeight);
        }
    }

    drawPlacementGhost() {
        if (!this.selectedCard || this.mousePos.col < 0 || this.mousePos.row < 0) return;
        const cell = this.getCellCenter(this.mousePos.col, this.mousePos.row);

        this.ctx.save();
        this.ctx.globalAlpha = 0.55;

        switch (this.selectedCard) {
            case 'kakushi': sprites.drawKakushi(this.ctx, cell.x, cell.y, 0); break;
            case 'tanjiro': sprites.drawTanjiro(this.ctx, cell.x, cell.y, 0, false); break;
            case 'zenitsu': sprites.drawZenitsu(this.ctx, cell.x, cell.y, 0, false); break;
            case 'inosuke': sprites.drawInosuke(this.ctx, cell.x, cell.y, 0, false); break;
            case 'nezuko': sprites.drawNezuko(this.ctx, cell.x, cell.y, 0, false); break;
            case 'shinobu': sprites.drawShinobu(this.ctx, cell.x, cell.y, 0, false); break;
            case 'rengoku': sprites.drawRengoku(this.ctx, cell.x, cell.y, 0, false); break;
            case 'giyu': sprites.drawGiyu(this.ctx, cell.x, cell.y, 0, false); break;
            case 'boulder': sprites.drawBoulder(this.ctx, cell.x, cell.y, 0, 1.0); break;
            case 'bomb': sprites.drawTengenBomb(this.ctx, cell.x, cell.y, 0); break;
        }

        this.ctx.restore();
    }

    // --- EVENT BINDING ---
    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            this.mousePos.x = x;
            this.mousePos.y = y;

            const col = Math.floor((x - this.gridStartX) / this.cellWidth);
            const row = Math.floor((y - this.gridStartY) / this.cellHeight);

            if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                this.mousePos.col = col;
                this.mousePos.row = row;
            } else {
                this.mousePos.col = -1;
                this.mousePos.row = -1;
            }
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mousePos = { x: -1, y: -1, col: -1, row: -1 };
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            // 1. Collect Petals
            for (let i = this.petalDrops.length - 1; i >= 0; i--) {
                const drop = this.petalDrops[i];
                const dist = Math.hypot(clickX - drop.x, clickY - drop.y);
                if (dist < 34 && !drop.collected) {
                    drop.collect(this);
                    return;
                }
            }

            // 2. Shovel
            if (this.shovelActive && this.mousePos.col >= 0 && this.mousePos.row >= 0) {
                const slayer = this.grid[this.mousePos.row][this.mousePos.col];
                if (slayer) {
                    this.removeSlayer(slayer);
                    sound.playSwordSlash();
                }
                return;
            }

            // 3. Card Placement
            if (this.selectedCard && this.mousePos.col >= 0 && this.mousePos.row >= 0) {
                const row = this.mousePos.row;
                const col = this.mousePos.col;
                const config = SLAYER_CONFIG[this.selectedCard];

                if (!this.grid[row][col]) {
                    if (this.spendWisteria(config.cost)) {
                        const cell = this.getCellCenter(col, row);
                        const newSlayer = new Slayer(this.selectedCard, col, row, cell.x, cell.y);
                        this.grid[row][col] = newSlayer;

                        this.cardCooldowns[this.selectedCard] = config.cooldown;
                        sound.playPlaceUnit();
                        particles.createWisteriaPetals(cell.x, cell.y, 12);

                        this.deselectCard();
                    }
                }
            }
        });

        // Fast Forward Toggle
        const speedBtn = document.getElementById('btn-speed');
        if (speedBtn) {
            speedBtn.addEventListener('click', () => {
                this.gameSpeed = this.gameSpeed === 1.0 ? 2.0 : 1.0;
                speedBtn.textContent = `⚡ ${this.gameSpeed}x Speed`;
                sound.playUiClick();
            });
        }
    }

    showBanner(title, subtitle, duration = 2.5, isBoss = false) {
        const overlay = document.getElementById('banner-overlay');
        const bTitle = document.getElementById('banner-title');
        const bSub = document.getElementById('banner-sub');
        if (!overlay || !bTitle || !bSub) return;

        bTitle.textContent = title;
        bSub.textContent = subtitle;
        overlay.className = `banner-overlay show ${isBoss ? 'boss' : ''}`;

        setTimeout(() => {
            overlay.className = 'banner-overlay';
        }, duration * 1000);
    }

    onLevelCleared() {
        this.state = 'VICTORY';
        sound.stopBGM();
        sound.playVictory();

        let untouchedTorii = 0;
        for (const t of this.toriiGates) {
            if (!t.triggered && t.hasBlade) untouchedTorii++;
        }
        const toriiBonus = untouchedTorii * 500;
        achievements.addScore(toriiBonus);
        achievements.trackLevelComplete(this.currentLevel, this.rows - untouchedTorii);

        // Check for character unlocks upon beating level!
        let newUnlock = null;
        if (!this.isEndless && this.currentLevel === this.maxUnlockedLevel && this.currentLevel < 6) {
            const nextLvl = this.currentLevel + 1;
            this.saveMaxUnlockedLevel(nextLvl);

            // Find slayers unlocked at nextLvl
            const newlyUnlocked = Object.entries(SLAYER_CONFIG).filter(([k, v]) => v.unlockLevel === nextLvl);
            if (newlyUnlocked.length > 0) {
                newUnlock = newlyUnlocked.map(([k, v]) => v.name).join(' & ');
            }
        }

        // Show Victory Modal
        const modal = document.getElementById('modal-victory');
        const vScore = document.getElementById('victory-score');
        const vDemons = document.getElementById('victory-demons');
        const vTorii = document.getElementById('victory-torii');
        const vUnlockBox = document.getElementById('victory-unlock-box');
        const vUnlockName = document.getElementById('victory-unlock-name');

        if (vScore) vScore.textContent = achievements.score.toLocaleString();
        if (vDemons) vDemons.textContent = achievements.stats.totalDemonsKilled;
        if (vTorii) vTorii.textContent = `${untouchedTorii} / ${this.rows} (+${toriiBonus} Poin)`;

        if (vUnlockBox && vUnlockName) {
            if (newUnlock) {
                vUnlockBox.style.display = 'flex';
                vUnlockName.textContent = newUnlock;
            } else {
                vUnlockBox.style.display = 'none';
            }
        }

        if (modal) modal.classList.add('show');
    }

    onGameOver() {
        this.state = 'GAMEOVER';
        sound.stopBGM();
        sound.playDefeat();

        const modal = document.getElementById('modal-gameover');
        const gScore = document.getElementById('gameover-score');
        const gWave = document.getElementById('gameover-wave');
        if (gScore) gScore.textContent = achievements.score.toLocaleString();
        if (gWave) gWave.textContent = `${this.currentWave} / ${this.totalWaves}`;
        if (modal) modal.classList.add('show');
    }
}

// Global Game Engine Instance
let game = null;
window.addEventListener('DOMContentLoaded', () => {
    game = new GameEngine();
    game.state = 'TITLE';
});
