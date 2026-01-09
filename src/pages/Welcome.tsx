import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Zap, AlertTriangle, Terminal, Type } from "lucide-react";

const Welcome = () => {
    const navigate = useNavigate();

    const options = [
        {
            id: "immersive",
            path: "/immersive",
            title: "IMMERSIVE",
            desc: "3D Experiences, WebGL, Particles.",
            icon: Box,
            color: "cyan",
            accent: "bg-cyan-500"
        },
        {
            id: "minimal",
            path: "/minimal",
            title: "MINIMAL",
            desc: "Clean, Fast, Accessible.",
            icon: Zap,
            color: "emerald",
            accent: "bg-emerald-500"
        },
        {
            id: "brutal",
            path: "/brutal",
            title: "NEO-BRUTAL",
            desc: "Bold, Raw, High Contract.",
            icon: AlertTriangle,
            color: "yellow",
            accent: "bg-yellow-400"
        },
        {
            id: "terminal",
            path: "/terminal",
            title: "TERMINAL",
            desc: "CLI, Hacker Mode, Shell.",
            icon: Terminal,
            color: "green",
            accent: "bg-green-500"
        },
        {
            id: "editorial",
            path: "/editorial",
            title: "EDITORIAL",
            desc: "Typography, Parallax, Fashion.",
            icon: Type,
            color: "purple",
            accent: "bg-purple-500"
        },
        {
            id: "resume",
            path: "/resume",
            title: "RESUME",
            desc: "Professional History & Skills.",
            icon: Zap,
            color: "white",
            accent: "bg-white"
        }
    ];

    return (
        <div className="relative min-h-screen w-full bg-black overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center font-sans tracking-tight p-8">
            {/* Cinematic Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-black z-0 pointer-events-none" />

            {/* Subtle Grid - Prometheus Tech feel */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay pointer-events-none" />
            <div className="fixed inset-0 bg-grid-white/[0.03] bg-[size:50px_50px] z-0 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-7xl w-full my-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <p className="text-cyan-500 font-bold tracking-[0.3em] text-xs md:text-sm mb-4 uppercase">
                        System Initialized
                    </p>
                    <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-8 leading-none tracking-tighter">
                        PORTFOLIO
                        <span className="block text-xl md:text-3xl text-neutral-500 font-normal tracking-normal mt-2">
                            SELECT INTERFACE MODE
                        </span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
                    {options.map((opt, i) => (
                        <motion.button
                            key={opt.id}
                            onClick={() => navigate(opt.path)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative h-48 bg-zinc-900/50 border border-white/10 hover:border-${opt.color}-500/50 rounded-xl p-8 text-left transition-all duration-300 overflow-hidden`}
                        >
                            <div className={`absolute inset-0 ${opt.color === 'yellow' ? 'bg-yellow-400/10' : `bg-${opt.color}-500/5`} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <opt.icon className={`w-8 h-8 text-${opt.color}-500`} />
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{opt.title}</h3>
                                    <p className="text-neutral-400 text-sm">{opt.desc}</p>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Footer / Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed bottom-4 text-neutral-600 text-xs tracking-widest uppercase"
            >
                v3.0.0 // Ready [Online]
            </motion.div>

            {/* Easter Egg Hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2, duration: 1 }}
                className="fixed bottom-1 text-neutral-500 text-[10px] tracking-widest uppercase hover:text-white transition-colors cursor-help select-none z-50"
            >
                Start looking. The secrets are everywhere.
            </motion.p>
        </div>
    );
};

export default Welcome;
