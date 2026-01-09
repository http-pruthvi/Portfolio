import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { aboutData } from "@/data/about";
import { Github, Play, Briefcase, GraduationCap, Mail, ExternalLink, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Minimal GitHub Stats Component
const MinimalGitHub = () => {
    const [stats, setStats] = useState({ repos: 0, stars: 0 });
    const username = "http-pruthvi";

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const totalStars = data.reduce((acc: number, repo: { stargazers_count: number }) => acc + (repo.stargazers_count || 0), 0);
                    setStats({ repos: data.length, stars: totalStars });
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="flex gap-12 text-sm font-mono border-t border-neutral-200 pt-8 mt-12">
            <div>
                <span className="block text-neutral-400 mb-1">REPOSITORIES</span>
                <span className="text-2xl font-bold">{stats.repos}</span>
            </div>
            <div>
                <span className="block text-neutral-400 mb-1">TOTAL STARS</span>
                <span className="text-2xl font-bold">{stats.stars}</span>
            </div>
            <div>
                <span className="block text-neutral-400 mb-1">PROFILE</span>
                <a href={`https://github.com/${username}`} className="text-2xl font-bold hover:underline flex items-center gap-2">
                    @{username} <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
};

const MinimalHome = () => {
    const [clickCount, setClickCount] = useState(0);
    const [showBSOD, setShowBSOD] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleThemeClick = () => {
        setClickCount(prev => prev + 1);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setClickCount(0), 1000); // Reset if not rapid

        if (clickCount >= 9) { // 10th click
            setShowBSOD(true);
            setTimeout(() => {
                setShowBSOD(false);
                setClickCount(0);
            }, 3000);
        }
    };

    if (showBSOD) {
        return (
            <div className="fixed inset-0 bg-[#0000AA] text-white font-mono p-8 md:p-20 z-[100] overflow-hidden cursor-none selection:bg-[#0000AA]">
                <h1 className="text-2xl mb-8 bg-white text-[#0000AA] inline-block px-2">WINDOWS</h1>
                <p className="mb-8">An error has occurred. To continue:</p>
                <p className="mb-4">Press Enter to return to Windows, or</p>
                <p className="mb-12">Press CTRL+ALT+DEL to restart your computer. If you do this, you will lose any unsaved information in all open applications.</p>
                <p className="mb-12">Error: 0E : 016F : BFF9B3D4</p>
                <p className="text-center animate-pulse">Press any key to continue _</p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-black selection:text-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/minimal" className="font-bold text-xl tracking-tighter z-50 relative">PRUTHVI.DEV</a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
                        <a href="#about" className="hover:text-black transition-colors">About</a>
                        <a href="#work" className="hover:text-black transition-colors">Work</a>
                        <a href="#tech" className="hover:text-black transition-colors">Stack</a>
                        <a href="#certs" className="hover:text-black transition-colors">Certs</a>
                        <a href="/resume" className="hover:text-black transition-colors">Resume</a>
                        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                        <button onClick={handleThemeClick} className="hover:text-black transition-colors">
                            <Moon size={16} />
                        </button>
                    </div>

                    {/* Mobile Nav Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={handleThemeClick} className="text-neutral-600">
                            <Moon size={20} />
                        </button>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="z-50 relative p-2 -mr-2 text-neutral-900">
                            {mobileMenuOpen ? "CLOSE" : "MENU"}
                        </button>
                    </div>

                    {/* Mobile Nav Overlay */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="fixed inset-0 bg-neutral-50 z-40 flex flex-col items-center justify-center gap-8 text-2xl font-bold"
                        >
                            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
                            <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
                            <a href="#tech" onClick={() => setMobileMenuOpen(false)}>Stack</a>
                            <a href="#certs" onClick={() => setMobileMenuOpen(false)}>Certs</a>
                            <a href="/resume" onClick={() => setMobileMenuOpen(false)}>Resume</a>
                            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                        </motion.div>
                    )}
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
                {/* Hero */}
                <section className="min-h-[60vh] flex flex-col justify-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        BUILDING<br />
                        <span className="text-neutral-400">INTELLIGENCE</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed"
                    >
                        Full-stack developer & AI enthusiast crafting digital experiences that merge technical depth with visual excellence.
                    </motion.p>

                    <MinimalGitHub />
                </section>

                {/* About Section */}
                <section id="about" className="mb-32">
                    <h2 className="text-4xl font-bold tracking-tight mb-8">About Me</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-6 text-lg text-neutral-600 leading-relaxed font-serif">
                            {aboutData.bio.map((para, i) => <p key={i}>{para}</p>)}
                        </div>
                        <div className="border-l-2 border-neutral-200 pl-6 space-y-6">
                            {aboutData.highlights.map((item, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-neutral-900">{item.title}</h4>
                                    <p className="text-sm text-neutral-500">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills / Tech Stack - Organized by Categories */}
                <section id="tech" className="mb-32">
                    <h2 className="text-4xl font-bold tracking-tight mb-12">Technical Arsenal</h2>
                    <div className="space-y-12">
                        {skills.map((skillGroup, index) => (
                            <div key={index} className="border-t border-neutral-200 pt-6">
                                <h3 className="text-lg font-bold mb-4 text-neutral-400 uppercase tracking-widest">{skillGroup.category}</h3>
                                <div className="flex flex-wrap gap-x-2 gap-y-2">
                                    {skillGroup.items.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-neutral-100 rounded text-neutral-700 font-medium text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Selected Work */}
                <section id="work" className="mb-32">
                    <div className="flex items-baseline justify-between mb-12">
                        <h2 className="text-4xl font-bold tracking-tight">Selected Work</h2>
                        <span className="text-neutral-500 text-sm">2023 — Present</span>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group border-t border-neutral-200 pt-8"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="md:w-1/3">
                                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-neutral-600 mb-4 leading-relaxed">{project.description}</p>
                                        <div className="flex gap-2">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-neutral-100 text-xs font-semibold rounded text-neutral-600">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-64 object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="flex gap-6 mt-4">
                                            <a href={project.github} className="flex items-center gap-2 text-sm font-semibold hover:underline">
                                                <Github size={16} /> View Code
                                            </a>
                                            <a href={project.demo} className="flex items-center gap-2 text-sm font-semibold hover:underline">
                                                <Play size={16} /> Live Demo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="mb-32">
                    <h2 className="text-4xl font-bold tracking-tight mb-12">Timeline</h2>
                    <div className="border-l-2 border-neutral-200 pl-8 ml-2 space-y-16">
                        {experience.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-neutral-900" />
                                <span className="text-sm font-bold text-neutral-400 mb-2 block">{item.period}</span>
                                <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                                <div className="flex items-center gap-2 text-neutral-600 mb-3 font-medium">
                                    {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                                    {item.company}
                                </div>
                                <p className="text-neutral-600 max-w-xl">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications (Compact Table Style) */}
                <section id="certs" className="mb-32">
                    <h2 className="text-4xl font-bold tracking-tight mb-12 flex items-center gap-4">
                        Certifications <span className="text-lg font-normal text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">{certifications.length}</span>
                    </h2>
                    <div className="overflow-hidden border border-neutral-200 rounded-lg">
                        <table className="w-full text-left font-mono text-sm">
                            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                                <tr>
                                    <th className="p-4 font-normal">Certification</th>
                                    <th className="p-4 font-normal">Issuer</th>
                                    <th className="p-4 font-normal hidden md:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {certifications.slice(0, 8).map((cert, i) => (
                                    <tr key={i} className="hover:bg-neutral-50 transition-colors">
                                        <td className="p-4 font-semibold text-neutral-900 hover:underline cursor-pointer">
                                            <a href={cert.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                                                {cert.name}
                                                {cert.url && <ExternalLink size={12} className="text-neutral-400" />}
                                            </a>
                                        </td>
                                        <td className="p-4 text-neutral-600">{cert.issuer}</td>
                                        <td className="p-4 text-neutral-500 hidden md:table-cell">{cert.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {certifications.length > 8 && (
                            <div className="p-4 bg-neutral-50 text-center text-neutral-500 text-xs border-t border-neutral-200">
                                + {certifications.length - 8} more certifications available
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="border-t border-neutral-200 pt-20 pb-10">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 text-center md:text-left">
                        LET'S TALK
                    </h2>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <p className="text-neutral-600 text-lg mb-4">Open for opportunities and collaborations.</p>
                            <a href="mailto:contact@pruthvi.dev" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-bold rounded hover:bg-neutral-800 transition-colors">
                                <Mail size={18} /> Get in Touch
                            </a>
                        </div>
                        <div className="flex gap-6 text-2xl">
                            <a href="#" className="text-neutral-400 hover:text-black transition-colors"><Github /></a>
                        </div>
                    </div>
                </footer>

                {/* Easter Egg: Invisible Ink */}
                <div className="mt-20 py-10 text-center select-all selection:bg-black selection:text-white text-neutral-50 cursor-default">
                    <p className="font-mono text-sm tracking-widest">
                        SECRET UNLOCKED: "Beauty in simplicity." <br />
                        Use code <span className="font-bold">MINIMAL_VIBES</span> on the contact form for a virtual high-five.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default MinimalHome;
