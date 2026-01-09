import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Zap, Shield, Clock } from "lucide-react";

import { useGame } from "@/context/GameContext";

const PlayerStats = () => {
    const { scrollYProgress } = useScroll();
    const { gameActive, score, health, level: gameLevel } = useGame();
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);

    // Smooth scroll progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Simulated XP Gain
    useEffect(() => {
        const interval = setInterval(() => {
            setXp(prev => prev + 10);
        }, 5000); // 10 XP every 5s

        return () => clearInterval(interval);
    }, []);

    // Level up based on scroll
    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            const newLevel = Math.floor(latest * 10) + 1;
            if (newLevel !== level) {
                setLevel(newLevel);
            }
        });
    }, [scrollYProgress, level]);

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed bottom-6 left-6 z-50 hidden md:flex flex-col gap-2 font-mono text-xs pointer-events-none select-none"
        >
            {/* Character Card */}
            <div className="bg-black/60 border border-white/10 backdrop-blur-md p-3 rounded-lg w-48 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-2">
                    <div className="p-1 bg-cyan-500/20 rounded">
                        <User size={16} className="text-cyan-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white uppercase">{gameActive ? "DEFENSE PILOT" : "Pruthvi.dev"}</h4>
                        <span className="text-cyan-500">LVL {gameActive ? gameLevel : level} // {gameActive ? "COMBAT" : "ENGINEER"}</span>
                    </div>
                </div>

                {/* HP Bar */}
                <div className="flex items-center gap-2 mb-1">
                    <Shield size={12} className="text-red-400" />
                    <div className="flex-1 h-2 bg-red-900/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-500 transition-all duration-300"
                            style={{ width: `${gameActive ? health : 100}%` }}
                        />
                    </div>
                    <span className="text-red-400">{gameActive ? health : 100}%</span>
                </div>

                {/* XP / Score Bar */}
                <div className="flex items-center gap-2 mb-1">
                    <Zap size={12} className="text-yellow-400" />
                    <div className="flex-1 h-2 bg-yellow-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 transition-all duration-300" style={{ width: gameActive ? "100%" : "65%" }} />
                    </div>
                    <span className="text-yellow-400">{gameActive ? score : xp}{gameActive ? "PTS" : "XP"}</span>
                </div>

                {/* Scroll Prog (Stamina?) */}
                <div className="flex items-center gap-2">
                    <Clock size={12} className="text-blue-400" />
                    <div className="flex-1 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-blue-500 origin-left" style={{ scaleX: gameActive ? 1 : scaleX }} />
                    </div>
                    <span className="text-blue-400">{gameActive ? "ACTIVE" : "PROG"}</span>
                </div>
            </div>

            <div className="text-[10px] text-gray-500 pl-1">
                SYSTEM_ID: PORTFOLIO_V2.0
            </div>
        </motion.div>
    );
};

export default PlayerStats;
