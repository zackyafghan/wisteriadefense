/* ==========================================================================
   CHARACTERS, DEMONS, PROJECTILES & DROPS + ALMANAC ENCYCLOPEDIA DATA
   Balanced progression, level-scaled difficulty, and unlocked abilities
   ========================================================================== */

// --- SLAYER UNIT CARDS CONFIGURATION ---
const SLAYER_CONFIG = {
    kakushi: {
        name: 'Dupa Wisteria',
        sub: 'Kakushi / Dupa',
        cost: 50,
        hp: 300,
        cooldown: 5.0,
        unlockLevel: 1,
        desc: 'Menghasilkan 25 kelopak wisteria setiap 9 detik.'
    },
    tanjiro: {
        name: 'Tanjiro Kamado',
        sub: 'Pernapasan Air',
        cost: 100,
        hp: 350,
        cooldown: 6.0,
        unlockLevel: 1,
        desc: 'Tebasan air cepat berdaya hancur tinggi ke iblis dalam jalur.'
    },
    boulder: {
        name: 'Batu Urokodaki',
        sub: 'Batu Latihan Suci',
        cost: 50,
        hp: 3500,
        cooldown: 20.0,
        unlockLevel: 2,
        desc: 'Pertahanan kokoh (HP 3.500) yang menahan laju serbuan iblis.'
    },
    zenitsu: {
        name: 'Zenitsu Agatsuma',
        sub: 'Kilat & Petir',
        cost: 150,
        hp: 300,
        cooldown: 8.0,
        unlockLevel: 2,
        desc: 'Tebasan kilat menembus 3 iblis dan memberikan efek stun.'
    },
    inosuke: {
        name: 'Inosuke Hashibira',
        sub: 'Pernapasan Binatang',
        cost: 125,
        hp: 500,
        cooldown: 7.0,
        unlockLevel: 3,
        desc: 'Petarung jarak dekat ganas dengan pedang ganda dan dorongan mundur.'
    },
    bomb: {
        name: 'Bom Suara Uzui',
        sub: 'Pesta Flamboyan',
        cost: 125,
        hp: 100,
        cooldown: 18.0,
        unlockLevel: 3,
        desc: 'Meledak setelah 1.0 detik, memusnahkan iblis di area 3x3!'
    },
    nezuko: {
        name: 'Nezuko Kamado',
        sub: 'Darah Iblis Bakketsu',
        cost: 125,
        hp: 400,
        cooldown: 8.0,
        unlockLevel: 4,
        desc: 'Semburan api darah iblis pink; menimbulkan luka bakar area dan slow.'
    },
    shinobu: {
        name: 'Shinobu Kocho',
        sub: 'Pilar Serangga',
        cost: 175,
        hp: 320,
        cooldown: 10.0,
        unlockLevel: 4,
        desc: 'Menusuk dengan racun wisteria murni, menembus zirah baja iblis!'
    },
    rengoku: {
        name: 'Kyojuro Rengoku',
        sub: 'Pilar Api',
        cost: 225,
        hp: 450,
        cooldown: 12.0,
        unlockLevel: 5,
        desc: 'Gelombang api dahsyat yang membakar semua iblis di sepanjang jalur!'
    },
    giyu: {
        name: 'Giyu Tomioka',
        sub: 'Pilar Air (Nagi)',
        cost: 200,
        hp: 550,
        cooldown: 12.0,
        unlockLevel: 6,
        desc: 'Aura Nagi: memperlambat musuh di 3 jalur dan meredam serangan.'
    }
};

