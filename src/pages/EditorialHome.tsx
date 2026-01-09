import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { socials } from "@/data/socials";

const EditorialHome = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [redactionMode, setRedactionMode] = useState(false);

    // Toggle Redaction Mode
    const toggleRedaction = () => {
        setRedactionMode(prev => !prev);
    };

    // Redact text on click
    const handleRedact = (e: React.MouseEvent<HTMLElement>) => {
        if (!redactionMode) return;
        const target = e.target as HTMLElement;
        if (target.innerText && target.tagName !== 'DIV') { // Simple check to avoid redacting layout containers
            target.style.backgroundColor = 'black';
            target.style.color = 'black';
            target.style.userSelect = 'none';
        }
    };

    return (
        <div ref={containerRef} className={`bg-[#eaeaea] min-h-[300vh] font-serif text-neutral-900 selection:bg-[#1a1a1a] selection:text-white ${redactionMode ? 'cursor-text' : ''}`} onClick={handleRedact}>
            {redactionMode && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 text-xs font-sans uppercase tracking-widest z-50 pointer-events-none animate-pulse">
                    REDACTION MODE ACTIVE
                </div>
            )}
            {/* Hero */}
            <section className="h-screen sticky top-0 flex flex-col justify-between p-8 md:p-16 overflow-hidden">
                <nav className="flex flex-col md:flex-row justify-between items-center text-sm font-sans tracking-widest uppercase gap-4 md:gap-0">
                    <span className="font-bold border-b-2 border-transparent hover:border-black transition-colors">Pruthvi.Dev</span>

                    <div className="flex gap-4 md:gap-8 items-center">
                        <span
                            onClick={toggleRedaction}
                            className={`cursor-pointer transition-colors ${redactionMode ? 'bg-black text-white px-2' : 'hover:bg-black hover:text-white px-2'}`}
                            title="Toggle Redaction Mode"
                        >
                            (Edition 2025)
                        </span>
                        <a href="/resume" className="hover:underline decoration-1">Resume</a>
                        <a href="/" className="hover:line-through decoration-1">Close Info</a>
                    </div>
                </nav>

                <div className="relative z-10">
                    <motion.h1
                        className="text-[12vw] leading-[0.85] font-light tracking-tight"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        DIGITAL<br />
                        <span className="italic font-normal">CRAFTSMAN</span>
                    </motion.h1>
                </div>

                <div className="flex justify-between items-end">
                    <div className="w-1/3 text-sm font-sans leading-relaxed text-neutral-500">
                        Specialized in building high-performance<br />
                        web applications with a focus on<br />
                        interactive design and scalability.
                    </div>
                    <motion.div
                        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
                        className="w-24 h-24 border border-[#1a1a1a] rounded-full flex items-center justify-center text-xs uppercase cursor-pointer hover:bg-neutral-200 transition-colors"
                        onClick={() => {
                            const stain = document.createElement('div');
                            stain.style.position = 'fixed';
                            stain.style.top = `${Math.random() * 80}vh`;
                            stain.style.left = `${Math.random() * 80}vw`;
                            stain.style.width = '150px';
                            stain.style.height = '150px';
                            stain.style.borderRadius = '50%';
                            stain.style.border = '4px solid rgba(139, 69, 19, 0.4)';
                            stain.style.boxShadow = '0 0 10px rgba(139, 69, 19, 0.2)';
                            stain.style.pointerEvents = 'none';
                            stain.style.zIndex = '100';
                            stain.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`;
                            document.body.appendChild(stain);
                        }}
                    >
                        Scroll
                    </motion.div>
                </div>
            </section>

            {/* Content Container (z-index above sticky hero) */}
            <div className="relative z-20 bg-[#eaeaea] pb-32">

                {/* Skills Marquee */}
                <div className="py-24 border-t border-[#1a1a1a] overflow-hidden whitespace-nowrap">
                    <motion.div
                        className="text-[8vw] font-light uppercase leading-none flex gap-8"
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    >
                        {skills.flatMap(s => s.items).join(" • ")} • {skills.flatMap(s => s.items).join(" • ")}
                    </motion.div>
                </div>

                {/* Selected Works */}
                <section className="px-8 md:px-16">
                    <h2 className="text-sm font-sans tracking-widest uppercase mb-24 border-b border-[#1a1a1a] pb-4">Selected Works (0{projects.length})</h2>

                    <div className="space-y-32">
                        {projects.map((project, i) => (
                            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                                <div className="md:w-3/5 relative overflow-hidden group">
                                    <div className="overflow-hidden aspect-[4/3]">
                                        <motion.img
                                            initial={{ scale: 1.2 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            src={project.image}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-2/5 space-y-6">
                                    <div className="text-xs font-sans uppercase tracking-widest text-neutral-500">0{i + 1} / {project.tags[0]}</div>
                                    <h3 className="text-5xl md:text-6xl font-light italic">{project.title}</h3>
                                    <p className="text-lg leading-relaxed text-neutral-600 font-sans">{project.description}</p>
                                    <a href={project.demo} className="inline-block border-b border-[#1a1a1a] pb-1 text-sm uppercase tracking-widest hover:text-neutral-500 transition-colors">View Project</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="px-8 md:px-16 mt-48">
                    <h2 className="text-sm font-sans tracking-widest uppercase mb-16 border-b border-[#1a1a1a] pb-4">Experience Log</h2>
                    <div className="space-y-12 max-w-4xl mx-auto">
                        {experience.map((exp, i) => (
                            <div key={i} className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                                <span className="text-sm font-sans uppercase tracking-widest text-neutral-500 md:w-1/4">{exp.period}</span>
                                <div className="md:w-3/4">
                                    <h3 className="text-3xl font-light mb-2">{exp.role}</h3>
                                    <div className="text-xl italic text-neutral-600 mb-4">@ {exp.company}</div>
                                    <p className="font-sans text-neutral-600 leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section className="px-8 md:px-16 mt-48">
                    <h2 className="text-sm font-sans tracking-widest uppercase mb-16 border-b border-[#1a1a1a] pb-4">Certifications</h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {certifications.map((cert, i) => (
                            <div key={i} className="flex flex-col md:flex-row justify-between items-baseline border-b border-neutral-300 pb-4 last:border-0 hover:bg-neutral-200 transition-colors p-2 -mx-2 rounded">
                                <div className="md:w-1/3">
                                    <span className="text-xs font-sans uppercase tracking-widest text-neutral-500">{cert.year}</span>
                                    <div className="font-sans text-sm text-neutral-400 mt-1">{cert.issuer}</div>
                                </div>
                                <div className="md:w-2/3 flex justify-between items-center group">
                                    <h3 className="text-xl font-light">{cert.name}</h3>
                                    {cert.url && (
                                        <a href={cert.url} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest border border-black px-3 py-1 opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white">
                                            Verify
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="h-[50vh] flex flex-col justify-center items-center p-16 text-center border-t border-[#1a1a1a] mt-32">
                    <h2 className="text-[8vw] font-light leading-none mb-12">
                        LET'S <span className="italic">COLLABORATE</span>
                    </h2>
                    <div className="flex gap-12 font-sans uppercase tracking-widest text-sm">
                        {socials.slice(0, 3).map(s => (
                            <a key={s.name} href={s.url} className="hover:underline">{s.name}</a>
                        ))}
                        <a href={socials.find(s => s.name === "Email")?.url} className="hover:underline">Email</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default EditorialHome;
