import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
};

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi! I'm Pruthvi's AI assistant. Ask me anything about his skills, projects, or experience!",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const generateResponse = (input: string) => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
            return "Hello there! How can I help you today?";
        }
        if (lowerInput.includes("skills") || lowerInput.includes("stack") || lowerInput.includes("technologies")) {
            return "Pruthvi is skilled in Full-Stack Development (React, Node.js), AI/ML (Python, TensorFlow, PyTorch), and Mobile App Development (Flutter). He also knows Cloud technologies like AWS and Google Cloud.";
        }
        if (lowerInput.includes("project") || lowerInput.includes("work")) {
            return "Some of his key projects include an AI Plant Disease Detection System, ASTRA (Smart AI Assistant), and ItoBound (Intelligent Dating App). You can check out the Projects section for more details!";
        }
        if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach")) {
            return "You can reach Pruthvi at phusepruthvi@gmail.com or connect with him on LinkedIn. There's also a contact form at the bottom of the page!";
        }
        if (lowerInput.includes("experience") || lowerInput.includes("intern")) {
            return "Pruthvi is currently a Flutter Developer Intern at UNIKODEX (since July 2025). He's gaining hands-on experience in building mobile applications.";
        }
        if (lowerInput.includes("education") || lowerInput.includes("college")) {
            return "He is pursuing a B.Tech in Computer Science & Engineering (2023–2027).";
        }

        return "That's a great question! While I'm just a simple AI, I'd recommend checking out the Resume or Contact section for more specific details about Pruthvi.";
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(newUserMessage.text),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-500 transition-all",
                    isOpen && "hidden"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageCircle size={28} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-neutral-800 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Pruthvi AI</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-2 max-w-[80%]",
                                        msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                            msg.sender === "user"
                                                ? "bg-purple-500/20 text-purple-400"
                                                : "bg-cyan-500/20 text-cyan-400"
                                        )}
                                    >
                                        {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div
                                        className={cn(
                                            "p-3 rounded-2xl text-sm",
                                            msg.sender === "user"
                                                ? "bg-purple-600 text-white rounded-tr-none"
                                                : "bg-neutral-800 text-neutral-200 rounded-tl-none"
                                        )}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2 mr-auto max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                                        <Bot size={14} />
                                    </div>
                                    <div className="p-3 rounded-2xl rounded-tl-none bg-neutral-800 text-neutral-400 text-sm flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-neutral-800 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask something..."
                                className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="p-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
