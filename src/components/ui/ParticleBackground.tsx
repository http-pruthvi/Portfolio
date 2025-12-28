import { useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";

const ArcadeInvasion = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { gameActive, setScore, setHealth, setLevel } = useGame();

    // Use Refs for mutable game state to avoid re-renders interacting with the canvas loop
    const gameStateRef = useRef({
        gameActive: false, // Local sync
        score: 0,
        level: 1,
        keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, Space: false } as Record<string, boolean>,
        lastShot: 0,
        nextLevelScore: 1000,
        ship: { x: 0, y: 0, width: 32, height: 32, speed: 7 },
        bullets: [] as any[],
        aliens: [] as any[],
        particles: [] as any[],
        powerups: [] as any[],
        activeEffects: {
            rapidFire: 0,
            shield: 0,
            spread: 0
        }
    });

    // Sync context state to ref
    useEffect(() => {
        gameStateRef.current.gameActive = gameActive;
    }, [gameActive]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // --- Audio System (Local Low-Latency) ---
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContext();

        const playSound = (type: "shoot" | "explode" | "levelUp") => {
            if (audioCtx.state === "suspended") audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === "shoot") {
                osc.type = "square";
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === "explode") {
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (type === "levelUp") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            }
        };

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Screen Shake State
        let shakeIntensity = 0;

        // Initialize Ship
        gameStateRef.current.ship.x = width / 2;
        gameStateRef.current.ship.y = height - 100;

        // --- Sprites & Assets ---
        // 1 = draw, 0 = empty
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

        const shipSprite = [
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        const colors = ["#00f3ff", "#bc13fe", "#0F0", "#FF0055"];

        // --- Helpers ---
        const spawnAlien = () => {
            const scale = 3;
            // Only spawn 'attack' aliens if game is active, else passive rain
            const isActive = gameStateRef.current.gameActive;
            const x = Math.random() * (width - 11 * scale);

            gameStateRef.current.aliens.push({
                x,
                y: -50,
                type: Math.random() > 0.5 ? 0 : 1,
                // Faster/more structured in game mode
                speed: isActive ? Math.random() * 2 + 1 : Math.random() * 1.5 + 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                scale: scale,
                hp: 1
            });
        };

        const spawnPowerUp = (x: number, y: number) => {
            const rand = Math.random();
            let type = "health"; // default
            let color = "#0f0";

            if (rand < 0.25) { type = "rapid"; color = "#ff0"; }
            else if (rand < 0.5) { type = "shield"; color = "#0ff"; }
            else if (rand < 0.75) { type = "spread"; color = "#a0f"; }

            gameStateRef.current.powerups.push({
                x, y, type, color,
                vy: 2,
                size: 15,
                pulse: 0
            });
        };

        const createExplosion = (x: number, y: number, color: string, count: number = 15) => {
            if (gameStateRef.current.gameActive) {
                shakeIntensity = 5; // Trigger screenshake
                playSound("explode");
            }

            for (let i = 0; i < count; i++) {
                gameStateRef.current.particles.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 12, // Faster explosion
                    vy: (Math.random() - 0.5) * 12,
                    life: 1.0,
                    color: color
                });
            }
        };

        const drawPixelMap = (map: number[][], x: number, y: number, scale: number, color: string) => {
            ctx.fillStyle = color;
            for (let row = 0; row < map.length; row++) {
                for (let col = 0; col < map[row].length; col++) {
                    if (map[row][col] === 1) {
                        ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
                    }
                }
            }
        };

        // --- Game Loop ---
        const update = () => {
            const state = gameStateRef.current;

            // Screen Shake Application
            let shakeX = 0;
            let shakeY = 0;
            if (shakeIntensity > 0) {
                shakeX = (Math.random() - 0.5) * shakeIntensity;
                shakeY = (Math.random() - 0.5) * shakeIntensity;
                shakeIntensity *= 0.9; // Decay
                if (shakeIntensity < 0.5) shakeIntensity = 0;
            }

            ctx.setTransform(1, 0, 0, 1, shakeX, shakeY); // Apply shake
            ctx.clearRect(-shakeX, -shakeY, width, height); // Clear with shake offset

            // 1. Ship Logic
            if (state.gameActive) {
                // Movement
                if (state.keys["ArrowLeft"] && state.ship.x > 0) state.ship.x -= state.ship.speed;
                if (state.keys["ArrowRight"] && state.ship.x < width - state.ship.width) state.ship.x += state.ship.speed;
                if (state.keys["ArrowUp"] && state.ship.y > 0) state.ship.y -= state.ship.speed;
                if (state.keys["ArrowDown"] && state.ship.y < height - state.ship.height) state.ship.y += state.ship.speed;

                // Check Active Effects
                const now = Date.now();
                const isRapid = state.activeEffects.rapidFire > now;
                const isSpread = state.activeEffects.spread > now;
                const isShield = state.activeEffects.shield > now;

                // Fire Rate Calculation
                let fireRate = Math.max(100, 150 - (state.level * 10));
                if (isRapid) fireRate = 50; // Super fast

                if (now - state.lastShot > fireRate) {
                    const spawnBullet = (offsetX: number, angle: number = 0) => {
                        state.bullets.push({
                            x: state.ship.x + 14 + offsetX,
                            y: state.ship.y,
                            vx: Math.sin(angle) * 2,
                            speed: 12,
                            color: isRapid ? "#fff" : "#ff0"
                        });
                    };

                    spawnBullet(0);
                    if (isSpread) {
                        spawnBullet(-10, -0.2);
                        spawnBullet(10, 0.2);
                    }

                    state.lastShot = now;
                    playSound("shoot"); // SFX

                    // Muzzle flash particle
                    if (Math.random() > 0.5) {
                        state.particles.push({
                            x: state.ship.x + 14,
                            y: state.ship.y,
                            vx: 0,
                            vy: 2,
                            life: 0.5,
                            color: "#fff"
                        });
                    }
                }

                // Draw Ship & Shield
                drawPixelMap(shipSprite, state.ship.x, state.ship.y, 4, "#00f3ff");
                if (isShield) {
                    ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(now / 100) * 0.3})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(state.ship.x + 18, state.ship.y + 18, 30, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Level Up Logic
                if (state.score >= state.nextLevelScore) {
                    state.level++;
                    state.nextLevelScore += 1000 + (state.level * 500); // Scale difficulty
                    setLevel(state.level); // Sync context
                    // Heal slightly on level up
                    setHealth((h: number) => Math.min(100, h + 20));
                    createExplosion(width / 2, height / 2, "#FFF", 50); // Massive visual flare
                    playSound("levelUp");
                }
            }

            // 2. Bullets
            for (let i = state.bullets.length - 1; i >= 0; i--) {
                const b = state.bullets[i];
                b.y -= b.speed;
                if (b.vx) b.x += b.vx; // Spread logic
                ctx.fillStyle = b.color;
                ctx.fillRect(b.x, b.y, 4, 12); // Longer bullets

                if (b.y < -10) state.bullets.splice(i, 1);
            }

            // 3. Aliens
            // Spawn rate increases with level
            const spawnRate = state.gameActive ? 0.97 - (state.level * 0.005) : 0.985;
            if (Math.random() > spawnRate) spawnAlien();

            for (let i = state.aliens.length - 1; i >= 0; i--) {
                const a = state.aliens[i];
                a.y += a.speed + (state.gameActive ? state.level * 0.5 : 0); // Speed scales with level

                // Draw
                drawPixelMap(a.type === 0 ? alien1 : alien2, a.x, a.y, a.scale, a.color);

                // Collision Detection (Only if game active)
                if (state.gameActive) {
                    const aW = 11 * a.scale;
                    const aH = 8 * a.scale;
                    const aRect = { l: a.x, r: a.x + aW, t: a.y, b: a.y + aH };

                    // Bullet vs Alien
                    for (let j = state.bullets.length - 1; j >= 0; j--) {
                        const b = state.bullets[j];
                        if (b.x > aRect.l && b.x < aRect.r && b.y > aRect.t && b.y < aRect.b) {
                            createExplosion(a.x + aW / 2, a.y + aH / 2, a.color);
                            state.aliens.splice(i, 1);
                            state.bullets.splice(j, 1);

                            // Update Score (Ref + Context)
                            state.score += 100;
                            setScore(s => s + 100);

                            // Drop Powerup (30% chance)
                            if (Math.random() < 0.3) {
                                spawnPowerUp(a.x, a.y);
                            }
                            break;
                        }
                    }

                    // Ship vs Alien (Crash)
                    const sRect = { l: state.ship.x, r: state.ship.x + 36, t: state.ship.y, b: state.ship.y + 36 };
                    if (sRect.l < aRect.r && sRect.r > aRect.l && sRect.t < aRect.b && sRect.b > aRect.t) {
                        createExplosion(state.ship.x + 18, state.ship.y + 18, "#f00", 30);

                        // Shield Check
                        const isShield = state.activeEffects.shield > Date.now();

                        if (!isShield) {
                            setHealth((h: number) => Math.max(0, h - 20));
                            shakeIntensity = 15; // Big shake on hit
                            playSound("explode");
                        } else {
                            playSound("shoot"); // Shield deflect sound
                        }
                        state.aliens.splice(i, 1);
                    }
                }

                if (a.y > height) {
                    state.aliens.splice(i, 1);
                }
            }

            // 4. Particles (Physics)
            for (let i = state.particles.length - 1; i >= 0; i--) {
                const p = state.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // Gravity
                p.life -= 0.02;

                ctx.globalAlpha = p.life < 0 ? 0 : p.life;
                ctx.fillStyle = p.color;
                const size = Math.max(1, p.life * 6); // Shrinking particles
                ctx.fillRect(p.x, p.y, size, size);
                ctx.globalAlpha = 1.0;

                if (p.life <= 0) state.particles.splice(i, 1);
            }

            // 5. Powerups
            for (let i = state.powerups.length - 1; i >= 0; i--) {
                const p = state.powerups[i];
                p.y += p.vy;
                p.pulse += 0.1;

                // Draw
                ctx.save();
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x + 7, p.y + 7, p.size / 2 + Math.sin(p.pulse) * 2, 0, Math.PI * 2);
                ctx.fill();

                // Icon label (optional, simple text)
                ctx.fillStyle = "#000";
                ctx.font = "10px Arial";
                ctx.textAlign = "center";
                ctx.fillText(p.type[0].toUpperCase(), p.x + 7, p.y + 11);
                ctx.restore();

                // Collection
                if (state.gameActive) {
                    const sRect = { l: state.ship.x, r: state.ship.x + 36, t: state.ship.y, b: state.ship.y + 36 };
                    if (p.x < sRect.r && p.x + 15 > sRect.l && p.y < sRect.b && p.y + 15 > sRect.t) {
                        // Apply Effect
                        const now = Date.now();
                        if (p.type === "health") {
                            setHealth((h: number) => Math.min(100, h + 20));
                        } else if (p.type === "rapid") {
                            state.activeEffects.rapidFire = now + 5000;
                        } else if (p.type === "shield") {
                            state.activeEffects.shield = now + 5000;
                        } else if (p.type === "spread") {
                            state.activeEffects.spread = now + 5000;
                        }

                        playSound("levelUp"); // Reuse nice sound
                        state.powerups.splice(i, 1);
                    }
                }

                if (p.y > height) state.powerups.splice(i, 1);
            }

            requestAnimationFrame(update);
        };

        // --- Event Listeners ---
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStateRef.current.gameActive) {
                if (e.code === "ArrowLeft") gameStateRef.current.keys["ArrowLeft"] = true;
                if (e.code === "ArrowRight") gameStateRef.current.keys["ArrowRight"] = true;
                if (e.code === "ArrowUp") gameStateRef.current.keys["ArrowUp"] = true;
                if (e.code === "ArrowDown") gameStateRef.current.keys["ArrowDown"] = true;
                if (e.code === "Space") gameStateRef.current.keys["Space"] = true;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "ArrowLeft") gameStateRef.current.keys["ArrowLeft"] = false;
            if (e.code === "ArrowRight") gameStateRef.current.keys["ArrowRight"] = false;
            if (e.code === "ArrowUp") gameStateRef.current.keys["ArrowUp"] = false;
            if (e.code === "ArrowDown") gameStateRef.current.keys["ArrowDown"] = false;
            if (e.code === "Space") gameStateRef.current.keys["Space"] = false;
        };

        // Click to shoot support (Legacy mouse support)
        const handleClick = (e: MouseEvent) => {
            if (!gameStateRef.current.gameActive) {
                // Original click-to-destroy behavior
                const rect = canvas.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                for (let i = gameStateRef.current.aliens.length - 1; i >= 0; i--) {
                    const a = gameStateRef.current.aliens[i];
                    const w = 11 * a.scale;
                    const h = 8 * a.scale;
                    if (clickX >= a.x && clickX <= a.x + w && clickY >= a.y && clickY <= a.y + h) {
                        createExplosion(a.x + w / 2, a.y + h / 2, a.color);
                        gameStateRef.current.aliens.splice(i, 1);
                        break;
                    }
                }
            } else {
                // Mouse shoot
                gameStateRef.current.keys["Space"] = true;
                setTimeout(() => gameStateRef.current.keys["Space"] = false, 100);
            }
        };

        // Mouse Move for ship (optional alternative to keys)
        const handleMouseMove = (e: MouseEvent) => {
            if (gameStateRef.current.gameActive) {
                gameStateRef.current.ship.x = e.clientX - 16;
                // Optional: Y movement with mouse (clamped)
                // gameStateRef.current.ship.y = e.clientY - 16; 
            }
        }

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            gameStateRef.current.ship.y = height - 100;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (gameStateRef.current.gameActive) {
                e.preventDefault(); // Prevent scrolling while playing
                const touch = e.touches[0];
                gameStateRef.current.ship.x = touch.clientX - 16;
                // Optional Y movement
                if (touch.clientY < height - 50) gameStateRef.current.ship.y = touch.clientY - 50;
            }
        };

        const handleTouchStart = () => {
            if (gameStateRef.current.gameActive) {
                // Shoot on tap
                gameStateRef.current.keys["Space"] = true;
                setTimeout(() => gameStateRef.current.keys["Space"] = false, 100);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousedown", handleClick);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("mousemove", handleMouseMove);

        // Touch Support
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchstart", handleTouchStart);

        const loop = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("mousemove", handleMouseMove);

            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchstart", handleTouchStart);

            cancelAnimationFrame(loop);
        };
    }, []); // Only run once on mount

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 w-full h-full z-[-1] transition-opacity duration-500 ${gameActive ? 'opacity-100 cursor-none' : 'opacity-40 cursor-crosshair'}`}
        />
    );
};

export default ArcadeInvasion;