// --- ALMANAC (INDEKS KARAKTER) ENCYCLOPEDIA DATA ---
const ALMANAC_DATA = {
    slayers: [
        {
            id: 'kakushi',
            name: 'Dupa Wisteria',
            sub: 'Kakushi / Dupa Penyuci',
            cost: '50 🌸',
            hp: '300 HP',
            cooldown: '5.0 dtk',
            damage: 'Support (+25🌸/9 dtk)',
            desc: 'Dupa aromaterapi bunga wisteria yang dinyalakan oleh regu Kakushi. Menghasilkan Kelopak Wisteria secara teratur untuk memanggil petarung pembasmi iblis.',
            lore: '"Bunga Wisteria adalah racun mematikan bagi kaum iblis, namun merupakan sumber berkah pelindung bagi manusia."',
            quote: '— Rahasia Seleksi Akhir Fujikasane'
        },
        {
            id: 'tanjiro',
            name: 'Tanjiro Kamado',
            sub: 'Pernapasan Air (Mizu no Kokyu)',
            cost: '100 🌸',
            hp: '350 HP',
            cooldown: '6.0 dtk',
            damage: '35 (Tiap 1.2 dtk)',
            desc: 'Penyerang utama garis pertahanan. Menggunakan bentuk kedua Mizunoguruma (Roda Air) meluncurkan ombak tebasan berkecepatan tinggi ke arah iblis di jalurnya.',
            lore: '"Tak peduli seberapa banyak kau kehilangan, kau tetap harus terus melangkah maju!"',
            quote: '— Tanjiro Kamado'
        },
        {
            id: 'boulder',
            name: 'Batu Urokodaki',
            sub: 'Batu Latihan Suci Sagiri',
            cost: '50 🌸',
            hp: '3.500 HP',
            cooldown: '20.0 dtk',
            damage: 'Pertahanan Murni',
            desc: 'Batu raksasa Gunung Sagiri berikat tali shimenawa sakral. Memiliki daya tahan sangat tinggi untuk membendung laju serbuan iblis agar petarung di belakang leluasa menyerang.',
            lore: '"Jika kau tak sanggup membelah batu ini, aku takkan mengizinkanmu mengikuti Seleksi Akhir."',
            quote: '— Sakonji Urokodaki'
        },
        {
            id: 'zenitsu',
            name: 'Zenitsu Agatsuma',
            sub: 'Pernapasan Petir (Kaminari no Kokyu)',
            cost: '150 🌸',
            hp: '300 HP',
            cooldown: '8.0 dtk',
            damage: '55 (Tembus 3 Musuh + Stun 0.5s)',
            desc: 'Dalam kondisi tertidur, Zenitsu melancarkan Hekireki Issen (Kilat Kecepatan Dewa) yang menyambar dan menembus hingga 3 musuh di jalurnya serta memberikan efek stun.',
            lore: '"Jika kau hanya mampu menguasai satu jurus, asahlah jurus itu hingga menjadi pedang paling tajam di dunia!"',
            quote: '— Jigoro Kuwajima'
        },
        {
            id: 'inosuke',
            name: 'Inosuke Hashibira',
            sub: 'Pernapasan Binatang (Kiba)',
            cost: '125 🌸',
            hp: '500 HP',
            cooldown: '7.0 dtk',
            damage: '45 (Melee Cepat 0.65s + Knockback)',
            desc: 'Petarung jarak dekat ganas dengan pedang nichirin ganda bergerigi. Menyerang sangat cepat dan memukul mundur (knockback) musuh yang mencoba mendekat.',
            lore: '"Maju dan serbu! Jangan halangi jalanku, namaku adalah Inosuke sang Raja Gunung!"',
            quote: '— Inosuke Hashibira'
        },
        {
            id: 'bomb',
            name: 'Bom Suara Uzui Tengen',
            sub: 'Pesta Flamboyan Suara',
            cost: '125 🌸',
            hp: '100 HP',
            cooldown: '18.0 dtk',
            damage: '1.500 (Area 3x3 Petak)',
            desc: 'Granat mesiu bertabur permata ciptaan Hashira Suara Uzui Tengen. Meledak 1 detik setelah diletakkan, menyapu bersih seluruh iblis dalam radius 3x3 petak.',
            lore: '"Lakukan segala hal dengan cara yang paling flamboyan dan spektakuler!"',
            quote: '— Uzui Tengen'
        },
        {
            id: 'nezuko',
            name: 'Nezuko Kamado',
            sub: 'Darah Iblis Bakketsu',
            cost: '125 🌸',
            hp: '400 HP',
            cooldown: '8.0 dtk',
            damage: '50 + Bakar 20 dps & Slow 30%',
            desc: 'Nezuko menyemburkan api darah iblis pink yang meledak pada kontak pertama, membakar area dan memperlambat langkah semua iblis yang terkena bara api.',
            lore: '"Manusia adalah keluargaku... Aku bersumpah akan melindungi mereka dari iblis!"',
            quote: '— Nezuko Kamado'
        },
        {
            id: 'shinobu',
            name: 'Shinobu Kocho',
            sub: 'Pilar Serangga (Mushi no Kokyu)',
            cost: '175 🌸',
            hp: '320 HP',
            cooldown: '10.0 dtk',
            damage: '25 + Racun 45 dps (Menembus Zirah!)',
            desc: 'Menusukkan stiletto berlumur racun bunga wisteria murni. Racunnya mengalir di pembuluh darah iblis, melelehkan HP mereka tanpa terhalang zirah baja!',
            lore: '"Meskipun tubuhku kecil dan tak mampu memenggal leher iblis, racun ini sanggup melenyapkan iblis terkuat sekalipun."',
            quote: '— Shinobu Kocho'
        },
        {
            id: 'rengoku',
            name: 'Kyojuro Rengoku',
            sub: 'Pilar Api (Honoo no Kokyu)',
            cost: '225 🌸',
            hp: '450 HP',
            cooldown: '12.0 dtk',
            damage: '110 (Menembus 1 Jalur Penuh!)',
            desc: 'Melancarkan tebasan Harimau Api berkobar raksasa. Ombak apinya melesat menembus semua iblis dalam satu jalur penuh tanpa henti!',
            lore: '"Bakar semangat jiwamu! Lampaui batas kemampuanmu, jangan pernah biarkan hatimu menyerah!"',
            quote: '— Kyojuro Rengoku'
        },
        {
            id: 'giyu',
            name: 'Giyu Tomioka',
            sub: 'Pilar Air (Bentuk ke-11: Nagi)',
            cost: '200 🌸',
            hp: '550 HP',
            cooldown: '12.0 dtk',
            damage: '45 + Slow 60% di 3 Jalur',
            desc: 'Menciptakan jurus orisinalnya: Ketenangan Air (Nagi). Meredam dan memperlambat pergerakan musuh di jalurnya serta baris atas dan bawah sebesar 60%.',
            lore: '"Dalam ketenangan air, tak ada pedang maupun darah iblis yang mampu menembus."',
            quote: '— Giyu Tomioka'
        }
    ],
    demons: [
        {
            id: 'lesser',
            name: 'Iblis Biasa (Lesser Oni)',
            sub: 'Iblis Pemburu Pemula',
            hp: '150 HP',
            speed: 'Sedang-Lambat (24 px/s)',
            danger: 'Rendah 🟢',
            weakness: 'Tebasan Mizunoguruma Tanjiro',
            desc: 'Iblis tingkat rendah yang bersembunyi di kegelapan malam. Bergerak perlahan dan menggigit pembasmi iblis jika berada di dekatnya.',
            lore: '"Daging manusia... aromanya begitu manis di malam hari!"'
        },
        {
            id: 'fast',
            name: 'Iblis Lincah (Fast Oni)',
            sub: 'Iblis Kuil Pembongkok',
            hp: '110 HP',
            speed: 'Sangat Cepat (46 px/s)',
            danger: 'Menengah 🟡',
            weakness: 'Batu Urokodaki & Kilat Zenitsu',
            desc: 'Iblis bertubuh ramping yang merangkak dan berlari sangat kencang. Berbahaya jika tidak segera dihadang dengan batu pertahanan atau jurus stun kilat.',
            lore: '"Terlalu lambat! Kau takkan pernah bisa menangkap langkah kakiku!"'
        },
        {
            id: 'armored',
            name: 'Iblis Zirah Baja (Armored Oni)',
            sub: 'Iblis Raksasa Bertameng Besi',
            hp: '550 HP (Resis 45% Fisik)',
            speed: 'Lambat (18 px/s)',
            danger: 'Tinggi 🟠',
            weakness: 'Racun Shinobu Kocho & Bom Uzui',
            desc: 'Iblis berotot kekar mengenakan pelindung bahu baja berduri. Tebasan pedang biasa berkurang 45%, namun racun Shinobu mengabaikan pertahanan ini!',
            lore: '"Pedang lemahmu takkan pernah sanggup menembus baja zirahku!"'
        },
        {
            id: 'susamaru',
            name: 'Susamaru',
            sub: 'Iblis Temari Bertangan Enam',
            hp: '350 HP',
            speed: 'Sedang (20 px/s)',
            danger: 'Tinggi 🟠',
            weakness: 'Tebasan Api Rengoku & Petir Zenitsu',
            desc: 'Memiliki 6 lengan yang melemparkan bola-bola Temari berduri memantul dari jarak jauh, merusak pembasmi iblis sebelum mereka mendekat.',
            lore: '"Mari kita bermain lempar tangkap sampai tubuhmu hancur berkeping-keping!"'
        },
        {
            id: 'yahaba',
            name: 'Yahaba',
            sub: 'Iblis Vektor Mata Panah',
            hp: '380 HP',
            speed: 'Sedang (19 px/s)',
            danger: 'Tinggi 🟠',
            weakness: 'Serbuan Inosuke & Air Tanjiro',
            desc: 'Iblis dengan mata di kedua telapak tangannya yang mengendalikan arah vektor panah merah tak kasat mata untuk menyerang pembasmi iblis.',
            lore: '"Kotor sekali... jangan biarkan debu mengotori kimonoku sebelum kau mati!"'
        },
        {
            id: 'rui',
            name: 'Rui',
            sub: 'Iblis Bulan Bawah 5 (Lower Moon 5)',
            hp: '1.400 HP (Boss)',
            speed: 'Lambat-Stabil (16 px/s)',
            danger: 'Sangat Tinggi 🔴',
            weakness: 'Ombak Api Rengoku & Hinokami Kagura',
            desc: 'Boss Gunung Natagumo. Menenun benang laba-laba merah yang setajam kawat baja untuk melilit dan merusak petarung pembasmi iblis.',
            lore: '"Ikatan keluarga sejati takkan pernah bisa diputuskan oleh siapapun."'
        },
        {
            id: 'akaza',
            name: 'Akaza',
            sub: 'Iblis Bulan Atas 3 (Upper Moon 3)',
            hp: '2.800 HP (Boss Besar)',
            speed: 'Cepat & Kuat (20 px/s)',
            danger: 'Ekstrem 💀',
            weakness: 'Nagi Giyu, Tembok Batu, & Hinokami Kagura',
            desc: 'Pendekar bela diri iblis terkuat. Mengaktifkan jurus Hakai Satsu (Destructive Death) menghasilkan gelombang kejut tinju yang menghancurkan beberapa baris.',
            lore: '"Jadilah iblis, Kyojuro! Jika tidak, kau hanya akan menua dan mati sia-sia!"'
        },
        {
            id: 'muzan',
            name: 'Muzan Kibutsuji',
            sub: 'Raja Iblis Abadi (Final Boss)',
            hp: '5.500 HP (Boss Puncak)',
            speed: 'Stabil (14 px/s)',
            danger: 'Bencana Mutlak 👑',
            weakness: 'Seluruh Hashira & Tarian Dewa Api',
            desc: 'Leluhur seluruh iblis. Memiliki regenerasi HP konstan (+15 HP/dtk), cambuk tentakel duri mematikan dari punggungnya, dan memanggil minion iblis pelindung.',
            lore: '"Aku adalah makhluk hidup yang paling mendekati kesempurnaan di dunia ini."'
        }
    ]
};

