import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Box, Zap, AlertTriangle, Terminal, Type, Plus, X } from "lucide-react";

const styles = [
    { id: "immersive", path: "/immersive", icon: Box, color: "text-cyan-400", label: "Immersive" },
    { id: "minimal", path: "/minimal", icon: Zap, color: "text-emerald-400", label: "Minimal" },
    { id: "brutal", path: "/brutal", icon: AlertTriangle, color: "text-yellow-400", label: "Brutal" },
    { id: "terminal", path: "/terminal", icon: Terminal, color: "text-green-400", label: "Terminal" },
    { id: "editorial", path: "/editorial", icon: Type, color: "text-purple-400", label: "Editorial" },
];

const StyleSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Hide on Welcome page
    if (location.pathname === "/") return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="flex flex-col gap-2 mb-2"
                    >
                        {styles.map((style) => {
                            const isActive = location.pathname === style.path;
                            return (
                                <Link
                                    key={style.id}
                                    to={style.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`relative flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 group
                                        ${isActive
                                            ? "bg-white/10 border-white/40 shadow-lg"
                                            : "bg-black/50 border-white/10 hover:bg-black/80 hover:border-white/30"
                                        }`}
                                >
                                    <span className={`text-xs font-medium tracking-wide ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                                        {style.label}
                                    </span>
                                    <style.icon size={16} className={`${isActive ? style.color : "text-neutral-500 group-hover:" + style.color}`} />

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute -right-1 w-1 h-1 rounded-full bg-white"
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Return to Home option */}
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 group"
                        >
                            <span className="text-xs font-medium text-neutral-400 group-hover:text-red-400">Exit</span>
                            <LayoutGrid size={16} className="text-neutral-500 group-hover:text-red-400" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full shadow-2xl backdrop-blur-sm border transition-all duration-300
                    ${isOpen
                        ? "bg-white text-black rotate-45 border-white"
                        : "bg-black/80 text-white border-white/20 hover:border-white/50"
                    }`}
            >
                {isOpen ? <X size={20} /> : <Plus size={20} />}
            </motion.button>
        </div>
    );
};

export default StyleSwitcher;
