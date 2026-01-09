import { useState, useEffect } from "react";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export const useKonamiCode = () => {
    const [, setKeyHistory] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeyHistory((prev) => {
                const newHistory = [...prev, e.key].slice(-KONAMI_CODE.length);

                if (JSON.stringify(newHistory) === JSON.stringify(KONAMI_CODE)) {
                    setSuccess(true);
                }

                return newHistory;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return success;
};
