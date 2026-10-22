/* ==========================================================================
   SPRITE & GRAPHICS RENDERER (EXPANDED ROSTER: 16 SLAYERS & 12 DEMONS)
   Procedural canvas rendering with signature outfits, hairstyles, blades & auras
   ========================================================================== */

class SpriteRenderer {
    constructor() {
        this.cardThumbCache = {};
        this.demonThumbCache = {};
    }

    // --- PATTERN HELPERS ---
    drawTanjiroHaori(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#1b5e20';
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = '#111111';
        const checkW = w / 3;
        const checkH = h / 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if ((r + c) % 2 === 0) {
                    ctx.fillRect(x + c * checkW, y + r * checkH, checkW, checkH);
                }
            }
        }
        ctx.restore();
    }

    drawZenitsuHaori(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#ffb300';
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = '#ffffff';
        const cols = 2;
        for (let r = 0; r < 2; r++) {
            for (let c = 0; c < cols; c++) {
                ctx.beginPath();
                const tx = x + c * (w / cols) + (w / cols) / 2;
                const ty = y + r * (h / 2);
                ctx.moveTo(tx, ty + 2);
                ctx.lineTo(tx - 4, ty + 8);
                ctx.lineTo(tx + 4, ty + 8);
                ctx.closePath();
                ctx.fill();
            }
        }
        ctx.restore();
    }

    drawGiyuHaori(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#880e4f';
        ctx.fillRect(x, y, w / 2, h);
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(x + w / 2, y, w / 2, h);
        ctx.fillStyle = '#fbc02d';
        ctx.fillRect(x + w * 0.7, y, w * 0.3, h / 2);
        ctx.restore();
    }

    drawRengokuHaori(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = '#d50000';
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + h - 8);
        ctx.lineTo(x + w * 0.25, y + h - 14);
        ctx.lineTo(x + w * 0.5, y + h - 6);
        ctx.lineTo(x + w * 0.75, y + h - 14);
        ctx.lineTo(x + w, y + h - 8);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffab00';
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + h - 4);
        ctx.lineTo(x + w * 0.5, y + h - 10);
        ctx.lineTo(x + w, y + h - 4);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    drawShinobuHaori(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = '#80deea';
        ctx.fillRect(x, y + h - 7, w, 4);
        ctx.fillStyle = '#f48fb1';
        ctx.fillRect(x, y + h - 4, w, 2);
        ctx.fillStyle = '#111111';
        ctx.fillRect(x, y + h - 2, w, 2);
        ctx.restore();
    }

    drawNezukoKimono(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#f48fb1';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#ad1457';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y + h);
        ctx.moveTo(x + w, y);
        ctx.lineTo(x, y + h);
        ctx.stroke();
        ctx.restore();
    }

    // -------------------------------------------------------------
    // SLAYER DRAWERS (16 HEROES)
    // -------------------------------------------------------------
    drawKakushi(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 2;

        ctx.fillStyle = '#4e342e';
        ctx.beginPath();
        ctx.ellipse(0, 10 + bob, 16, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#d4af37';
        ctx.fillRect(-12, 18 + bob, 24, 4);
        ctx.fillRect(-14, 0 + bob, 28, 4);

        ctx.fillStyle = '#ab47bc';
        ctx.beginPath();
        ctx.arc(0, -2 + bob, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(206, 147, 216, 0.7)';
        const smokeY = Math.sin(animTime * 4) * 6;
        ctx.beginPath();
        ctx.arc(Math.cos(animTime * 3) * 4, -14 + bob + smokeY, 6, 0, Math.PI * 2);
        ctx.arc(-Math.sin(animTime * 2) * 5, -22 + bob, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌸', 0, 14 + bob);

        ctx.restore();
    }

    drawTanjiro(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;
        const attackAngle = isAttacking ? Math.sin(animTime * 15) * 0.4 : 0;
        ctx.rotate(attackAngle);

        ctx.fillStyle = '#212121';
        ctx.fillRect(-8, 14 + bob, 6, 14);
        ctx.fillRect(2, 14 + bob, 6, 14);

        this.drawTanjiroHaori(ctx, -14, -4 + bob, 28, 22);

        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(-14, 12 + bob, 28, 3);

        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4a1525';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.lineTo(13, -12 + bob);
        ctx.lineTo(-13, -12 + bob);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-10, -26 + bob);
        ctx.lineTo(-2, -32 + bob);
        ctx.lineTo(6, -26 + bob);
        ctx.lineTo(12, -30 + bob);
        ctx.lineTo(14, -18 + bob);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#b71c1c';
        ctx.beginPath();
        ctx.moveTo(3, -21 + bob);
        ctx.lineTo(8, -17 + bob);
        ctx.lineTo(4, -14 + bob);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-14, -12 + bob, 3, 7);
        ctx.fillStyle = '#c62828';
        ctx.fillRect(-14, -10 + bob, 3, 2);

        ctx.fillStyle = '#4e342e';
        ctx.fillRect(-6, -15 + bob, 3, 4);
        ctx.fillRect(3, -15 + bob, 3, 4);

        ctx.save();
        const swordRot = isAttacking ? Math.sin(animTime * 20) * 0.8 : 0.2;
        ctx.translate(10, 4 + bob);
        ctx.rotate(swordRot);
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, -2, 28, 4);
        ctx.fillStyle = '#00bcd4';
        ctx.fillRect(0, -1, 28, 2);
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(-2, -4, 4, 8);

        if (isAttacking) {
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(14, 0, 22, -0.6, 1.2);
            ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(28, 12, 4, 0, Math.PI * 2);
            ctx.arc(24, -14, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        ctx.restore();
    }

    drawZenitsu(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        ctx.fillStyle = '#ff8f00';
        ctx.fillRect(-8, 14 + bob, 6, 14);
        ctx.fillRect(2, 14 + bob, 6, 14);

        this.drawZenitsuHaori(ctx, -14, -4 + bob, 28, 22);

        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffd600';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff6d00';
        ctx.fillRect(-12, -18 + bob, 6, 8);
        ctx.fillRect(-4, -18 + bob, 7, 8);
        ctx.fillRect(4, -18 + bob, 8, 8);

        ctx.strokeStyle = '#3e2723';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-6, -14 + bob);
        ctx.lineTo(-2, -14 + bob);
        ctx.moveTo(3, -14 + bob);
        ctx.lineTo(7, -14 + bob);
        ctx.stroke();

        ctx.save();
        ctx.translate(8, 2 + bob);
        ctx.fillStyle = '#ffd600';
        ctx.fillRect(0, -2, 26, 4);
        ctx.fillStyle = '#ffeb3b';
        ctx.fillRect(2, -1, 22, 2);

        if (isAttacking) {
            ctx.strokeStyle = '#fff59d';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(10, -8);
            ctx.lineTo(18, 6);
            ctx.lineTo(32, -4);
            ctx.stroke();
        }
        ctx.restore();

        ctx.restore();
    }

    drawInosuke(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 5) * 2.5;

        ctx.fillStyle = '#263238';
        ctx.fillRect(-8, 14 + bob, 6, 14);
        ctx.fillRect(2, 14 + bob, 6, 14);
        ctx.fillStyle = '#8d6e63';
        ctx.fillRect(-14, 8 + bob, 28, 8);

        ctx.fillStyle = '#ffcc80';
        ctx.fillRect(-12, -2 + bob, 24, 14);

        ctx.fillStyle = '#90a4ae';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffab91';
        ctx.beginPath();
        ctx.moveTo(-12, -26 + bob); ctx.lineTo(-6, -34 + bob); ctx.lineTo(-2, -26 + bob); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(2, -26 + bob); ctx.lineTo(6, -34 + bob); ctx.lineTo(12, -26 + bob); ctx.fill();

        ctx.fillStyle = '#cfd8dc';
        ctx.beginPath();
        ctx.ellipse(0, -12 + bob, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-6, -10 + bob); ctx.lineTo(-10, -18 + bob); ctx.lineTo(-4, -12 + bob); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(6, -10 + bob); ctx.lineTo(10, -18 + bob); ctx.lineTo(4, -12 + bob); ctx.fill();

        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(-6, -18 + bob, 3, 0, Math.PI * 2);
        ctx.arc(6, -18 + bob, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b0bec5';
        const slashRot = isAttacking ? Math.sin(animTime * 25) * 0.9 : 0.3;
        ctx.save();
        ctx.translate(10, 0 + bob);
        ctx.rotate(slashRot);
        ctx.fillRect(0, -3, 26, 6);
        ctx.clearRect(6, -3, 3, 2);
        ctx.clearRect(14, -3, 3, 2);
        ctx.clearRect(20, -3, 3, 2);
        ctx.restore();

        ctx.restore();
    }

    drawNezuko(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        ctx.fillStyle = '#1a0c20';
        ctx.fillRect(-16, -2 + bob, 32, 28);
        this.drawNezukoKimono(ctx, -10, 0 + bob, 20, 24);

        ctx.fillStyle = '#c2185b';
        ctx.fillRect(-10, 8 + bob, 20, 6);

        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.lineTo(14, 4 + bob);
        ctx.lineTo(-14, 4 + bob);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ff5722';
        ctx.fillRect(-14, 0 + bob, 6, 8);
        ctx.fillRect(8, 0 + bob, 6, 8);

        ctx.fillStyle = '#e91e63';
        ctx.fillRect(5, -24 + bob, 6, 5);

        ctx.fillStyle = '#f06292';
        ctx.beginPath();
        ctx.arc(-4, -14 + bob, 2.5, 0, Math.PI * 2);
        ctx.arc(4, -14 + bob, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#66bb6a';
        ctx.fillRect(-7, -10 + bob, 14, 6);
        ctx.strokeStyle = '#c2185b';
        ctx.lineWidth = 1;
        ctx.strokeRect(-7, -10 + bob, 14, 6);

        if (isAttacking) {
            ctx.fillStyle = 'rgba(233, 30, 99, 0.45)';
            ctx.beginPath();
            ctx.arc(0, 0 + bob, 28, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    drawShinobu(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        this.drawShinobuHaori(ctx, -14, -4 + bob, 28, 24);

        ctx.fillStyle = '#311b92';
        ctx.fillRect(-6, 16 + bob, 4, 12);
        ctx.fillRect(2, 16 + bob, 4, 12);

        ctx.fillStyle = '#ffecb3';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1a237e';
        ctx.beginPath();
        ctx.arc(0, -17 + bob, 13, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ba68c8';
        ctx.beginPath();
        ctx.arc(10, -22 + bob, 6, 0, Math.PI * 2);
        ctx.arc(14, -18 + bob, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ab47bc';
        ctx.fillRect(-5, -14 + bob, 3, 3);
        ctx.fillRect(3, -14 + bob, 3, 3);

        ctx.save();
        ctx.translate(8, 2 + bob);
        ctx.fillStyle = '#cfd8dc';
        ctx.fillRect(0, -1, 30, 2);
        ctx.fillStyle = '#d500f9';
        ctx.beginPath();
        ctx.arc(30, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }

    drawRengoku(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        this.drawRengokuHaori(ctx, -15, -4 + bob, 30, 24);

        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffca28';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 15, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d50000';
        ctx.beginPath();
        ctx.moveTo(-10, -22 + bob);
        ctx.lineTo(-6, -34 + bob);
        ctx.lineTo(0, -22 + bob);
        ctx.lineTo(6, -34 + bob);
        ctx.lineTo(10, -22 + bob);
        ctx.fill();

        ctx.fillStyle = '#ff6f00';
        ctx.beginPath();
        ctx.arc(-5, -14 + bob, 3, 0, Math.PI * 2);
        ctx.arc(5, -14 + bob, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(-4, -14 + bob, 2, 2);
        ctx.fillRect(4, -14 + bob, 2, 2);

        ctx.save();
        ctx.translate(10, 2 + bob);
        ctx.fillStyle = '#d50000';
        ctx.fillRect(0, -2, 32, 4);
        ctx.fillStyle = '#ffab00';
        ctx.fillRect(2, -1, 28, 2);

        if (isAttacking) {
            ctx.fillStyle = 'rgba(255, 109, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(18, 0, 16, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        ctx.restore();
    }

    drawGiyu(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 1.5;

        this.drawGiyuHaori(ctx, -14, -4 + bob, 28, 24);

        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-12, -18 + bob);
        ctx.lineTo(-24, -10 + bob);
        ctx.lineTo(-14, -8 + bob);
        ctx.fill();

        ctx.fillStyle = '#0277bd';
        ctx.fillRect(-5, -14 + bob, 3, 3);
        ctx.fillRect(3, -14 + bob, 3, 3);

        ctx.save();
        ctx.translate(8, 2 + bob);
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(0, -2, 28, 4);
        ctx.fillStyle = '#81d4fa';
        ctx.fillRect(2, -1, 24, 2);
        ctx.restore();

        ctx.strokeStyle = 'rgba(0, 188, 212, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 8 + bob, 26, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    drawBoulder(ctx, x, y, animTime, hpPercent) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = '#546e7a';
        ctx.beginPath();
        ctx.ellipse(0, 4, 24, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#78909c';
        ctx.beginPath();
        ctx.ellipse(-6, -2, 16, 12, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#d7ccc8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 4, 22, -0.6, Math.PI + 0.6);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-10, 4); ctx.lineTo(-14, 14); ctx.lineTo(-8, 12); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(4, 6); ctx.lineTo(0, 16); ctx.lineTo(6, 14); ctx.fill();

        if (hpPercent < 0.6) {
            ctx.strokeStyle = '#263238';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-4, -12);
            ctx.lineTo(2, 2);
            ctx.lineTo(-2, 16);
            ctx.stroke();
        }

        ctx.restore();
    }

    drawTengenBomb(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const pulse = 1.0 + Math.sin(animTime * 15) * 0.12;
        ctx.scale(pulse, pulse);

        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.arc(0, 6, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(-8, 2, 3, 0, Math.PI * 2);
        ctx.arc(8, 2, 3, 0, Math.PI * 2);
        ctx.arc(0, 12, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#8d6e63';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.quadraticCurveTo(6, -18, 8, -24);
        ctx.stroke();

        ctx.fillStyle = '#ff3d00';
        ctx.beginPath();
        ctx.arc(8, -24, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffeb3b';
        ctx.beginPath();
        ctx.arc(8, -24, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // --- NEW HERO 1: MUICHIRO TOKITO (Mist Hashira) ---
    drawMuichiro(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 1.8;

        // Dark baggy uniform
        ctx.fillStyle = '#1a2332';
        ctx.fillRect(-15, -4 + bob, 30, 26);

        // Head
        ctx.fillStyle = '#ffecb3';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        // Long flowing black hair with turquoise tips
        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.lineTo(16, 12 + bob);
        ctx.lineTo(-16, 12 + bob);
        ctx.closePath();
        ctx.fill();

        // Turquoise ends
        ctx.fillStyle = '#4dd0e1';
        ctx.fillRect(-16, 6 + bob, 8, 12);
        ctx.fillRect(8, 6 + bob, 8, 12);

        // Calm Turquoise Eyes
        ctx.fillStyle = '#00bcd4';
        ctx.fillRect(-5, -14 + bob, 3, 3);
        ctx.fillRect(3, -14 + bob, 3, 3);

        // Mist Nichirin Sword
        ctx.save();
        ctx.translate(10, 2 + bob);
        ctx.fillStyle = '#80deea';
        ctx.fillRect(0, -2, 28, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(2, -1, 24, 2);

        if (isAttacking) {
            ctx.fillStyle = 'rgba(178, 235, 242, 0.5)';
            ctx.beginPath();
            ctx.arc(14, 0, 18, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        ctx.restore();
    }

    // --- NEW HERO 2: MITSURI KANROJI (Love Hashira) ---
    drawMitsuri(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        // White Haori & Uniform
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-14, -4 + bob, 28, 24);
        ctx.fillStyle = '#212121';
        ctx.fillRect(-8, 2 + bob, 16, 12);

        // Head
        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        // Pink & Green Braided Hair
        ctx.fillStyle = '#f06292'; // Pink top
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();

        // Three Braids with Lime Green tips
        ctx.fillStyle = '#aed581'; // Green braids
        ctx.fillRect(-15, -4 + bob, 6, 20);
        ctx.fillRect(9, -4 + bob, 6, 20);
        ctx.fillRect(-3, 8 + bob, 6, 12);

        // Green eyes & Mole
        ctx.fillStyle = '#43a047';
        ctx.fillRect(-5, -14 + bob, 3, 3);
        ctx.fillRect(3, -14 + bob, 3, 3);
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(4, -9 + bob, 1.5, 1.5); // mole under eye

        // Flexible Whip Nichirin Blade
        ctx.save();
        ctx.translate(8, 2 + bob);
        ctx.strokeStyle = '#e91e63';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const wave = isAttacking ? Math.sin(animTime * 20) * 12 : 4;
        ctx.bezierCurveTo(12, -wave, 20, wave, 32, -wave / 2);
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    // --- NEW HERO 3: SANEMI SHINAZUGAWA (Wind Hashira) ---
    drawSanemi(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 5) * 2;

        // White open haori with 'Kill' kanji vibe & dark uniform
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-15, -4 + bob, 30, 24);
        ctx.fillStyle = '#ffcc80'; // bare scarred chest
        ctx.fillRect(-6, 0 + bob, 12, 14);

        // Head
        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spiky White Hair
        ctx.fillStyle = '#f5f5f5';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-12, -26 + bob); ctx.lineTo(-4, -36 + bob); ctx.lineTo(4, -26 + bob); ctx.lineTo(12, -34 + bob);
        ctx.fill();

        // Scars across face
        ctx.strokeStyle = '#c62828';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-8, -16 + bob); ctx.lineTo(6, -10 + bob);
        ctx.moveTo(-2, -18 + bob); ctx.lineTo(2, -12 + bob);
        ctx.stroke();

        // Fierce wide eyes
        ctx.fillStyle = '#212121';
        ctx.fillRect(-6, -15 + bob, 3, 3);
        ctx.fillRect(3, -15 + bob, 3, 3);

        // Wind Blade with Cyclone
        ctx.save();
        ctx.translate(10, 2 + bob);
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(0, -2, 30, 4);
        ctx.fillStyle = '#a5d6a7';
        ctx.fillRect(2, -1, 26, 2);

        if (isAttacking) {
            ctx.strokeStyle = '#00e676';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(16, 0, 18, 0, Math.PI);
            ctx.stroke();
        }
        ctx.restore();

        ctx.restore();
    }

    // --- NEW HERO 4: GYOMEI HIMEJIMA (Stone Hashira) ---
    drawGyomei(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 1.5;

        // Massive Broad Body with Brown Haori
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(-18, -6 + bob, 36, 32);

        // Huge Red Prayer Beads
        ctx.fillStyle = '#d32f2f';
        for (let i = -14; i <= 14; i += 7) {
            ctx.beginPath();
            ctx.arc(i, 2 + bob, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Head
        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 15, 0, Math.PI * 2);
        ctx.fill();

        // Short Spiky Black Hair
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(0, -22 + bob, 15, Math.PI, Math.PI * 2);
        ctx.fill();

        // Forehead Scar & Blind White Eyes with Tear Tracks
        ctx.strokeStyle = '#b71c1c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-10, -24 + bob); ctx.lineTo(10, -24 + bob);
        ctx.stroke();

        ctx.fillStyle = '#ffffff'; // Blind eyes
        ctx.fillRect(-6, -18 + bob, 4, 3);
        ctx.fillRect(3, -18 + bob, 4, 3);

        // Spiked Iron Flail & Axe
        ctx.save();
        ctx.translate(12, 4 + bob);
        ctx.fillStyle = '#37474f';
        ctx.beginPath();
        ctx.arc(16, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        // Spikes
        ctx.fillStyle = '#cfd8dc';
        ctx.beginPath();
        ctx.moveTo(16, -14); ctx.lineTo(13, -8); ctx.lineTo(19, -8);
        ctx.moveTo(16, 14); ctx.lineTo(13, 8); ctx.lineTo(19, 8);
        ctx.moveTo(26, 0); ctx.lineTo(20, -3); ctx.lineTo(20, 3);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }

    // --- NEW HERO 5: KANAO TSUYURI (Flower Breathing) ---
    drawKanao(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        // Dark uniform & White Cape
        ctx.fillStyle = '#212121';
        ctx.fillRect(-12, -4 + bob, 24, 24);
        ctx.fillStyle = '#f5f5f5'; // Cape
        ctx.fillRect(-14, -2 + bob, 8, 20);

        // Head
        ctx.fillStyle = '#ffecb3';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        // Black Side Ponytail & Butterfly Clip
        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.arc(0, -17 + bob, 13, Math.PI, Math.PI * 2);
        ctx.fill();
        // Side Ponytail
        ctx.beginPath();
        ctx.moveTo(8, -18 + bob);
        ctx.lineTo(22, -10 + bob);
        ctx.lineTo(12, -4 + bob);
        ctx.fill();

        // Pink/Green Butterfly Pin
        ctx.fillStyle = '#f48fb1';
        ctx.beginPath();
        ctx.arc(10, -22 + bob, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pink/Purple gentle eyes
        ctx.fillStyle = '#ab47bc';
        ctx.fillRect(-5, -14 + bob, 3, 3);
        ctx.fillRect(3, -14 + bob, 3, 3);

        // Flower Blade
        ctx.save();
        ctx.translate(8, 2 + bob);
        ctx.fillStyle = '#f8bbd0';
        ctx.fillRect(0, -2, 28, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(2, -1, 24, 2);
        ctx.restore();

        ctx.restore();
    }

    // --- NEW HERO 6: GENYA SHINAZUGAWA (Nichirin Shotgun) ---
    drawGenya(ctx, x, y, animTime, isAttacking) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        // Sleeveless purple haori
        ctx.fillStyle = '#4a148c';
        ctx.fillRect(-14, -4 + bob, 28, 24);
        ctx.fillStyle = '#212121';
        ctx.fillRect(-8, -2 + bob, 16, 22);

        // Head
        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        // Black Mohawk Hair
        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.moveTo(-4, -26 + bob); ctx.lineTo(0, -32 + bob); ctx.lineTo(4, -26 + bob);
        ctx.lineTo(6, -16 + bob); ctx.lineTo(-6, -16 + bob);
        ctx.fill();

        // Face Scar
        ctx.strokeStyle = '#c62828';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-8, -12 + bob); ctx.lineTo(4, -16 + bob);
        ctx.stroke();

        // Dark Intense Eyes
        ctx.fillStyle = '#212121';
        ctx.fillRect(-5, -14 + bob, 3, 3);
        ctx.fillRect(3, -14 + bob, 3, 3);

        // Double-barreled Nichirin Shotgun
        ctx.save();
        ctx.translate(8, 2 + bob);
        ctx.fillStyle = '#37474f';
        ctx.fillRect(0, -4, 26, 6);
        ctx.fillStyle = '#5d4037'; // wooden stock
        ctx.fillRect(-6, -2, 8, 5);

        if (isAttacking) {
            // Muzzle Flash
            ctx.fillStyle = '#ffd54f';
            ctx.beginPath();
            ctx.arc(28, -1, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        ctx.restore();
    }

    // -------------------------------------------------------------
    // DEMON DRAWERS (12 DEMONS & BOSSES)
    // -------------------------------------------------------------
    drawLesserDemon(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 5) * 2;

        ctx.fillStyle = '#37474f';
        ctx.fillRect(-10, -2 + bob, 20, 22);
        ctx.fillStyle = '#78909c';
        ctx.beginPath();
        ctx.arc(0, -14 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#263238';
        ctx.beginPath();
        ctx.moveTo(-6, -24 + bob); ctx.lineTo(-8, -32 + bob); ctx.lineTo(-2, -24 + bob); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(6, -24 + bob); ctx.lineTo(8, -32 + bob); ctx.lineTo(2, -24 + bob); ctx.fill();

        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.arc(-4, -14 + bob, 2.5, 0, Math.PI * 2);
        ctx.arc(4, -14 + bob, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-3, -8 + bob, 2, 3);
        ctx.fillRect(1, -8 + bob, 2, 3);

        ctx.restore();
    }

    drawFastDemon(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const lean = -0.25;
        ctx.rotate(lean);
        const bob = Math.sin(animTime * 10) * 3;

        ctx.fillStyle = '#4a148c';
        ctx.fillRect(-8, -4 + bob, 16, 22);
        ctx.fillStyle = '#6a1b9a';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, 2 + bob, 14, 3);

        ctx.fillStyle = '#ffeb3b';
        ctx.beginPath();
        ctx.arc(-3, -16 + bob, 3, 0, Math.PI * 2);
        ctx.arc(4, -16 + bob, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawArmoredDemon(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 1.5;

        ctx.fillStyle = '#263238';
        ctx.fillRect(-16, -6 + bob, 32, 28);
        ctx.fillStyle = '#78909c';
        ctx.fillRect(-22, -10 + bob, 10, 14);
        ctx.fillRect(12, -10 + bob, 10, 14);
        ctx.fillStyle = '#eceff1';
        ctx.beginPath();
        ctx.moveTo(-18, -10 + bob); ctx.lineTo(-18, -18 + bob); ctx.lineTo(-14, -10 + bob); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(14, -10 + bob); ctx.lineTo(14, -18 + bob); ctx.lineTo(18, -10 + bob); ctx.fill();

        ctx.fillStyle = '#455a64';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff1744';
        ctx.fillRect(-7, -16 + bob, 5, 2);
        ctx.fillRect(2, -16 + bob, 5, 2);

        ctx.restore();
    }

    drawSusamaru(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        ctx.fillStyle = '#e65100';
        ctx.fillRect(-12, -4 + bob, 24, 24);
        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff9800';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 13, Math.PI, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff5722';
        const ballBob = Math.sin(animTime * 6) * 4;
        ctx.beginPath();
        ctx.arc(-18, -10 + ballBob, 8, 0, Math.PI * 2);
        ctx.arc(18, -10 - ballBob, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
    }

    drawYahaba(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        ctx.fillStyle = '#3e2723';
        ctx.fillRect(-12, -4 + bob, 24, 24);
        ctx.fillStyle = '#ffcc80';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#d32f2f';
        ctx.beginPath();
        ctx.moveTo(14, 0 + bob);
        ctx.lineTo(24, 0 + bob);
        ctx.lineTo(20, -5 + bob);
        ctx.moveTo(24, 0 + bob);
        ctx.lineTo(20, 5 + bob);
        ctx.strokeStyle = '#ff1744';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
    }

    drawRui(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-14, -4 + bob, 28, 26);
        ctx.strokeStyle = '#d32f2f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 8 + bob, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#f5f5f5';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(-4, -18 + bob, 2, 2);
        ctx.fillRect(2, -18 + bob, 2, 2);
        ctx.fillRect(-8, -14 + bob, 2, 2);
        ctx.fillRect(6, -14 + bob, 2, 2);

        ctx.strokeStyle = '#ff1744';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(10, 0 + bob);
        ctx.lineTo(34, -10 + bob);
        ctx.moveTo(10, 4 + bob);
        ctx.lineTo(34, 14 + bob);
        ctx.stroke();

        ctx.restore();
    }

    // --- NEW BOSS 1: ENMU (Lower Moon 1 - Mugen Train) ---
    drawEnmu(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 2;

        // Long black tailcoat
        ctx.fillStyle = '#212121';
        ctx.fillRect(-14, -4 + bob, 28, 28);
        ctx.fillStyle = '#b0bec5';
        ctx.fillRect(-4, -4 + bob, 8, 14);

        // Head
        ctx.fillStyle = '#eceff1';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        // Dark hair with reddish-blue tips
        ctx.fillStyle = '#263238';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 13, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#e91e63';
        ctx.fillRect(-13, -12 + bob, 5, 8);
        ctx.fillStyle = '#00bcd4';
        ctx.fillRect(8, -12 + bob, 5, 8);

        // Dream mouth in left hand
        ctx.fillStyle = '#ff80ab';
        ctx.beginPath();
        ctx.arc(-16, 4 + bob, 6, 0, Math.PI * 2);
        ctx.fill();

        // Dream Sleep Aura
        ctx.strokeStyle = 'rgba(156, 39, 176, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0 + bob, 28, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    drawAkaza(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        ctx.fillStyle = '#fce4ec';
        ctx.fillRect(-15, -4 + bob, 30, 26);
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(-15, 2 + bob, 30, 3);
        ctx.fillRect(-15, 10 + bob, 30, 3);
        ctx.fillRect(-1, -4 + bob, 2, 26);

        ctx.fillStyle = '#fce4ec';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ad1457';
        ctx.beginPath();
        ctx.arc(0, -20 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-12, -26 + bob); ctx.lineTo(-4, -34 + bob); ctx.lineTo(4, -26 + bob); ctx.lineTo(12, -34 + bob);
        ctx.fill();

        ctx.fillStyle = '#ffd600';
        ctx.beginPath();
        ctx.arc(-4, -16 + bob, 3, 0, Math.PI * 2);
        ctx.arc(4, -16 + bob, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0 + bob, 30, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    // --- NEW BOSS 2: DAKI & GYUTARO (Upper Moon 6) ---
    drawDaki(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 4) * 2;

        // Oiran outfit & Floral Obi Sashes
        ctx.fillStyle = '#ad1457';
        ctx.fillRect(-12, -4 + bob, 24, 26);

        // Floral Obi Sashes floating around
        ctx.strokeStyle = '#f06292';
        ctx.lineWidth = 4;
        ctx.beginPath();
        const s1 = Math.sin(animTime * 6) * 10;
        ctx.moveTo(-10, 4 + bob);
        ctx.quadraticCurveTo(-26, -14, -34, 12 + s1);
        ctx.moveTo(10, 4 + bob);
        ctx.quadraticCurveTo(26, -14, 34, 12 - s1);
        ctx.stroke();

        // Head & Silver-green hair
        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.arc(0, -16 + bob, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b2dfdb';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();

        // Kanji flower mark on face
        ctx.fillStyle = '#c2185b';
        ctx.beginPath();
        ctx.arc(0, -12 + bob, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // --- NEW BOSS 3: KOKUSHIBO (Upper Moon 1 - Moon Breathing) ---
    drawKokushibo(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 1.5;

        // Purple Haori with Black Patterns
        ctx.fillStyle = '#4a148c';
        ctx.fillRect(-16, -6 + bob, 32, 28);
        ctx.fillStyle = '#111111';
        ctx.fillRect(-6, 0 + bob, 12, 22);

        // Head
        ctx.fillStyle = '#fce4ec';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        // High Ponytail Black Hair with Spikes
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(0, -22 + bob, 14, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-12, -22 + bob); ctx.lineTo(-26, -12 + bob); ctx.lineTo(-14, -10 + bob);
        ctx.fill();

        // SIX GLOWING EYES (Signature Upper Moon 1)
        ctx.fillStyle = '#ff1744';
        // Top 2 eyes
        ctx.fillRect(-6, -20 + bob, 3, 2); ctx.fillRect(3, -20 + bob, 3, 2);
        // Middle 2 eyes (with gold iris)
        ctx.fillRect(-7, -17 + bob, 4, 2.5); ctx.fillRect(3, -17 + bob, 4, 2.5);
        // Bottom 2 eyes
        ctx.fillRect(-5, -14 + bob, 3, 2); ctx.fillRect(2, -14 + bob, 3, 2);

        // Fleshy Crescent Moon Blade with Eyes
        ctx.save();
        ctx.translate(12, 2 + bob);
        ctx.fillStyle = '#ad1457';
        ctx.fillRect(0, -3, 34, 6);
        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(8, -1, 3, 2); ctx.fillRect(18, -1, 3, 2); ctx.fillRect(26, -1, 3, 2);
        ctx.restore();

        // Crescent moon aura
        ctx.strokeStyle = 'rgba(255, 235, 59, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0 + bob, 30, -0.6, 2.2);
        ctx.stroke();

        ctx.restore();
    }

    drawMuzan(ctx, x, y, animTime) {
        ctx.save();
        ctx.translate(x, y);
        const bob = Math.sin(animTime * 3) * 2;

        ctx.fillStyle = '#111111';
        ctx.fillRect(-16, -6 + bob, 32, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-3, -6 + bob, 6, 12);
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(-2, -2 + bob, 4, 10);

        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(-18, -26 + bob, 36, 4);
        ctx.fillRect(-12, -34 + bob, 24, 9);
        ctx.fillStyle = '#212121';
        ctx.fillRect(-12, -27 + bob, 24, 2);

        ctx.fillStyle = '#d50000';
        ctx.fillRect(-5, -18 + bob, 3, 4);
        ctx.fillRect(2, -18 + bob, 3, 4);

        ctx.strokeStyle = '#212121';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        const tentacleWiggle = Math.sin(animTime * 8) * 8;

        ctx.beginPath();
        ctx.moveTo(-10, 0 + bob);
        ctx.quadraticCurveTo(-26, -14, -36, 10 + tentacleWiggle);
        ctx.moveTo(10, 0 + bob);
        ctx.quadraticCurveTo(26, -14, 36, 10 - tentacleWiggle);
        ctx.stroke();

        ctx.fillStyle = '#b71c1c';
        ctx.beginPath();
        ctx.arc(-36, 10 + tentacleWiggle, 4, 0, Math.PI * 2);
        ctx.arc(36, 10 - tentacleWiggle, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawToriiGate(ctx, x, y, hasBlade) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = '#d50000';
        ctx.fillRect(-14, -20, 5, 40);
        ctx.fillRect(9, -20, 5, 40);

        ctx.fillStyle = '#111111';
        ctx.fillRect(-18, -24, 36, 5);
        ctx.fillStyle = '#d50000';
        ctx.fillRect(-16, -18, 32, 4);

        ctx.fillStyle = '#ffd700';
        ctx.fillRect(-4, -18, 8, 8);

        if (hasBlade) {
            ctx.fillStyle = '#00e5ff';
            ctx.fillRect(-2, -10, 4, 26);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-1, -10, 2, 26);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.strokeRect(-4, -12, 8, 30);
        }

        ctx.restore();
    }

    createCardThumbnail(type) {
        if (this.cardThumbCache[type]) {
            return this.cardThumbCache[type];
        }

        const thumb = document.createElement('canvas');
        thumb.width = 44;
        thumb.height = 44;
        const ctx = thumb.getContext('2d');

        ctx.save();
        ctx.fillStyle = 'rgba(30, 15, 45, 0.9)';
        ctx.beginPath();
        ctx.arc(22, 22, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(22, 22);
        ctx.scale(0.65, 0.65);

        switch (type) {
            case 'kakushi': this.drawKakushi(ctx, 0, 0, 0); break;
            case 'tanjiro': this.drawTanjiro(ctx, 0, 0, 0, false); break;
            case 'zenitsu': this.drawZenitsu(ctx, 0, 0, 0, false); break;
            case 'inosuke': this.drawInosuke(ctx, 0, 0, 0, false); break;
            case 'nezuko': this.drawNezuko(ctx, 0, 0, 0, false); break;
            case 'shinobu': this.drawShinobu(ctx, 0, 0, 0, false); break;
            case 'rengoku': this.drawRengoku(ctx, 0, 0, 0, false); break;
            case 'giyu': this.drawGiyu(ctx, 0, 0, 0, false); break;
            case 'boulder': this.drawBoulder(ctx, 0, 0, 0, 1.0); break;
            case 'bomb': this.drawTengenBomb(ctx, 0, 0, 0); break;
            case 'muichiro': this.drawMuichiro(ctx, 0, 0, 0, false); break;
            case 'mitsuri': this.drawMitsuri(ctx, 0, 0, 0, false); break;
            case 'sanemi': this.drawSanemi(ctx, 0, 0, 0, false); break;
            case 'gyomei': this.drawGyomei(ctx, 0, 0, 0, false); break;
            case 'kanao': this.drawKanao(ctx, 0, 0, 0, false); break;
            case 'genya': this.drawGenya(ctx, 0, 0, 0, false); break;
        }

        ctx.restore();
        this.cardThumbCache[type] = thumb;
        return thumb;
    }

    createDemonThumbnail(type) {
        if (this.demonThumbCache[type]) {
            return this.demonThumbCache[type];
        }

        const thumb = document.createElement('canvas');
        thumb.width = 36;
        thumb.height = 36;
        const ctx = thumb.getContext('2d');

        ctx.save();
        ctx.fillStyle = 'rgba(20, 5, 30, 0.9)';
        ctx.beginPath();
        ctx.arc(18, 18, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(18, 20);
        ctx.scale(0.55, 0.55);

        switch (type) {
            case 'lesser': this.drawLesserDemon(ctx, 0, 0, 0); break;
            case 'fast': this.drawFastDemon(ctx, 0, 0, 0); break;
            case 'armored': this.drawArmoredDemon(ctx, 0, 0, 0); break;
            case 'susamaru': this.drawSusamaru(ctx, 0, 0, 0); break;
            case 'yahaba': this.drawYahaba(ctx, 0, 0, 0); break;
            case 'rui': this.drawRui(ctx, 0, 0, 0); break;
            case 'enmu': this.drawEnmu(ctx, 0, 0, 0); break;
            case 'akaza': this.drawAkaza(ctx, 0, 0, 0); break;
            case 'daki': this.drawDaki(ctx, 0, 0, 0); break;
            case 'kokushibo': this.drawKokushibo(ctx, 0, 0, 0); break;
            case 'muzan': this.drawMuzan(ctx, 0, 0, 0); break;
        }

        ctx.restore();
        this.demonThumbCache[type] = thumb;
        return thumb;
    }

    drawAlmanacPreview(canvas, type, isDemon = false, animTime = 0) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2 + 10);
        ctx.scale(1.25, 1.25);

        if (!isDemon) {
            switch (type) {
                case 'kakushi': this.drawKakushi(ctx, 0, 0, animTime); break;
                case 'tanjiro': this.drawTanjiro(ctx, 0, 0, animTime, true); break;
                case 'zenitsu': this.drawZenitsu(ctx, 0, 0, animTime, true); break;
                case 'inosuke': this.drawInosuke(ctx, 0, 0, animTime, true); break;
                case 'nezuko': this.drawNezuko(ctx, 0, 0, animTime, true); break;
                case 'shinobu': this.drawShinobu(ctx, 0, 0, animTime, true); break;
                case 'rengoku': this.drawRengoku(ctx, 0, 0, animTime, true); break;
                case 'giyu': this.drawGiyu(ctx, 0, 0, animTime, true); break;
                case 'boulder': this.drawBoulder(ctx, 0, 0, animTime, 1.0); break;
                case 'bomb': this.drawTengenBomb(ctx, 0, 0, animTime); break;
                case 'muichiro': this.drawMuichiro(ctx, 0, 0, animTime, true); break;
                case 'mitsuri': this.drawMitsuri(ctx, 0, 0, animTime, true); break;
                case 'sanemi': this.drawSanemi(ctx, 0, 0, animTime, true); break;
                case 'gyomei': this.drawGyomei(ctx, 0, 0, animTime, true); break;
                case 'kanao': this.drawKanao(ctx, 0, 0, animTime, true); break;
                case 'genya': this.drawGenya(ctx, 0, 0, animTime, true); break;
            }
        } else {
            switch (type) {
                case 'lesser': this.drawLesserDemon(ctx, 0, 0, animTime); break;
                case 'fast': this.drawFastDemon(ctx, 0, 0, animTime); break;
                case 'armored': this.drawArmoredDemon(ctx, 0, 0, animTime); break;
                case 'susamaru': this.drawSusamaru(ctx, 0, 0, animTime); break;
                case 'yahaba': this.drawYahaba(ctx, 0, 0, animTime); break;
                case 'rui': this.drawRui(ctx, 0, 0, animTime); break;
                case 'enmu': this.drawEnmu(ctx, 0, 0, animTime); break;
                case 'akaza': this.drawAkaza(ctx, 0, 0, animTime); break;
                case 'daki': this.drawDaki(ctx, 0, 0, animTime); break;
                case 'kokushibo': this.drawKokushibo(ctx, 0, 0, animTime); break;
                case 'muzan': this.drawMuzan(ctx, 0, 0, animTime); break;
            }
        }
        ctx.restore();
    }
}

// Global Sprite Renderer
const sprites = new SpriteRenderer();
