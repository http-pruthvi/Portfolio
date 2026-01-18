import { useState, useRef, useEffect } from "react";
import { useShell } from "@/hooks/useShell";
import { Terminal as TerminalIcon } from "lucide-react";
import { customAsciiArt } from "@/data/asciiArt";

const SudoRmRf = () => {
    const { history, currentPath, processCommand, getPreviousCommand, getNextCommand } = useShell();
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    // Focus input on click
    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            processCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = getPreviousCommand();
            if (prev !== null) setInput(prev);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = getNextCommand();
            setInput(next);
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            processCommand("clear");
        }
    };

    return (
        <div
            className="min-h-screen bg-[#1d2a35] text-[#e5e9f0] font-mono p-4 md:p-8 text-sm md:text-base overflow-x-hidden selection:bg-[#3b4252] selection:text-[#eceff4] relative"
            onClick={handleContainerClick}
        >
            {/* CRT Overlay Effects */}
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
                {/* Flicker/Glow */}
                <div className="absolute inset-0 bg-white/5 animate-pulse opacity-5 pointer-events-none" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 min-h-[80vh] flex flex-col">
                <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
                    <pre className="text-[#88c0d0] text-[2px] md:text-[3px] leading-[1.1] whitespace-pre font-bold select-none opacity-80">
                        {customAsciiArt}
                    </pre>
                    <div className="mt-2 text-center text-[#4c566a] text-xs uppercase tracking-[0.2em]">System Online. Type 'help' to start.</div>
                </div>

                <div className="space-y-1 flex-1">
                    {history.map((item) => (
                        <div key={item.id} className="mb-2">
                            <div className="flex gap-2 items-center flex-wrap opacity-70 hover:opacity-100 transition-opacity">
                                <span className="text-[#bf616a] font-bold">visitor@pruthvi</span>
                                <span className="text-[#ebcb8b]">in</span>
                                <span className="text-[#a3be8c]">{item.path}</span>
                                <span className="text-[#5e81ac]">$</span>
                                <span className="break-all tracking-wide">{item.command}</span>
                            </div>
                            <div className="pl-4 pb-2 text-[#d8dee9] whitespace-pre-wrap leading-relaxed break-words border-l border-[#4c566a]/30 ml-1 mt-1">
                                {item.output.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 bg-[#1d2a35]/90 backdrop-blur-sm p-2 -mx-2 mt-4 border-t border-[#4c566a]/50">
                    <div className="flex gap-2 items-center">
                        <span className="text-[#bf616a] whitespace-nowrap font-bold animate-pulse">➜</span>
                        <span className="text-[#a3be8c]">{currentPath}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none flex-1 text-[#e5e9f0] caret-[#88c0d0] w-full min-w-[50px] font-bold placeholder-[#4c566a]"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                            placeholder="Type a command..."
                        />
                    </div>
                </div>
                <div ref={bottomRef} className="h-4" />
            </div>

            {/* Mobile Keyboard Helper */}
            <div className="md:hidden fixed bottom-6 right-6 z-[60]">
                <button
                    onClick={() => {
                        inputRef.current?.focus();
                        processCommand("help");
                    }}
                    className="bg-[#2e3440] p-4 rounded-full shadow-[0_0_15px_rgba(136,192,208,0.3)] border border-[#88c0d0]/30 active:scale-95 transition-all active:bg-[#88c0d0]/20"
                >
                    <TerminalIcon size={24} className="text-[#88c0d0]" />
                </button>
            </div>
        </div>
    );
};

export default SudoRmRf;
