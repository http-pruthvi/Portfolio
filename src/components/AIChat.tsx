import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ChevronRight, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Log = {
    id: string;
    type: "command" | "response" | "system";
    content: string;
    timestamp: Date;
};

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [logs, setLogs] = useState<Log[]>([
        {
            id: "init",
            type: "system",
            content: "INITIALIZING NEURAL LINK...\nConnection Established.\nType 'help' for available commands.",
            timestamp: new Date()
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, isOpen]);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const processCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase().trim();
        let response = "";

        // Function to check keywords
        const contains = (keywords: string[]) => keywords.some(k => lowerCmd.includes(k));

        // CLI Commands & Natural Language Parsing
        if (contains(["help", "options", "commands", "what can you do"])) {
            response = "AVAILABLE COMMANDS:\n  > about      : View profile summary\n  > skills     : List technical capabilities\n  > projects   : Access project database\n  > contact    : Establish communication\n  > clear      : Purge terminal logs\n  > exit       : Close terminal session\n\n  or ask me questions like 'who are you?', 'show me your work', 'do you know react?', etc.";
        }
        else if (lowerCmd === "clear" || lowerCmd === "cls") {
            setLogs([]);
            return "";
        }
        else if (lowerCmd === "exit") {
            setIsOpen(false);
            return "";
        }
        else if (contains(["about", "who are you", "who is pruthvi", "intro", "bio"])) {
            response = "IDENTITY: Pruthvi\nROLE: Full-Stack Developer & AI Engineer\nSTATUS: Open for work\nOBJECTIVE: Building scalable, intelligent digital solutions.\nEDUCATION: B.Tech in CSE (2023-2027)";
        }
        else if (contains(["skills", "tech stack", "technologies", "what do you know", "languages"])) {
            response = "TECH STACK DETECTED:\n[FRONTEND] React, TypeScript, Tailwind, Three.js\n[BACKEND] Node.js, Python, Flask, Go\n[AI/ML] TensorFlow, PyTorch, OpenCV\n[TOOLS] Docker, AWS, Git\n\nI can adapt to any stack required for the mission.";
        }
        else if (contains(["projects", "work", "portfolio", "what have you made", "show me"])) {
            response = "LOADING PROJECT DATABASE...\n1. AI Plant Disease Detection\n2. ASTRA (Smart AI Assistant)\n3. ItoBound (Intelligent Dating App)\n\nRun 'open [project_name]' or ask about them for details.";
        }
        else if (contains(["contact", "email", "reach", "hire", "github", "linkedin"])) {
            response = "ESTABLISHING COMMS...\nEmail: phusepruthvi@gmail.com\nLinkedIn: linkedin.com/in/http-pruthvi\nGitHub: github.com/http-pruthvi\nInstagram: instagram.com/http_pruthvi\nSignal strength: STRONG";
        }
        else if (contains(["resume", "cv", "download resume"])) {
            response = "RESUME FILE FOUND.\nPath: /public/resume.pdf\nAction: Redirecting to resume section...\n(You can click the 'Resume' link in the navbar)";
        }
        else if (contains(["experience", "intern", "job"])) {
            response = "CURRENT POSITION: Flutter Developer Intern @ UNIKODEX (July 2025 - Present).\nDeveloping cross-platform mobile applications and optimizing performance.";
        }
        else if (contains(["hi", "hello", "hey", "greetings"])) {
            response = "Greetings, User. Systems are functional. Ready for input.";
        }
        // Specific Tech Queries
        else if (contains(["react", "next", "vue", "angular"])) {
            response = "CONFIRMED: High proficiency in Frontend Frameworks (React, Next.js). Delivering responsive, high-performance UIs.";
        }
        else if (contains(["python", "ai", "ml", "tensorflow", "pytorch"])) {
            response = "CONFIRMED: Advanced capabilities in AI/ML & Python. Experience with neural networks, computer vision, and NLP models.";
        }
        else {
            response = `Command '${lowerCmd}' not recognized. Nature language processing module minimal. Try 'help' for valid inputs.`;
        }

        return response;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newLog: Log = {
            id: Date.now().toString(),
            type: "command",
            content: input,
            timestamp: new Date()
        };

        setLogs(prev => [...prev, newLog]);

        // Process
        setTimeout(() => {
            const responseText = processCommand(input);
            if (responseText) {
                const resLog: Log = {
                    id: (Date.now() + 1).toString(),
                    type: "response",
                    content: responseText,
                    timestamp: new Date()
                };
                setLogs(prev => [...prev, resLog]);
            }
        }, 100 + Math.random() * 200); // Tiny "processing" delay

        setInput("");
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "text-gray-400 hover:text-white transition-colors relative p-2 rounded-full hover:bg-white/10",
                    isOpen && "text-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                )}
                title="Open Terminal"
            >
                <Terminal size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 md:right-10 md:bottom-24 w-[90vw] md:w-[600px] h-[60vh] md:h-[500px] bg-black/85 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col font-mono text-sm"
                        style={{ boxShadow: "0 0 40px rgba(6,182,212,0.15)" }}
                    >
                        {/* Terminal Header */}
                        <div className="bg-gray-900/90 border-b border-white/10 p-2 flex items-center justify-between select-none">
                            <div className="flex items-center gap-2 px-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-gray-400 ml-2">guest@portfolio:~</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setLogs([])} className="p-1 hover:bg-white/10 rounded text-gray-500 hover:text-white" title="Clear">
                                    <Minimize2 size={14} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400" title="Close">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-2 text-green-400/90"
                            ref={scrollRef}
                            onClick={() => inputRef.current?.focus()}
                        >
                            {/* CRT/Scanline Overlay */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />

                            {logs.map(log => (
                                <div key={log.id} className="break-words whitespace-pre-wrap">
                                    {log.type === 'command' ? (
                                        <div className="flex gap-2 text-cyan-300">
                                            <span className="opacity-50">$</span>
                                            <span>{log.content}</span>
                                        </div>
                                    ) : (
                                        <div className={cn(
                                            "pl-4 border-l-2 border-white/10",
                                            log.type === "system" ? "text-yellow-400/80" : "text-gray-300"
                                        )}>
                                            {log.content}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Input Line */}
                            <form onSubmit={handleSubmit} className="flex gap-2 items-center text-cyan-300 mt-2 relative z-20">
                                <ChevronRight size={14} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-cyan-300 placeholder-cyan-800/50"
                                    autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-4 bg-cyan-400 ml-[-8px]"
                                />
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
