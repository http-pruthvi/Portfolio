import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Gamepad2, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import AIChat from "./AIChat";
import { useGame } from "@/context/GameContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { gameActive, setGameActive, setScore, setHealth } = useGame();

    const toggleGame = () => {
        if (!gameActive) {
            setScore(0);
            setHealth(100);
            setGameActive(true);
        } else {
            setGameActive(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Resume", href: "/resume" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled || gameActive
                    ? "bg-background/80 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="http.pruthvi logo"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            http.pruthvi
                        </span>
                    </div>

                    {!gameActive && (
                        <>
                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-8">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Social Icons & Tools (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!gameActive && (
                            <>
                                <a href="https://github.com/http-pruthvi" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                <a href="mailto:phusepruthvi@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                                    <Mail size={20} />
                                </a>
                                <a href="https://instagram.com/http_pruthvi" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <AIChat />
                            </>
                        )}

                        {/* Game Toggle */}
                        <button
                            onClick={toggleGame}
                            className={cn(
                                "text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10",
                                gameActive && "text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20"
                            )}
                            title={gameActive ? "Exit Defense Mode" : "Start Defense Mode"}
                        >
                            {gameActive ? (
                                <X size={20} />
                            ) : (
                                <Gamepad2 size={20} />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="px-3 py-2">
                                <AIChat />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
