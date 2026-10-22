/* ==========================================================================
   PARTICLE & VISUAL EFFECTS SYSTEM
   Renders Water, Thunder, Flame, Beast, Poison, Mist, Love, Wind, Stone,
   Flower, Shotgun, Petals, and Blood Demon Arts
   ========================================================================== */

class ParticleEngine {
    constructor() {
        this.particles = [];
        this.floatingTexts = [];
        this.slashTrails = [];
    }

    reset() {
        this.particles = [];
        this.floatingTexts = [];
        this.slashTrails = [];
    }

    add(x, y, vx, vy, color, size, life, decay, shape = 'circle', alpha = 1) {
        this.particles.push({
            x, y, vx, vy, color, size, life, maxLife: life, decay, shape, alpha
        });
    }

    // Water Breathing (Tanjiro / Giyu)
    createWaterSplash(x, y, count = 12) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.5;
            const colors = ['#00e5ff', '#00b0ff', '#80d8ff', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.add(
                x + (Math.random() - 0.5) * 16,
                y + (Math.random() - 0.5) * 16,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 0.5,
                color,
                3 + Math.random() * 4,
                0.4 + Math.random() * 0.3,
                1.8,
                'water',
                0.9
            );
        }
    }

    // Thunder Breathing (Zenitsu)
    createLightningSparks(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3.5 + Math.random() * 5.0;
            const colors = ['#ffea00', '#ffd600', '#fff9c4', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                color,
                2 + Math.random() * 3,
                0.25 + Math.random() * 0.2,
                2.5,
                'spark',
                1
            );
        }
    }

    // Flame Breathing (Rengoku)
    createFlameBurst(x, y, count = 18) {
        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
            const speed = 2.0 + Math.random() * 4.5;
            const colors = ['#ff3d00', '#ff9100', '#ffd600', '#ffab00', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.add(
                x + (Math.random() - 0.5) * 20,
                y + (Math.random() - 0.5) * 20,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 1.2,
                color,
                4 + Math.random() * 6,
                0.5 + Math.random() * 0.4,
                1.5,
                'flame',
                0.85
            );
        }
    }

    // Beast Breathing (Inosuke)
    createBeastSlash(x, y) {
        const colors = ['#e0e0e0', '#ffffff', '#90caf9'];
        for (let i = 0; i < 10; i++) {
            const angle = (Math.random() - 0.5) * Math.PI;
            const speed = 3 + Math.random() * 4;
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                colors[Math.floor(Math.random() * colors.length)],
                2 + Math.random() * 4,
                0.3 + Math.random() * 0.2,
                2.0,
                'fang',
                0.9
            );
        }
    }

    // Insect Poison (Shinobu)
    createPoisonMist(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const colors = ['#ba68c8', '#e040fb', '#d500f9', '#f3e5f5'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.add(
                x + (Math.random() - 0.5) * 24,
                y + (Math.random() - 0.5) * 24,
                (Math.random() - 0.5) * 1.5,
                -0.5 - Math.random() * 1.5,
                color,
                3 + Math.random() * 4,
                0.6 + Math.random() * 0.4,
                1.2,
                'poison',
                0.8
            );
        }
    }

    // Blood Demon Art (Nezuko Bakketsu)
    createBloodExplosion(x, y, count = 22) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.0 + Math.random() * 5.0;
            const colors = ['#e91e63', '#ff4081', '#f50057', '#ffffff', '#880e4f'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                color,
                4 + Math.random() * 5,
                0.45 + Math.random() * 0.35,
                1.8,
                'blood',
                0.95
            );
        }
    }

    // NEW: Mist Breathing (Muichiro)
    createMistCloud(x, y, count = 14) {
        const colors = ['rgba(178, 235, 242, 0.7)', 'rgba(224, 247, 250, 0.7)', 'rgba(128, 222, 234, 0.7)'];
        for (let i = 0; i < count; i++) {
            this.add(
                x + (Math.random() - 0.5) * 40,
                y + (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.0,
                colors[Math.floor(Math.random() * colors.length)],
                8 + Math.random() * 10,
                0.8 + Math.random() * 0.5,
                1.0,
                'mist',
                0.7
            );
        }
    }

    // NEW: Love Breathing Hearts (Mitsuri)
    createLoveHearts(x, y, count = 10) {
        const colors = ['#ff4081', '#f48fb1', '#ff80ab', '#ffffff'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.0 + Math.random() * 3.5;
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 0.5,
                colors[Math.floor(Math.random() * colors.length)],
                4 + Math.random() * 4,
                0.6 + Math.random() * 0.3,
                1.5,
                'heart',
                0.9
            );
        }
    }

    // NEW: Wind Breathing Whirlwind (Sanemi)
    createWindTornado(x, y, count = 16) {
        const colors = ['#b9f6ca', '#69f0ae', '#e8f5e9', '#ffffff'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3.0 + Math.random() * 5.0;
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                colors[Math.floor(Math.random() * colors.length)],
                3 + Math.random() * 4,
                0.4 + Math.random() * 0.3,
                2.0,
                'spark',
                0.9
            );
        }
    }

    // NEW: Stone Breathing Shockwave (Gyomei)
    createStoneRubble(x, y, count = 20) {
        const colors = ['#795548', '#8d6e63', '#a1887f', '#4e342e', '#bcaaa4'];
        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
            const speed = 2.5 + Math.random() * 6.0;
            this.add(
                x + (Math.random() - 0.5) * 30,
                y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                colors[Math.floor(Math.random() * colors.length)],
                4 + Math.random() * 6,
                0.6 + Math.random() * 0.3,
                1.6,
                'fang',
                0.95
            );
        }
    }

    // NEW: Flower Petals (Kanao)
    createFlowerPetals(x, y, count = 10) {
        const colors = ['#f8bbd0', '#f48fb1', '#ffcdd2', '#ffffff'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.8 + Math.random() * 3.0;
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                colors[Math.floor(Math.random() * colors.length)],
                4 + Math.random() * 3,
                0.5 + Math.random() * 0.3,
                1.5,
                'petal',
                0.9
            );
        }
    }

    // NEW: Shotgun Sparks (Genya)
    createShotgunPellets(x, y, count = 18) {
        for (let i = 0; i < count; i++) {
            const angle = -0.4 + Math.random() * 0.8;
            const speed = 6.0 + Math.random() * 6.0;
            const colors = ['#ffd54f', '#ffb300', '#ffffff', '#ff6f00'];
            this.add(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                colors[Math.floor(Math.random() * colors.length)],
                3 + Math.random() * 3,
                0.3 + Math.random() * 0.2,
                2.8,
                'spark',
                1
            );
        }
    }

    // NEW: Skill Ready Glow Aura (when skill reaches 100%)
    createSkillReadyAura(x, y) {
        const colors = ['#00e676', '#76ff03', '#ffd700', '#ffffff'];
        for (let i = 0; i < 4; i++) {
            this.add(
                x + (Math.random() - 0.5) * 30,
                y + 10,
                (Math.random() - 0.5) * 0.8,
                -1.2 - Math.random() * 1.5,
                colors[Math.floor(Math.random() * colors.length)],
                2 + Math.random() * 3,
                0.5 + Math.random() * 0.3,
                1.6,
                'spark',
                0.85
            );
        }
    }

    // Floating Wisteria Petal Drift
    createWisteriaPetals(x, y, count = 6) {
        for (let i = 0; i < count; i++) {
            const colors = ['#e1bee7', '#ce93d8', '#ba68c8', '#f8bbd0'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.add(
                x + (Math.random() - 0.5) * 30,
                y + (Math.random() - 0.5) * 30,
                0.8 + Math.random() * 1.5,
                0.5 + Math.random() * 1.0,
                color,
                4 + Math.random() * 4,
                1.2 + Math.random() * 0.8,
                0.6,
                'petal',
                0.85
            );
        }
    }

    addSlashTrail(x1, y1, x2, y2, color, width = 4, duration = 0.25) {
        this.slashTrails.push({
            x1, y1, x2, y2, color, width, life: duration, maxLife: duration
        });
    }

    addFloatingText(text, x, y, color = '#ffd54f', fontSize = 16, duration = 0.85) {
        this.floatingTexts.push({
            text, x, y, color, fontSize, life: duration, maxLife: duration, vy: -1.2
        });
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * 60 * dt;
            p.y += p.vy * 60 * dt;
            p.life -= p.decay * dt;
            p.alpha = Math.max(0, p.life / p.maxLife);

            if (p.shape === 'water') {
                p.vy += 0.08;
            } else if (p.shape === 'flame') {
                p.vy -= 0.05;
                p.size *= 0.98;
            } else if (p.shape === 'petal') {
                p.vx += Math.sin(p.life * 10) * 0.05;
            } else if (p.shape === 'mist') {
                p.size *= 1.02;
            }

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        for (let i = this.slashTrails.length - 1; i >= 0; i--) {
            const st = this.slashTrails[i];
            st.life -= dt;
            if (st.life <= 0) {
                this.slashTrails.splice(i, 1);
            }
        }

        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy * 60 * dt;
            ft.life -= dt;
            if (ft.life <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        ctx.save();

        for (const st of this.slashTrails) {
            const alpha = Math.max(0, st.life / st.maxLife);
            ctx.strokeStyle = st.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = st.width * alpha;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(st.x1, st.y1);
            ctx.lineTo(st.x2, st.y2);
            ctx.stroke();
        }

        for (const p of this.particles) {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;

            if (p.shape === 'circle' || p.shape === 'water' || p.shape === 'mist') {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'spark') {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.life * 12);
                ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
                ctx.restore();
            } else if (p.shape === 'flame') {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = p.alpha * 0.8;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'petal') {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.life * 4);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.7, 0.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else if (p.shape === 'heart') {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.beginPath();
                ctx.arc(-p.size / 2, -p.size / 2, p.size / 2, Math.PI, 0);
                ctx.arc(p.size / 2, -p.size / 2, p.size / 2, Math.PI, 0);
                ctx.lineTo(0, p.size);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            } else if (p.shape === 'poison' || p.shape === 'blood') {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'fang') {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(Math.atan2(p.vy, p.vx));
                ctx.beginPath();
                ctx.moveTo(-p.size * 2, 0);
                ctx.lineTo(p.size * 2, -p.size * 0.8);
                ctx.lineTo(p.size * 1.5, p.size * 0.8);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        for (const ft of this.floatingTexts) {
            const alpha = Math.max(0, ft.life / ft.maxLife);
            ctx.globalAlpha = alpha;
            ctx.font = `900 ${ft.fontSize}px 'Cinzel', 'Plus Jakarta Sans', sans-serif`;
            ctx.fillStyle = ft.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.strokeText(ft.text, ft.x, ft.y);
            ctx.fillText(ft.text, ft.x, ft.y);
        }

        ctx.restore();
    }
}

// Global Particle Engine
const particles = new ParticleEngine();
