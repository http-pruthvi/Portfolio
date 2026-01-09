import { useEffect } from "react";

export const useSoundEffects = () => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const audioCtx = new AudioContext();

        const playSound = (freq: number, type: OscillatorType, duration: number, volume: number = 0.1) => {
            if (audioCtx.state === "suspended") {
                audioCtx.resume();
            }
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-pointer")
            ) {
                // Short, low-pitch blip for hover
                playSound(800, "sine", 0.05, 0.02);
            }
        };

        const handleClick = () => {
            // Higher pitch, slightly longer blip for click
            playSound(1200, "triangle", 0.1, 0.05);
        };

        window.addEventListener("mouseover", handleHover);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mouseover", handleHover);
            window.removeEventListener("click", handleClick);
            audioCtx.close();
        };
    }, []);
};


