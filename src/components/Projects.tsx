import { PinContainer } from "@/components/ui/3d-pin";
import { Github, Play } from "lucide-react";
import { motion } from "framer-motion";

import { projects } from "@/data/projects";

const Projects = () => {
    return (
        <section id="projects" className="py-[89px] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-[55px]"
                >
                    <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-[21px]">
                        Featured Projects
                    </h2>
                    <p className="text-neutral-400 text-[16px] max-w-2xl mx-auto">
                        A selection of my recent work in AI, Mobile, and Web Development
                    </p>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center gap-16 mt-10">
                    {projects.map((project, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="h-[25rem] w-[20rem] flex items-center justify-center sm:w-96 w-80"
                        >
                            <PinContainer
                                title="View Project"
                                href={project.github}
                            >
                                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                                    <h3 className={`max-w-xs !pb-2 !m-0 font-bold text-base ${project.color}`}>
                                        {project.title}
                                    </h3>
                                    <div className="text-base !m-0 !p-0 font-normal">
                                        <span className="text-slate-500 line-clamp-2">
                                            {project.description}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden relative group">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            <div className="flex gap-2">
                                                {project.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                                            <Github size={16} /> Source
                                        </a>
                                        <a href={project.demo} className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                            <Play size={16} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </PinContainer>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