// --- SLAYER UNIT CLASS ---
class Slayer {
    constructor(type, col, row, x, y) {
        this.type = type;
        this.config = SLAYER_CONFIG[type];
        this.col = col;
        this.row = row;
        this.x = x;
        this.y = y;
        this.hp = this.config.hp;
        this.maxHp = this.config.hp;
        this.animTime = Math.random() * 5;
        this.attackTimer = 0;
        this.isAttacking = false;
        this.attackDuration = 0;

        if (type === 'kakushi') {
            this.produceTimer = 3.5;
        } else if (type === 'bomb') {
            this.fuseTimer = 1.0;
        }
    }

    update(dt, game) {
        this.animTime += dt;

        if (this.attackDuration > 0) {
            this.attackDuration -= dt;
            if (this.attackDuration <= 0) {
                this.isAttacking = false;
            }
        }

        switch (this.type) {
            case 'kakushi':
                this.produceTimer -= dt;
                if (this.produceTimer <= 0) {
                    this.produceTimer = 9.0;
                    game.spawnPetalDrop(this.x, this.y, 25);
                    particles.createWisteriaPetals(this.x, this.y, 10);
                    sound.playPetalPickup();
                }
                break;

            case 'tanjiro':
                this.attackTimer += dt;
                if (this.attackTimer >= 1.2) {
                    const target = game.findFirstDemonInRow(this.row, this.x);
                    if (target) {
                        this.attackTimer = 0;
                        this.isAttacking = true;
                        this.attackDuration = 0.3;
                        game.spawnProjectile(new Projectile('water', this.x + 22, this.y, this.row, 35, 420, 'tanjiro'));
                        sound.playWaterSplash();
                        particles.createWaterSplash(this.x + 24, this.y, 8);
                    }
                }
                break;

            case 'zenitsu':
                this.attackTimer += dt;
                if (this.attackTimer >= 1.8) {
                    const target = game.findFirstDemonInRow(this.row, this.x);
                    if (target) {
                        this.attackTimer = 0;
                        this.isAttacking = true;
                        this.attackDuration = 0.28;
                        game.spawnProjectile(new Projectile('thunder', this.x + 22, this.y, this.row, 55, 620, 'zenitsu', 3));
                        sound.playThunderSlash();
                        particles.createLightningSparks(this.x + 24, this.y, 12);
                    }
                }
                break;

            case 'inosuke':
                this.attackTimer += dt;
                if (this.attackTimer >= 0.65) {
                    const targets = game.getDemonsInRange(this.row, this.x, this.x + 90);
                    if (targets.length > 0) {
                        this.attackTimer = 0;
                        this.isAttacking = true;
                        this.attackDuration = 0.25;
                        sound.playSwordSlash();
                        particles.createBeastSlash(this.x + 40, this.y);
                        targets.forEach(demon => {
                            demon.takeDamage(45, 'inosuke', game);
                            demon.x += 22;
                        });
                    }
                }
                break;

            case 'nezuko':
                this.attackTimer += dt;
                if (this.attackTimer >= 1.7) {
                    const target = game.findFirstDemonInRow(this.row, this.x);
                    if (target) {
                        this.attackTimer = 0;
                        this.isAttacking = true;
                        this.attackDuration = 0.35;
                        game.spawnProjectile(new Projectile('blood', this.x + 22, this.y, this.row, 50, 380, 'nezuko', 1, true));
                        particles.createBloodExplosion(this.x + 20, this.y, 8);
                    }
                }
                break;

            case 'shinobu':
                this.attackTimer += dt;
                if (this.attackTimer >= 1.5) {
                    const target = game.findFirstDemonInRow(this.row, this.x);
                    if (target) {
                        this.attackTimer = 0;
                        this.isAttacking = true;
                        this.attackDuration = 0.22;
                        game.spawnProjectile(new Projectile('poison', this.x + 22, this.y, this.row, 25, 550, 'shinobu', 1, false, true));
                        sound.playPoisonStab();
                        particles.createPoisonMist(this.x + 20, this.y, 6);
                    }
                }
                break;

            case 'rengoku':
                this.attackTimer += dt;
                if (this.attackTimer >= 2.0) {
                    const target = game.findFirstDemonInRow(this.row, this.x);
                    if (target) {
                        this.attackTimer = 0;
                        this.isAttacking = true;
                        this.attackDuration = 0.45;
                        game.spawnProjectile(new Projectile('flame', this.x + 24, this.y, this.row, 110, 460, 'rengoku', 99));
                        sound.playFlameRoar();
                        particles.createFlameBurst(this.x + 24, this.y, 16);
                    }
                }
                break;

            case 'giyu':
                this.attackTimer += dt;
                if (this.attackTimer >= 2.6) {
                    this.attackTimer = 0;
                    this.isAttacking = true;
                    this.attackDuration = 0.7;
                    game.applyGiyuNagi(this.row, this.x);
                    sound.playWaterSplash();
                    achievements.trackGiyuSlow();
                }
                break;

            case 'bomb':
                this.fuseTimer -= dt;
                if (this.fuseTimer <= 0) {
                    game.detonateBomb(this.row, this.col, this.x, this.y);
                    this.hp = 0;
                }
                break;

            case 'boulder':
                break;
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        return this.hp <= 0;
    }

    draw(ctx) {
        const hpPct = this.hp / this.maxHp;

        switch (this.type) {
            case 'kakushi': sprites.drawKakushi(ctx, this.x, this.y, this.animTime); break;
            case 'tanjiro': sprites.drawTanjiro(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'zenitsu': sprites.drawZenitsu(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'inosuke': sprites.drawInosuke(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'nezuko': sprites.drawNezuko(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'shinobu': sprites.drawShinobu(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'rengoku': sprites.drawRengoku(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'giyu': sprites.drawGiyu(ctx, this.x, this.y, this.animTime, this.isAttacking); break;
            case 'boulder': sprites.drawBoulder(ctx, this.x, this.y, this.animTime, hpPct); break;
            case 'bomb': sprites.drawTengenBomb(ctx, this.x, this.y, this.animTime); break;
        }

        if (this.hp < this.maxHp && this.type !== 'bomb') {
            ctx.save();
            ctx.fillStyle = '#111';
            ctx.fillRect(this.x - 20, this.y - 36, 40, 5);
            ctx.fillStyle = hpPct > 0.5 ? '#00e676' : hpPct > 0.25 ? '#ffeb3b' : '#ff1744';
            ctx.fillRect(this.x - 20, this.y - 36, 40 * Math.max(0, hpPct), 5);
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x - 20, this.y - 36, 40, 5);
            ctx.restore();
        }
    }
}

// --- DEMON (ONI) CLASS ---
class Demon {
    constructor(type, row, startX, level = 1) {
        this.type = type;
        this.row = row;
        this.x = startX;
        this.y = 0;
        this.animTime = Math.random() * 5;
        this.eatingTarget = null;
        this.eatCooldown = 0;
        this.level = level;

        this.poisonTimer = 0;
        this.poisonDps = 0;
        this.burnTimer = 0;
        this.burnDps = 0;
        this.slowTimer = 0;
        this.slowFactor = 1.0;
        this.stunTimer = 0;

        let hpScale = 1.0;
        let spdScale = 1.0;

        if (level === 1) {
            hpScale = 0.65;
            spdScale = 0.75;
        } else if (level === 2) {
            hpScale = 0.80;
            spdScale = 0.85;
        } else if (level === 3) {
            hpScale = 0.95;
            spdScale = 0.95;
        } else if (level === 4) {
            hpScale = 1.10;
            spdScale = 1.05;
        } else if (level === 5) {
            hpScale = 1.25;
            spdScale = 1.15;
        } else if (level >= 6) {
            hpScale = 1.45;
            spdScale = 1.25;
        }

        switch (type) {
            case 'lesser':
                this.hp = Math.round(150 * hpScale);
                this.speed = 24 * spdScale;
                this.damage = 15;
                this.score = 100;
                break;
            case 'fast':
                this.hp = Math.round(110 * hpScale);
                this.speed = 46 * spdScale;
                this.damage = 18;
                this.score = 150;
                break;
            case 'armored':
                this.hp = Math.round(550 * hpScale);
                this.speed = 18 * spdScale;
                this.damage = 25;
                this.score = 250;
                this.armor = 0.45;
                break;
            case 'susamaru':
                this.hp = Math.round(350 * hpScale);
                this.speed = 20 * spdScale;
                this.damage = 20;
                this.score = 400;
                this.throwTimer = 3.8;
                break;
            case 'yahaba':
                this.hp = Math.round(380 * hpScale);
                this.speed = 19 * spdScale;
                this.damage = 20;
                this.score = 400;
                this.arrowTimer = 4.2;
                break;
            case 'rui':
                this.hp = Math.round(1400 * hpScale);
                this.speed = 16 * spdScale;
                this.damage = 38;
                this.score = 2500;
                this.isBoss = true;
                this.webTimer = 5.0;
                break;
            case 'akaza':
                this.hp = Math.round(2800 * hpScale);
                this.speed = 20 * spdScale;
                this.damage = 50;
                this.score = 5000;
                this.isBoss = true;
                this.shockwaveTimer = 5.5;
                break;
            case 'muzan':
                this.hp = Math.round(5500 * hpScale);
                this.speed = 14 * spdScale;
                this.damage = 75;
                this.score = 10000;
                this.isBoss = true;
                this.summonTimer = 7.0;
                break;
        }

        this.maxHp = this.hp;
    }

    update(dt, game) {
        this.animTime += dt;

        if (this.stunTimer > 0) {
            this.stunTimer -= dt;
            return;
        }

        if (this.slowTimer > 0) {
            this.slowTimer -= dt;
            if (this.slowTimer <= 0) {
                this.slowFactor = 1.0;
            }
        }

        if (this.poisonTimer > 0) {
            this.poisonTimer -= dt;
            this.takeRawDamage(this.poisonDps * dt, 'shinobu', game);
            if (Math.random() < 0.2) {
                particles.createPoisonMist(this.x, this.y, 2);
            }
        }

        if (this.burnTimer > 0) {
            this.burnTimer -= dt;
            this.takeRawDamage(this.burnDps * dt, 'nezuko', game);
            if (Math.random() < 0.2) {
                particles.createFlameBurst(this.x, this.y, 2);
            }
        }

        if (this.type === 'susamaru') {
            this.throwTimer -= dt;
            if (this.throwTimer <= 0) {
                this.throwTimer = 4.0;
                game.spawnDemonProjectile(new DemonProjectile('temari', this.x - 20, this.y, this.row, 30, -260));
            }
        } else if (this.type === 'yahaba') {
            this.arrowTimer -= dt;
            if (this.arrowTimer <= 0) {
                this.arrowTimer = 4.5;
                game.spawnDemonProjectile(new DemonProjectile('arrow', this.x - 20, this.y, this.row, 25, -300));
            }
        } else if (this.type === 'rui') {
            this.webTimer -= dt;
            if (this.webTimer <= 0) {
                this.webTimer = 5.5;
                game.spawnDemonProjectile(new DemonProjectile('web', this.x - 25, this.y, this.row, 35, -280));
            }
        } else if (this.type === 'akaza') {
            this.shockwaveTimer -= dt;
            if (this.shockwaveTimer <= 0) {
                this.shockwaveTimer = 6.0;
                game.triggerAkazaShockwave(this.row, this.x);
                sound.playExplosion();
            }
        } else if (this.type === 'muzan') {
            this.hp = Math.min(this.maxHp, this.hp + 15 * dt);
            this.summonTimer -= dt;
            if (this.summonTimer <= 0) {
                this.summonTimer = 8.0;
                game.spawnMuzanMinions(this.x);
            }
        }

        const slayerInFront = game.getSlayerAt(this.row, this.x);
        if (slayerInFront) {
            this.eatingTarget = slayerInFront;
            this.eatCooldown -= dt;
            if (this.eatCooldown <= 0) {
                this.eatCooldown = 0.9;
                const isDead = slayerInFront.takeDamage(this.damage);
                sound.playDemonHit();
                particles.addSlashTrail(this.x, this.y - 10, this.x - 20, this.y + 10, '#ff1744', 3);
                if (isDead) {
                    game.removeSlayer(slayerInFront);
                    this.eatingTarget = null;
                }
            }
        } else {
            this.eatingTarget = null;
            const currentSpeed = this.speed * this.slowFactor;
            this.x -= currentSpeed * dt;
        }
    }

    takeDamage(rawDamage, slayerType, game) {
        let finalDamage = rawDamage;

        if (this.armor && slayerType !== 'shinobu' && slayerType !== 'rengoku') {
            finalDamage *= (1 - this.armor);
        }

        this.hp -= finalDamage;
        sound.playDemonHit();
        particles.addFloatingText(`-${Math.round(finalDamage)}`, this.x, this.y - 20, '#ffeb3b', 14);

        if (this.hp <= 0) {
            this.die(slayerType, game);
            return true;
        }
        return false;
    }

    takeRawDamage(damage, slayerType, game) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die(slayerType, game);
            return true;
        }
        return false;
    }

    applyPoison(dps, duration) {
        this.poisonDps = Math.max(this.poisonDps, dps);
        this.poisonTimer = Math.max(this.poisonTimer, duration);
    }

    applyBurn(dps, duration) {
        this.burnDps = Math.max(this.burnDps, dps);
        this.burnTimer = Math.max(this.burnTimer, duration);
        this.slowFactor = 0.7;
        this.slowTimer = Math.max(this.slowTimer, duration);
    }

    applySlow(factor, duration) {
        this.slowFactor = Math.min(this.slowFactor, factor);
        this.slowTimer = Math.max(this.slowTimer, duration);
    }

    applyStun(duration) {
        this.stunTimer = Math.max(this.stunTimer, duration);
    }

    die(slayerType, game) {
        sound.playDemonDeath();
        particles.createWisteriaPetals(this.x, this.y, 8);
        const earned = achievements.addScore(this.score, slayerType);
        particles.addFloatingText(`+${earned}`, this.x, this.y - 30, '#ffd700', 18);

        game.addUltimateCharge(this.isBoss ? 40 : 8);

        if (this.type === 'rui') achievements.trackBossKilled('boss_rui');
        if (this.type === 'akaza') achievements.trackBossKilled('boss_akaza');
        if (this.type === 'muzan') achievements.trackBossKilled('boss_muzan');

        if (Math.random() < 0.35 || this.isBoss) {
            game.spawnPetalDrop(this.x, this.y, 25);
        }
    }

    draw(ctx) {
        if (this.poisonTimer > 0) {
            ctx.save();
            ctx.strokeStyle = 'rgba(213, 0, 249, 0.6)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 24, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        switch (this.type) {
            case 'lesser': sprites.drawLesserDemon(ctx, this.x, this.y, this.animTime); break;
            case 'fast': sprites.drawFastDemon(ctx, this.x, this.y, this.animTime); break;
            case 'armored': sprites.drawArmoredDemon(ctx, this.x, this.y, this.animTime); break;
            case 'susamaru': sprites.drawSusamaru(ctx, this.x, this.y, this.animTime); break;
            case 'yahaba': sprites.drawYahaba(ctx, this.x, this.y, this.animTime); break;
            case 'rui': sprites.drawRui(ctx, this.x, this.y, this.animTime); break;
            case 'akaza': sprites.drawAkaza(ctx, this.x, this.y, this.animTime); break;
            case 'muzan': sprites.drawMuzan(ctx, this.x, this.y, this.animTime); break;
        }

        const hpPct = Math.max(0, this.hp / this.maxHp);
        const barWidth = this.isBoss ? 60 : 36;
        const barHeight = this.isBoss ? 6 : 4;
        const offsetY = this.isBoss ? 44 : 34;

        ctx.save();
        ctx.fillStyle = '#111';
        ctx.fillRect(this.x - barWidth / 2, this.y - offsetY, barWidth, barHeight);
        ctx.fillStyle = this.isBoss ? '#d50000' : (hpPct > 0.5 ? '#ff1744' : '#d50000');
        ctx.fillRect(this.x - barWidth / 2, this.y - offsetY, barWidth * hpPct, barHeight);
        ctx.strokeStyle = this.isBoss ? '#ffd700' : 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - barWidth / 2, this.y - offsetY, barWidth, barHeight);
        ctx.restore();
    }
}

// --- PROJECTILE CLASS ---
class Projectile {
    constructor(type, x, y, row, damage, speed, slayerType, pierce = 1, isAoe = false, isPoison = false) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.row = row;
        this.damage = damage;
        this.speed = speed;
        this.slayerType = slayerType;
        this.pierce = pierce;
        this.hitCount = 0;
        this.isAoe = isAoe;
        this.isPoison = isPoison;
        this.animTime = 0;
    }

    update(dt) {
        this.animTime += dt;
        this.x += this.speed * dt;
    }

    onHitDemon(demon, game) {
        this.hitCount++;

        if (this.type === 'water') {
            particles.createWaterSplash(demon.x, demon.y, 8);
            demon.takeDamage(this.damage, this.slayerType, game);
        } else if (this.type === 'thunder') {
            particles.createLightningSparks(demon.x, demon.y, 10);
            demon.takeDamage(this.damage, this.slayerType, game);
            demon.applyStun(0.5);
        } else if (this.type === 'blood') {
            particles.createBloodExplosion(demon.x, demon.y, 14);
            sound.playExplosion();
            const demonsAround = game.getDemonsInRange(this.row, demon.x - 70, demon.x + 70);
            demonsAround.forEach(d => {
                d.takeDamage(this.damage, this.slayerType, game);
                d.applyBurn(20, 3.0);
            });
        } else if (this.type === 'poison') {
            particles.createPoisonMist(demon.x, demon.y, 8);
            demon.takeDamage(this.damage, this.slayerType, game);
            demon.applyPoison(45, 5.0);
        } else if (this.type === 'flame') {
            particles.createFlameBurst(demon.x, demon.y, 10);
            demon.takeDamage(this.damage, this.slayerType, game);
            demon.applyBurn(25, 3.0);
        }

        return this.hitCount >= this.pierce;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'water') {
            ctx.rotate(this.animTime * 15);
            ctx.fillStyle = '#00e5ff';
            ctx.beginPath();
            ctx.arc(0, 0, 11, 0, Math.PI);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI);
            ctx.fill();
        } else if (this.type === 'thunder') {
            ctx.strokeStyle = '#ffeb3b';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(-18, 0); ctx.lineTo(-5, -7); ctx.lineTo(5, 7); ctx.lineTo(18, 0);
            ctx.stroke();
        } else if (this.type === 'blood') {
            ctx.fillStyle = '#e91e63';
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ff80ab';
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'poison') {
            ctx.fillStyle = '#d500f9';
            ctx.fillRect(-14, -2, 28, 4);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(8, -1, 6, 2);
        } else if (this.type === 'flame') {
            ctx.rotate(this.animTime * 12);
            ctx.fillStyle = '#ff3d00';
            ctx.beginPath();
            ctx.arc(0, 0, 18, -0.6, 2.0);
            ctx.lineTo(0, 0);
            ctx.fill();
            ctx.fillStyle = '#ffeb3b';
            ctx.beginPath();
            ctx.arc(0, 0, 9, -0.6, 2.0);
            ctx.lineTo(0, 0);
            ctx.fill();
        }

        ctx.restore();
    }
}

