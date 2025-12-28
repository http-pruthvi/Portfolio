import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { Cpu, Globe, Server, Brain, Coffee, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-[89px] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-[32px] md:text-[42px] lg:text-[52px] font-bold text-center mb-[55px] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                >
                    About Me
                </motion.h2>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mb-[89px]"
                >
                    <div className="p-[34px] md:p-[55px]">
                        {/* Bio Text */}
                        <div className="text-center max-w-3xl mx-auto">
                            <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-[21px]">
                                Engineering <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Intelligence</span> & Crafting <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experiences</span>
                            </h3>
                            <p className="text-neutral-300 text-[16px] leading-[26px] mb-[21px]">
                                I'm <span className="text-white font-semibold">Pruthviraj</span>, a developer who sees code as a canvas.
                                My journey bridges the gap between <span className="text-cyan-400">complex engineering</span> and <span className="text-purple-400">intuitive design</span>.
                                Whether I'm training a neural network to detect plant diseases or architecting a seamless mobile app at <span className="text-white font-semibold">UNIKODEX</span>,
                                I'm obsessed with building solutions that are not just functional, but <i>impactful</i>.
                            </p>
                            <p className="text-neutral-400 text-[14px] leading-[24px]">
                                Beyond the IDE, you'll find me strategizing over a <b>Chess</b> board, exploring the frontiers of <b>Generative AI</b>,
                                or contributing to the <b>Open Source</b> community. With <span className="text-cyan-400 font-semibold">22+ certifications</span>
                                under my belt, I believe the best way to predict the future is to invent it.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Bento Grid */}
                <BentoGrid className="max-w-5xl mx-auto gap-[21px]">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};

const Skeleton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-1 w-full h-full min-h-[144px] rounded-xl items-center justify-center overflow-hidden relative group ${className}`}>
        <div className="absolute inset-0 bg-dot-white/[0.1] opacity-50" />
        {children}
    </div>
);

const items = [
    {
        title: "Full-Stack Architect",
        description: "Crafting scalable digital ecosystems. From React frontends to robust Python backends.",
        header: (
            <Skeleton className="from-cyan-900/20 to-blue-900/20">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10 p-4 bg-white/5 rounded-lg border border-cyan-500/30 backdrop-blur-sm"
                >
                    <Globe className="text-cyan-400 w-12 h-12" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </Skeleton>
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-cyan-500" />,
    },
    {
        title: "The AI Edge",
        description: "Leveraging LLMs, RAG, and TensorFlow to build smarter applications.",
        header: (
            <Skeleton className="from-purple-900/20 to-pink-900/20">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="relative z-10 flex gap-2 items-center"
                >
                    <Brain className="w-12 h-12 text-purple-400" />
                </motion.div>
                <Cpu className="absolute text-purple-500/10 w-32 h-32 -bottom-8 -right-8" />
            </Skeleton>
        ),
        icon: <IconFileBroken className="h-4 w-4 text-purple-500" />,
    },
    {
        title: "Cloud Native",
        description: "Deploying resilient infrastructure on AWS, GCP, and Oracle Cloud.",
        header: (
            <Skeleton className="from-green-900/20 to-emerald-900/20">
                <div className="flex gap-3 relative z-10">
                    <Server className="w-12 h-12 text-emerald-400" />
                </div>
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
            </Skeleton>
        ),
        icon: <IconSignature className="h-4 w-4 text-green-500" />,
    },
    {
        title: "Beyond Code",
        description: "Strategist at heart & Polyglot. Fluent in English, Hindi, and Marathi, currently learning Japanese. Whether it's Chess or Code, I thrive on complex problems.",
        header: (
            <Skeleton className="from-pink-900/20 to-rose-900/20">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-black/40 rounded-lg backdrop-blur-sm border border-white/10">
                        <Terminal className="w-6 h-6 text-pink-400" />
                    </div>
                    <div className="h-px w-12 bg-pink-500/30" />
                    <div className="p-3 bg-black/40 rounded-lg backdrop-blur-sm border border-white/10">
                        <Coffee className="w-6 h-6 text-rose-400" />
                    </div>
                </div>
            </Skeleton>
        ),
        icon: <IconTableColumn className="h-4 w-4 text-pink-500" />,
    },
];

export default About;
