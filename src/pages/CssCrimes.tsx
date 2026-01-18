import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { socials } from "@/data/socials";
import { ArrowUpRight, Star, Disc, Box, Flame, Award } from "lucide-react";

const Marquee = ({ text, direction = "left" }: { text: string; direction?: "left" | "right" }) => (
    <div className="bg-yellow-400 text-black py-4 border-y-4 border-black overflow-hidden whitespace-nowrap font-black uppercase text-2xl md:text-4xl tracking-tighter">
        <motion.div
            className="flex gap-8"
            animate={{ x: direction === "left" ? "-100%" : "100%" }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {[...Array(10)].map((_, i) => (
                <span key={i}>{text} // </span>
            ))}
        </motion.div>
    </div>
);

const BrutalCard = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => (
    <div className={`bg-white text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 p-6 ${className}`}>
        {title && <h3 className="font-black text-2xl uppercase mb-4 bg-black text-white inline-block px-2">{title}</h3>}
        {children}
    </div>
);

const CssCrimes = () => {
    const [chaos, setChaos] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [cracks, setCracks] = useState<{ x: number, y: number, r: number }[]>([]);
    const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const triggerChaos = () => {
        setChaos(true);
        setTimeout(() => setChaos(false), 5000);
    };

    const handleGlobalClick = (e: React.MouseEvent) => {
        setClickCount(prev => prev + 1);

        // Add a crack at click position
        setCracks(prev => [...prev, { x: e.clientX, y: e.clientY, r: Math.random() * 360 }]);

        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = setTimeout(() => {
            setClickCount(0);
            setCracks([]); // Heal cracks over time
        }, 2000);

        if (clickCount > 5) {
            // Rage Mode
        }
    };

    // Crack Component
    const Crack = ({ x, y, r }: { x: number, y: number, r: number }) => (
        <div
            className="fixed pointer-events-none z-[100]"
            style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${r}deg)` }}
        >
            <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-sm">
                <path d="M50 50 L60 20 L55 5 L65 0 M50 50 L80 60 L95 55 L100 60 M50 50 L40 80 L45 95 L35 100 M50 50 L20 40 L5 45 L0 40"
                    stroke="black" strokeWidth="2" fill="none" />
            </svg>
        </div>
    );


    return (
        <div className={`min-h-screen bg-[#ff90e8] font-sans selection:bg-yellow-400 ${chaos ? 'animate-pulse' : ''}`} onClick={handleGlobalClick}>
            {cracks.map((c, i) => <Crack key={i} {...c} />)}
            <motion.div
                animate={chaos ? {
                    x: [0, -10, 10, -10, 10, 0],
                    y: [0, 10, -10, 10, -10, 0],
                    rotate: [0, -5, 5, -5, 5, 0],
                    filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "hue-rotate(0deg)"]
                } : {}}
                transition={{ duration: 0.5, repeat: chaos ? Infinity : 0 }}
            >
                {/* Header */}
                <nav className="flex justify-between items-center p-4 md:p-8 bg-white border-b-4 border-black sticky top-0 z-50">
                    <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter hover:italic cursor-pointer">Pruthvi.Dev</h1>

                    <div className="hidden md:flex gap-4">
                        {["Work", "Skills", "Experience", "Contact"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2 bg-black text-white font-bold uppercase hover:bg-yellow-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#888]">
                                {item}
                            </a>
                        ))}
                        <a href="/resume" className="px-6 py-2 bg-black text-white font-bold uppercase hover:bg-yellow-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#888]">
                            Resume
                        </a>
                        <a href="/" className="px-6 py-2 bg-red-500 text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            Exit
                        </a>
                    </div>

                    {/* Mobile Nav Trigger */}
                    <div className="md:hidden">
                        <a href="#contact" className="px-4 py-2 bg-black text-white font-bold uppercase text-sm">
                            Menu ↓
                        </a>
                    </div>
                </nav>

                <Marquee text="FULL STACK DEVELOPER • UI/UX DESIGNER • CREATIVE CODER" />

                <main className="p-4 md:p-12 max-w-7xl mx-auto space-y-20">

                    {/* Hero */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <BrutalCard className="bg-cyan-300 rotate-1">
                            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] mb-6">
                                I BUILD<br />
                                <span className="text-white text-stroke-3">THINGS</span><br />
                                FOR THE<br />
                                <span className="text-yellow-400 underline decoration-4 underline-offset-8">WEB</span>.
                            </h2>
                            <p className="text-xl font-bold border-l-4 border-black pl-4 mb-8">
                                Creating chaos and order in equal measure. Specialized in React, Node, and making pixels dance.
                            </p>
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <a href="#contact" className="flex-1 text-center py-4 bg-black text-white font-black text-xl uppercase hover:bg-white hover:text-black border-4 border-black transition-colors">
                                    Hire Me Now
                                </a>
                                <button onClick={triggerChaos} className="flex-1 py-4 bg-red-600 text-white font-black text-xl uppercase hover:bg-red-700 border-4 border-black transition-colors animate-bounce">
                                    DO NOT PRESS
                                </button>
                            </div>
                        </BrutalCard>

                        <div className="relative">
                            <BrutalCard className="bg-zinc-100 rotate-[-2deg] z-10 relative">
                                <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="Coding" className="w-full border-4 border-black grayscale contrast-125" />
                            </BrutalCard>
                            <div className="absolute inset-0 bg-yellow-400 border-4 border-black translate-x-4 translate-y-4 -z-0" />
                        </div>
                    </section>

                    {/* Skills */}
                    <section id="skills">
                        <BrutalCard className="bg-white" title="Technical Arsenal">
                            <div className="grid md:grid-cols-3 gap-8">
                                {skills.map((skillGroup, i) => (
                                    <div key={i} className="border-2 border-black p-4 bg-gray-100">
                                        <h4 className="font-black uppercase mb-4 text-xl flex items-center gap-2">
                                            <Flame className="text-red-500" /> {skillGroup.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-black text-white font-bold text-sm hover:bg-yellow-400 hover:text-black transition-colors cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BrutalCard>
                    </section>

                    {/* Projects */}
                    <section id="work">
                        <div className="flex items-center gap-4 mb-12">
                            <Star size={40} className="fill-black" />
                            <h2 className="text-5xl font-black uppercase">Selected Works</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project, i) => (
                                <BrutalCard key={i} className={`gap-4 flex flex-col ${i % 2 === 0 ? 'bg-orange-300' : 'bg-green-300'} ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                                    <div className="border-4 border-black overflow-hidden relative group">
                                        <img src={project.image} className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                        <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 font-bold uppercase text-xs">
                                            {project.tags[0]}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black uppercase">{project.title}</h3>
                                    <p className="font-bold">{project.description}</p>
                                    <div className="flex gap-4 mt-auto">
                                        <a href={project.github} className="flex-1 text-center py-2 border-2 border-black font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                                            <Box size={18} /> Code
                                        </a>
                                        <a href={project.demo} className="flex-1 text-center py-2 border-2 border-black bg-white font-bold uppercase hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_black]">
                                            <Disc size={18} /> Live
                                        </a>
                                    </div>
                                </BrutalCard>
                            ))}
                        </div>
                    </section>

                    {/* Experience & Certs */}
                    <section id="experience" className="grid md:grid-cols-2 gap-8">
                        <BrutalCard className="bg-white" title="Experience Log">
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={i} className="flex flex-col md:flex-row gap-4 border-b-4 border-black pb-8 last:border-0 last:pb-0">
                                        <div className="md:w-1/4">
                                            <span className="inline-block bg-black text-white px-3 py-1 font-bold text-sm transform -rotate-2">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <div className="md:w-3/4">
                                            <h4 className="text-2xl font-black uppercase">{exp.role}</h4>
                                            <div className="text-xl font-bold text-gray-600 mb-2">@{exp.company}</div>
                                            <p className="font-medium">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BrutalCard>

                        <BrutalCard className="bg-pink-300" title="Certifications">
                            <div className="space-y-4">
                                {certifications.slice(0, 5).map((cert, i) => (
                                    <a key={i} href={cert.url} className="block border-4 border-black bg-white p-4 font-bold hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                                        <div className="flex items-center gap-2 text-sm uppercase mb-1">
                                            <Award size={16} /> {cert.issuer}
                                        </div>
                                        <div className="text-lg">{cert.name}</div>
                                    </a>
                                ))}
                            </div>
                        </BrutalCard>
                    </section>

                </main>

                <footer id="contact" className="bg-black text-white p-12 text-center border-t-8 border-yellow-400">
                    <h2 className="text-[10vw] font-black leading-none uppercase text-transparent text-stroke-2">
                        Let's Build
                    </h2>
                    <div className="flex flex-wrapjustify-center gap-8 mt-8 text-2xl font-bold uppercase justify-center">
                        {socials.map((social) => (
                            <a key={social.name} href={social.url} className="hover:text-yellow-400 hover:underline decoration-wavy flex items-center gap-2">
                                {social.name} <ArrowUpRight size={20} />
                            </a>
                        ))}
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default CssCrimes;
