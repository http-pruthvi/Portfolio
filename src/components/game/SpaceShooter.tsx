import { useRef, useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- PIXEL ART ASSETS ---
// 11x8
const alien1 = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
];
// 8x8
const alien2 = [
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 0, 0, 1, 0, 1]
];
// 9x9
const shipSprite = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// 16x11 Boss (Mothership)
const bossSprite = [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0]
];

// Powerups (7x7)
const heartSprite = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];
const boltSprite = [
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0]
];
const shieldSprite = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0]
];
const spreadSprite = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];

const colors = ["#00f3ff", "#bc13fe", "#0F0", "#FF0055"];

// --- TYPES ---
interface Bullet { x: number; y: number; vx?: number; speed: number; color: string; isEnemy?: boolean; size?: number; }
interface Alien { x: number; y: number; type: number; speed: number; color: string; scale: number; hp: number; maxHp: number; isBoss?: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; }
interface PowerUp { x: number; y: number; type: 'health' | 'rapid' | 'shield' | 'spread'; color: string; vy: number; size: number; pulse: number; }

const CAST_SCALE = 4; // Scale for ship
const ALIEN_SCALE = 3;

const SpaceShooter = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { setGameActive, setScore, setHealth, health, score } = useGame();
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0);

    // --- Mutable Game State (Refs) ---
    const stateRef = useRef({
        keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, Space: false } as Record<string, boolean>,
        ship: { x: 0, y: 0, vx: 0, vy: 0, width: 9 * CAST_SCALE, height: 6 * CAST_SCALE, speed: 7 }, // Adjusted height for sprite
        bullets: [] as Bullet[],
        aliens: [] as Alien[],
        particles: [] as Particle[],
        powerups: [] as PowerUp[],
        lastShot: 0,
        lastSpawn: 0,
        activeEffects: { rapidFire: 0, shield: 0, spread: 0 },
        score: 0,
        health: 100,
        level: 1,
        bossActive: false,
        mouseX: 0,
        mouseY: 0,
        isMouseDown: false
    });

    useEffect(() => {
        stateRef.current.score = score;
        stateRef.current.health = health;
    }, []);

    // Main Game Loop Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateDims = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (stateRef.current.ship.y > canvas.height) stateRef.current.ship.y = canvas.height - 100;
        };
        updateDims();
        window.addEventListener('resize', updateDims);

        // Inputs
        const handleKeyDown = (e: KeyboardEvent) => { if (stateRef.current.keys.hasOwnProperty(e.code)) stateRef.current.keys[e.code] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { if (stateRef.current.keys.hasOwnProperty(e.code)) stateRef.current.keys[e.code] = false; };
        const handleMouseMove = (e: MouseEvent) => { stateRef.current.mouseX = e.clientX; stateRef.current.mouseY = e.clientY; };
        const handleMouseDown = () => { stateRef.current.isMouseDown = true; };
        const handleMouseUp = () => { stateRef.current.isMouseDown = false; };

        // Bind Events
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        stateRef.current.ship.x = canvas.width / 2;
        stateRef.current.ship.y = canvas.height - 100;

        // --- HELPERS ---
        const drawPixelMap = (map: number[][], x: number, y: number, scale: number, color: string) => {
            ctx.fillStyle = color;
            for (let row = 0; row < map.length; row++) {
                for (let col = 0; col < map[row].length; col++) {
                    if (map[row][col] === 1) ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
                }
            }
        };

        const createExplosion = (x: number, y: number, color: string, count: number = 15, size: number = 3) => {
            for (let i = 0; i < count; i++) {
                stateRef.current.particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12,
                    life: 1.0,
                    color,
                    size: Math.random() * size + 1
                });
            }
        };

        // --- GAME LOOP ---
        let animationFrameId: number;

        const loop = () => {
            const state = stateRef.current;
            if (state.health <= 0) return;

            // Background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.5)'; // Darker trail
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- 1. SHIP LOGIC ---
            // Input Handling
            const isKeyDown = Object.values(state.keys).some(k => k);

            if (isKeyDown) {
                // Keyboard Mode
                const ACCEL = 1.5;
                if (state.keys['ArrowLeft'] || state.keys['KeyA']) state.ship.vx -= ACCEL;
                if (state.keys['ArrowRight'] || state.keys['KeyD']) state.ship.vx += ACCEL;
                if (state.keys['ArrowUp'] || state.keys['KeyW']) state.ship.vy -= ACCEL;
                if (state.keys['ArrowDown'] || state.keys['KeyS']) state.ship.vy += ACCEL;
            } else {
                // Mouse Mode (only if keys are not active)
                // Use a deadzone so it doesn't drift if mouse is center
                const dx = state.mouseX - (state.ship.x + state.ship.width / 2);
                // const dy = (state.mouseY || state.ship.y) - (state.ship.y + state.ship.height / 2); // Optional vertical mouse

                // Only applying Horizontal mouse follow for now to keep it classic/hybrid, 
                // or we can add vertical mouse support too if desired. 
                // Staying consistent with previous behavior: "Hybrid" usually means X-axis follow.

                if (Math.abs(dx) > 10) state.ship.vx += dx * 0.008;
            }

            const FRICTION = 0.90;
            const MAX_SPEED = 14;

            // Physics
            state.ship.vx *= FRICTION;
            state.ship.vy *= FRICTION;

            // Clamp Speed
            state.ship.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, state.ship.vx));
            state.ship.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, state.ship.vy));

            // Apply
            state.ship.x += state.ship.vx;
            state.ship.y += state.ship.vy;

            // Clamp Position
            if (state.ship.x < 0) { state.ship.x = 0; state.ship.vx = 0; }
            if (state.ship.x > canvas.width - state.ship.width) { state.ship.x = canvas.width - state.ship.width; state.ship.vx = 0; }
            if (state.ship.y < 0) { state.ship.y = 0; state.ship.vy = 0; }
            if (state.ship.y > canvas.height - state.ship.height) { state.ship.y = canvas.height - state.ship.height; state.ship.vy = 0; }

            // Shooting
            const now = Date.now();
            const isRapid = state.activeEffects.rapidFire > now;
            const isSpread = state.activeEffects.spread > now;
            const fireRate = isRapid ? 80 : 180;

            if (now - state.lastShot > fireRate) {
                const spawnBullet = (offsetX: number, angle: number = 0) => {
                    state.bullets.push({
                        x: state.ship.x + (state.ship.width / 2) - 2 + offsetX,
                        y: state.ship.y,
                        vx: Math.sin(angle) * 3,
                        speed: 16,
                        color: isRapid ? "#fff" : "#ff0",
                        size: 4
                    });
                };
                spawnBullet(0);
                if (isSpread) { spawnBullet(-15, -0.15); spawnBullet(15, 0.15); }
                state.lastShot = now;
            }

            // Draw Ship
            drawPixelMap(shipSprite, state.ship.x, state.ship.y, CAST_SCALE, "#00f3ff");

            // Shield Effect
            if (state.activeEffects.shield > now) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(now / 100) * 0.5})`;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(state.ship.x + state.ship.width / 2, state.ship.y + state.ship.height / 2, state.ship.width * 0.8, 0, Math.PI * 2);
                ctx.stroke();
            }

            // --- 2. BULLETS ---
            for (let i = state.bullets.length - 1; i >= 0; i--) {
                const b = state.bullets[i];
                b.y -= b.speed * (b.isEnemy ? -0.4 : 1);
                if (b.vx) b.x += b.vx;

                ctx.fillStyle = b.color;
                ctx.shadowBlur = 5; ctx.shadowColor = b.color;
                ctx.fillRect(b.x, b.y, b.size || 4, b.isEnemy ? (b.size || 4) * 2 : 12); // Enemy bullets longer
                ctx.shadowBlur = 0;

                if (b.y < -50 || b.y > canvas.height + 50) state.bullets.splice(i, 1);
            }

            // --- 3. ALIENS ---
            // Spawn Rate (Faster!)
            const spawnDelay = state.bossActive ? 1500 : Math.max(200, 800 - state.level * 60);
            if (now - state.lastSpawn > spawnDelay) {
                if (Math.random() < (state.bossActive ? 0.4 : 0.9)) {
                    state.aliens.push({
                        x: Math.random() * (canvas.width - 40),
                        y: -50,
                        type: Math.random() > 0.5 ? 0 : 1,
                        speed: Math.random() * 2 + 1 + (state.level * 0.1),
                        color: colors[Math.floor(Math.random() * colors.length)],
                        scale: ALIEN_SCALE,
                        hp: 1 + Math.floor(state.level / 4),
                        maxHp: 1 + Math.floor(state.level / 4)
                    });
                }
                state.lastSpawn = now;
            }

            // Boss Check
            if (state.score > 2000 && state.score % 3000 < 300 && !state.bossActive) {
                state.bossActive = true;
                state.aliens.push({
                    x: canvas.width / 2 - 100, y: -150,
                    type: 2, speed: 1,
                    color: '#ff0000',
                    scale: 8,
                    hp: 100 + state.level * 20, maxHp: 100 + state.level * 20,
                    isBoss: true
                });
            }

            let bossExists = false;

            for (let i = state.aliens.length - 1; i >= 0; i--) {
                const a = state.aliens[i];
                if (a.isBoss) bossExists = true;

                // Move
                if (a.isBoss) {
                    if (a.y < 80) a.y += 1; // Enter
                    a.x += Math.sin(now / 800) * 3; // Hover
                    // Boss Fire
                    if (Math.random() < 0.05) {
                        state.bullets.push({
                            x: a.x + (8 * a.scale), y: a.y + (8 * a.scale),
                            speed: 8, color: '#f00', isEnemy: true, vx: (Math.random() - 0.5) * 6, size: 6
                        });
                    }
                } else {
                    a.y += a.speed;
                }

                // Draw
                const sprite = a.isBoss ? bossSprite : (a.type === 0 ? alien1 : alien2);
                drawPixelMap(sprite, a.x, a.y, a.scale, a.color);

                // Collisions (Bullet -> Alien)
                const aW = (a.isBoss ? 16 : (a.type === 0 ? 11 : 8)) * a.scale;
                const aH = (a.isBoss ? 11 : 8) * a.scale;

                for (let j = state.bullets.length - 1; j >= 0; j--) {
                    const b = state.bullets[j];
                    if (b.isEnemy) continue;

                    if (b.x > a.x && b.x < a.x + aW && b.y > a.y && b.y < a.y + aH) {
                        createExplosion(b.x, b.y, b.color, 3, 2);
                        a.hp--;
                        state.bullets.splice(j, 1);

                        if (a.hp <= 0) {
                            createExplosion(a.x + aW / 2, a.y + aH / 2, a.color, a.isBoss ? 50 : 15, a.isBoss ? 5 : 3);
                            const pts = a.isBoss ? 2000 : 100;
                            state.score += pts;
                            setScore(s => s + pts);

                            // Drops
                            if (a.isBoss) {
                                state.bossActive = false;
                                stateRef.current.powerups.push({ x: a.x + aW / 2, y: a.y + aH / 2, type: 'spread', color: '#a0f', vy: 2, size: 25, pulse: 0 });
                            } else if (Math.random() < 0.4) {
                                const types: PowerUp['type'][] = ['health', 'rapid', 'shield', 'spread'];
                                const type = types[Math.floor(Math.random() * types.length)];
                                const col = type === 'health' ? '#0f0' : type === 'rapid' ? '#ff0' : type === 'shield' ? '#0ff' : '#a0f';
                                stateRef.current.powerups.push({ x: a.x, y: a.y, type, color: col, vy: 2, size: 20, pulse: 0 });
                            }
                            state.aliens.splice(i, 1);
                        }
                        break;
                    }
                }

                // Collision (Alien -> Player)
                if (state.ship.x < a.x + aW && state.ship.x + state.ship.width > a.x &&
                    state.ship.y < a.y + aH && state.ship.y + state.ship.height > a.y) {

                    if (state.activeEffects.shield > now) {
                        createExplosion(a.x, a.y, '#0ff', 10, 3);
                        if (!a.isBoss) state.aliens.splice(i, 1);
                    } else {
                        state.health -= 20;
                        setHealth(h => Math.max(0, h - 20));
                        createExplosion(state.ship.x, state.ship.y, '#f00', 20, 4);
                        if (!a.isBoss) state.aliens.splice(i, 1);
                    }
                }

                // Check Player Bullet collision with Player (for simplified logic, removed. Enemy Bullets -> Player exists?)
                // Add Enemy Bullet -> Player Collision
                for (let k = state.bullets.length - 1; k >= 0; k--) {
                    const eb = state.bullets[k];
                    if (!eb.isEnemy) continue;
                    if (eb.x > state.ship.x && eb.x < state.ship.x + state.ship.width &&
                        eb.y > state.ship.y && eb.y < state.ship.y + state.ship.height) {
                        if (state.activeEffects.shield > now) {
                            state.bullets.splice(k, 1); // Absorb
                        } else {
                            state.health -= 15;
                            setHealth(h => Math.max(0, h - 15));
                            createExplosion(state.ship.x, state.ship.y, '#f00', 10, 3);
                            state.bullets.splice(k, 1);
                        }
                    }
                }

                if (a.y > canvas.height + 50) state.aliens.splice(i, 1);
            }
            if (!bossExists) state.bossActive = false; // Failsafe

            // --- 4. POWERUPS ---
            for (let i = state.powerups.length - 1; i >= 0; i--) {
                const p = state.powerups[i];
                p.y += p.vy;
                p.pulse += 0.1;

                // Draw Sprite
                const scale = 2 + Math.sin(p.pulse) * 0.2;
                let sprite = heartSprite;
                if (p.type === 'rapid') sprite = boltSprite;
                if (p.type === 'shield') sprite = shieldSprite;
                if (p.type === 'spread') sprite = spreadSprite;

                // Draw centered
                const px = p.x - (3.5 * scale); // 7 width/2
                drawPixelMap(sprite, px, p.y, scale, p.color);

                // Collect
                if (p.x < state.ship.x + state.ship.width + 10 && p.x + 10 > state.ship.x &&
                    p.y < state.ship.y + state.ship.height + 10 && p.y + 10 > state.ship.y) {

                    if (p.type === 'health') { state.health = Math.min(100, state.health + 30); setHealth(h => Math.min(100, h + 30)); }
                    else if (p.type === 'rapid') state.activeEffects.rapidFire = now + 5000;
                    else if (p.type === 'shield') state.activeEffects.shield = now + 8000;
                    else if (p.type === 'spread') state.activeEffects.spread = now + 6000;

                    createExplosion(p.x, p.y, p.color, 15);
                    state.powerups.splice(i, 1);
                }
                if (p.y > canvas.height) state.powerups.splice(i, 1);
            }

            // --- 5. PARTICLES ---
            for (let i = state.particles.length - 1; i >= 0; i--) {
                const p = state.particles[i];
                p.x += p.vx; p.y += p.vy; p.life -= 0.05;
                if (p.life <= 0) { state.particles.splice(i, 1); continue; }
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                ctx.globalAlpha = 1;
            }

            // --- 6. HUD ---
            // Player Health Bar (Left)
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(20, 20, 204, 20); // BG
            ctx.fillStyle = `hsl(${Math.max(0, state.health)}, 100%, 50%)`; // Red to Green hue
            ctx.fillRect(22, 22, state.health * 2, 16);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(20, 20, 204, 20);
            ctx.fillStyle = '#fff'; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'left';
            ctx.fillText(`HP: ${Math.round(state.health)}%`, 235, 36);

            // Score (Right)
            ctx.textAlign = 'right';
            ctx.fillText(`SCORE: ${state.score.toString().padStart(6, '0')}`, canvas.width - 20, 36);

            // Boss HUD
            if (state.bossActive && state.aliens.find(a => a.isBoss)) {
                const boss = state.aliens.find(a => a.isBoss)!;
                const pct = boss.hp / boss.maxHp;
                const bw = 400; const bh = 24;
                const bx = (canvas.width - bw) / 2;

                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(bx, 60, bw, bh);

                ctx.fillStyle = '#dc2626'; // Boss Red
                ctx.fillRect(bx + 2, 62, (bw - 4) * pct, bh - 4);

                ctx.strokeStyle = '#fff'; ctx.strokeRect(bx, 60, bw, bh);
                ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
                ctx.fillText(`⚠ MOTHERSHIP DETECTED ⚠`, canvas.width / 2, 50);
            }

            animationFrameId = requestAnimationFrame(loop);
        };
        animationFrameId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('resize', updateDims);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };

    }, []);

    // Game Over Trigger
    useEffect(() => {
        if (health <= 0 && !gameOver) {
            setGameOver(true);
            const saved = localStorage.getItem('immersive_highscore');
            const hScore = saved ? parseInt(saved) : 0;
            if (score > hScore) {
                setHighScore(score);
                localStorage.setItem('immersive_highscore', score.toString());
            } else {
                setHighScore(hScore);
            }
        }
    }, [health, score, gameOver]);

    return (
        <div className="fixed inset-0 z-40 bg-slate-950/80 cursor-crosshair overflow-hidden backdrop-blur-sm">
            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* Effect Status Icons */}
            <div className="absolute top-16 left-6 flex flex-col gap-2 pointer-events-none">
                {stateRef.current.activeEffects.rapidFire > Date.now() && <div className="text-yellow-400 font-bold text-shadow shine">⚡ RAPID</div>}
                {stateRef.current.activeEffects.spread > Date.now() && <div className="text-purple-400 font-bold text-shadow shine">🚀 SPREAD</div>}
                {stateRef.current.activeEffects.shield > Date.now() && <div className="text-cyan-400 font-bold text-shadow shine">🛡 SHIELD</div>}
            </div>

            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
                    >
                        <div className="text-center p-8 border border-cyan-500/30 rounded-2xl bg-slate-900/90 max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                            <h2 className="text-5xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2 tracking-tighter">GAME OVER</h2>
                            <div className="text-3xl text-white font-mono mb-2">{score}</div>
                            <div className="text-xs text-slate-400 mb-6">HIGH SCORE: {highScore}</div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        setHealth(100); setScore(0);
                                        stateRef.current.health = 100; stateRef.current.score = 0;
                                        stateRef.current.bullets = []; stateRef.current.aliens = []; stateRef.current.powerups = [];
                                        stateRef.current.bossActive = false;
                                        stateRef.current.ship.x = window.innerWidth / 2;
                                        setGameOver(false);
                                    }}
                                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold tracking-wider transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                >
                                    RETRY
                                </button>
                                <button
                                    onClick={() => setGameActive(false)}
                                    className="px-8 py-3 border border-slate-600 hover:bg-slate-800 text-slate-300 rounded-lg font-bold transition-all hover:text-white"
                                >
                                    EXIT
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button onClick={() => setGameActive(false)} className="absolute top-6 right-6 text-white/50 hover:text-white z-50">EXIT</button>
        </div>
    );
};

export default SpaceShooter;
