import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Zap, AlertTriangle, Terminal, Type, Award } from "lucide-react";

const ChooseYourBios = () => {
    const navigate = useNavigate();

    const fighters = [
        {
            id: "immersive",
            path: "/immersive",
            name: "RTX ON",
            class: "Visualist",
            stats: { power: 90, speed: 40, tech: 95 },
            desc: "High-fidelity graphics, particle systems, 3D environments.",
            icon: Box,
            color: "cyan"
        },
        {
            id: "minimal",
            path: "/minimal",
            name: "BSOD",
            class: "Glitch",
            stats: { power: 100, speed: 90, tech: 20 },
            desc: "Raw, unadulterated system errors. Enter at your own risk.",
            icon: Zap,
            color: "blue"
        },
        {
            id: "brutal",
            path: "/brutal",
            name: "CSS CRIMES",
            class: "Anarchist",
            stats: { power: 85, speed: 95, tech: 60 },
            desc: "Breaking all the rules of web design. Brutalism re-imagined.",
            icon: AlertTriangle,
            color: "pink"
        },
        {
            id: "terminal",
            path: "/terminal",
            name: "SUDO RM -RF",
            class: "Hacker",
            stats: { power: 60, speed: 100, tech: 100 },
            desc: "Command line interface for the keyboard warriors.",
            icon: Terminal,
            color: "green"
        },
        {
            id: "editorial",
            path: "/editorial",
            name: "REDACTED",
            class: "Journalist",
            stats: { power: 70, speed: 60, tech: 80 },
            desc: "Typography-driven storytelling with classified information.",
            icon: Type,
            color: "white"
        },
        {
            id: "resume",
            path: "/resume",
            name: "THE LEGACY",
            class: "Professional",
            stats: { power: 50, speed: 50, tech: 50 },
            desc: "The standard documentation of skills and experience.",
            icon: Award,
            color: "yellow"
        }
    ];

    return (
        <div className="relative min-h-screen w-full bg-black overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center font-mono tracking-tight p-4 md:p-8 selection:bg-cyan-500/30">
            {/* Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-7xl w-full my-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-cyan-500 font-bold tracking-[0.5em] text-sm md:text-base mb-2 uppercase animate-pulse">
                        Insert Coin to Start
                    </h2>
                    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        CHOOSE YOUR<br />
                        <span className="text-stroke-2 text-transparent stroke-white">BIOS</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {fighters.map((fighter, i) => (
                        <motion.button
                            key={fighter.id}
                            onClick={() => navigate(fighter.path)}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative h-64 border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 text-left flex flex-col justify-between overflow-hidden hover:border-cyan-500/50 transition-colors"
                        >
                            <div className={`absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity`}>
                                <fighter.icon size={64} className={`text-${fighter.color === 'white' ? 'white' : fighter.color + '-500'}`} />
                            </div>

                            <div>
                                <div className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">{fighter.class} CLASS</div>
                                <h3 className={`text-2xl font-black uppercase text-white mb-2 group-hover:text-${fighter.color === 'white' ? 'cyan' : fighter.color}-400 transition-colors`}>{fighter.name}</h3>
                                <div className="h-1 w-12 bg-zinc-700 mb-4 group-hover:w-full group-hover:bg-cyan-500 transition-all duration-500" />
                                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{fighter.desc}</p>
                            </div>

                            {/* Stats */}
                            <div className="space-y-1 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-2 text-[10px] uppercase text-zinc-500">
                                    <span className="w-8">PWR</span>
                                    <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-white" style={{ width: `${fighter.stats.power}%` }} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase text-zinc-500">
                                    <span className="w-8">SPD</span>
                                    <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-white" style={{ width: `${fighter.stats.speed}%` }} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase text-zinc-500">
                                    <span className="w-8">TCH</span>
                                    <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-white" style={{ width: `${fighter.stats.tech}%` }} />
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-4 text-zinc-600 text-[10px] uppercase tracking-[0.2em] animate-pulse">
                v4.0 // Ready Player One
            </div>
        </div>
    );
};

export default ChooseYourBios;
