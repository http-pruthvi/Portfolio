import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    const [input, setInput] = useState<string[]>([]);
    const [godMode, setGodMode] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newInput = [...input, e.key];

            if (newInput.length > KONAMI_CODE.length) {
                newInput.shift();
            }

            setInput(newInput);

            if (newInput.join("") === KONAMI_CODE.join("")) {
                setGodMode(true);
                toast.success("GOD MODE ACTIVATED!", {
                    icon: "🎮",
                    style: {
                        background: "#333",
                        color: "#0F0",
                        fontFamily: "monospace"
                    }
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input]);

    return godMode;
};
