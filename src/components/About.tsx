import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { Code, Cpu, Globe, Server } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-[89px] bg-neutral-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title - Golden Ratio Typography: 42px (26 * φ) */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-[32px] md:text-[42px] lg:text-[52px] font-bold text-center mb-[55px] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                >
                    About Me
                </motion.h2>

                {/* Profile Card - Golden Ratio Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mb-[89px]"
                >
                    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl border border-white/10 p-[34px] md:p-[55px] shadow-2xl shadow-cyan-500/10">
                        {/* Bio Text - Centered */}
                        <div className="text-center max-w-3xl mx-auto">
                            {/* Heading: 26px (16 * φ) */}
                            <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-[21px]">
                                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Pruthviraj</span>
                            </h3>
                            {/* Body text: 16px, line height: 26px (16 * φ) */}
                            <p className="text-neutral-300 text-[16px] leading-[26px] mb-[21px]">
                                A passionate Computer Engineering student specializing in <span className="text-cyan-400 font-semibold">Full-Stack Development</span>,
                                <span className="text-purple-400 font-semibold"> AI/ML</span>, and <span className="text-green-400 font-semibold">Cloud Computing</span>.
                                Currently working as a Flutter Developer Intern at UNIKODEX, where I build production-ready mobile applications.
                            </p>
                            {/* Small text: 13px (Fibonacci) */}
                            <p className="text-neutral-400 text-[13px] leading-[21px]">
                                With <span className="text-cyan-400 font-semibold">22+ professional certifications</span> and hands-on experience in modern tech stacks,
                                I'm dedicated to creating innovative solutions that make a real-world impact.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Bento Grid - Golden Ratio Spacing */}
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
    <div className={`flex flex-1 w-full h-full min-h-[144px] rounded-xl bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 border border-white/5 items-center justify-center overflow-hidden relative group ${className}`}>
        <div className="absolute inset-0 bg-dot-white/[0.1] opacity-50" />
        {children}
    </div>
);

const items = [
    {
        title: "Full-Stack Development",
        description: "Building scalable web applications using React, Node.js, and Python.",
        header: (
            <Skeleton className="from-cyan-900/20 to-blue-900/20">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10 p-4 bg-black/50 rounded-lg border border-cyan-500/30 backdrop-blur-sm"
                >
                    <Globe className="text-cyan-400 w-12 h-12" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </Skeleton>
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-cyan-500" />,
    },
    {
        title: "Mobile Engineering",
        description: "Creating cross-platform mobile experiences with Flutter & Dart.",
        header: (
            <Skeleton className="from-purple-900/20 to-pink-900/20">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="relative z-10 flex gap-2"
                >
                    <div className="w-8 h-16 border-2 border-purple-500/50 rounded-lg bg-black/50 backdrop-blur-sm" />
                    <div className="w-8 h-16 border-2 border-pink-500/50 rounded-lg bg-black/50 backdrop-blur-sm mt-4" />
                </motion.div>
                <Cpu className="absolute text-purple-500/10 w-32 h-32 -bottom-8 -right-8" />
            </Skeleton>
        ),
        icon: <IconFileBroken className="h-4 w-4 text-purple-500" />,
    },
    {
        title: "AI & Machine Learning",
        description: "Integrating intelligent models using TensorFlow, PyTorch, and LLMs.",
        header: (
            <Skeleton className="from-green-900/20 to-emerald-900/20">
                <div className="flex gap-3 relative z-10">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: [20, 40, 20],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-2 bg-green-500/50 rounded-full"
                        />
                    ))}
                </div>
                <Server className="absolute text-green-500/10 w-32 h-32 -top-8 -left-8" />
            </Skeleton>
        ),
        icon: <IconSignature className="h-4 w-4 text-green-500" />,
    },
    {
        title: "The Art of Code",
        description: "I believe in writing clean, maintainable, and efficient code that solves real-world problems.",
        header: (
            <Skeleton className="from-pink-900/20 to-rose-900/20">
                <div className="font-mono text-xs text-pink-300/80 p-4 w-full h-full flex flex-col justify-center bg-black/40 backdrop-blur-sm">
                    <p>function createMagic() {"{"}</p>
                    <p className="pl-4">const passion = true;</p>
                    <p className="pl-4">return passion && code;</p>
                    <p>{"}"}</p>
                </div>
            </Skeleton>
        ),
        icon: <IconTableColumn className="h-4 w-4 text-pink-500" />,
    },
];

export default About;
