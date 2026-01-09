/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface GameContextType {
    gameActive: boolean;
    setGameActive: (active: boolean) => void;
    score: number;
    setScore: (score: number | ((prev: number) => number)) => void;
    health: number;
    setHealth: (health: number | ((prev: number) => number)) => void;
    level: number;
    setLevel: (level: number | ((prev: number) => number)) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(100);
    const [level, setLevel] = useState(1);

    return (
        <GameContext.Provider value={{ gameActive, setGameActive, score, setScore, health, setHealth, level, setLevel }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