// --- DEMON PROJECTILE CLASS ---
class DemonProjectile {
    constructor(type, x, y, row, damage, speed) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.row = row;
        this.damage = damage;
        this.speed = speed;
        this.animTime = 0;
    }

    update(dt) {
        this.animTime += dt;
        this.x += this.speed * dt;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'temari') {
            ctx.rotate(this.animTime * 8);
            ctx.fillStyle = '#e65100';
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else if (this.type === 'arrow') {
            ctx.strokeStyle = '#ff1744';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(12, 0); ctx.lineTo(-12, 0);
            ctx.lineTo(-6, -6);
            ctx.moveTo(-12, 0);
            ctx.lineTo(-6, 6);
            ctx.stroke();
        } else if (this.type === 'web') {
            ctx.strokeStyle = '#ff1744';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.moveTo(-12, 0); ctx.lineTo(12, 0);
            ctx.moveTo(0, -12); ctx.lineTo(0, 12);
            ctx.stroke();
        }

        ctx.restore();
    }
}

// --- RESOURCE DROP: Wisteria Petal ---
class PetalDrop {
    constructor(x, y, value = 25, isFalling = false, targetY = 0) {
        this.x = x;
        this.y = y;
        this.targetY = targetY || y;
        this.value = value;
        this.isFalling = isFalling;
        this.animTime = Math.random() * 5;
        this.life = 14.0;
        this.collected = false;
        this.collectProgress = 0;
        this.radius = 20;
    }

    update(dt) {
        this.animTime += dt;

        if (this.collected) {
            this.collectProgress += dt * 3.5;
            this.x += (60 - this.x) * 0.2;
            this.y += (30 - this.y) * 0.2;
            return this.collectProgress >= 1.0;
        }

        if (this.isFalling && this.y < this.targetY) {
            this.y += 65 * dt;
            this.x += Math.sin(this.animTime * 3) * 0.6;
        }

        this.life -= dt;
        return this.life <= 0;
    }

    collect(game) {
        if (this.collected) return;
        this.collected = true;
        sound.playPetalPickup();
        game.addWisteria(this.value);
        achievements.trackWisteriaCollected(this.value);
        particles.createWisteriaPetals(this.x, this.y, 8);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const floatSway = Math.sin(this.animTime * 4) * 3;
        const pulse = 1.0 + Math.sin(this.animTime * 5) * 0.08;
        ctx.scale(pulse, pulse);

        const grad = ctx.createRadialGradient(0, floatSway, 2, 0, floatSway, 22);
        grad.addColorStop(0, 'rgba(234, 128, 252, 0.9)');
        grad.addColorStop(1, 'rgba(186, 104, 200, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, floatSway, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🌸', 0, floatSway);

        ctx.restore();
    }
}
