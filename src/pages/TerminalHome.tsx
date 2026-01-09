import { useState, useRef, useEffect } from "react";
import { useShell } from "@/hooks/useShell";
import { Terminal as TerminalIcon } from "lucide-react";

const TerminalHome = () => {
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
            className="min-h-screen bg-[#1d2a35] text-[#e5e9f0] font-mono p-4 md:p-8 text-sm md:text-base overflow-x-hidden selection:bg-[#3b4252] selection:text-[#eceff4]"
            onClick={handleContainerClick}
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <pre className="text-[#88c0d0] text-xs md:text-sm leading-none mb-6">
                        {`
   _____           _   _         _ 
  |  __ \\         | | | |       (_)
  | |__) | __ _  _| |_| |____   ___ 
  |  ___/ '__| | | | __| '_ \\ \\ / / |
  | |   | |  | |_| | |_| | | \\ V /| |
  |_|   |_|   \\__,_|\\__|_| |_|\\_/ |_|
                                     
   Welcome to PruthviOS v2.0
   Type 'help' to examine the system.
`}
                    </pre>
                </div>

                <div className="space-y-1">
                    {history.map((item) => (
                        <div key={item.id}>
                            <div className="flex gap-2 items-center flex-wrap">
                                <span className="text-[#bf616a]">visitor@pruthvi</span>
                                <span className="text-[#ebcb8b]">in</span>
                                <span className="text-[#a3be8c]">{item.path}</span>
                                <span className="text-[#5e81ac]">$</span>
                                <span>{item.command}</span>
                            </div>
                            <div className="pl-4 pb-2 text-[#d8dee9] whitespace-pre-wrap leading-relaxed">
                                {item.output.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 items-center mt-2">
                    <span className="text-[#bf616a] whitespace-nowrap">visitor@pruthvi</span>
                    <span className="text-[#ebcb8b]">in</span>
                    <span className="text-[#a3be8c]">{currentPath}</span>
                    <span className="text-[#5e81ac]">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none flex-1 text-[#e5e9f0] caret-[#88c0d0] w-full min-w-[50px]"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} className="pb-8" />
            </div>

            {/* Mobile Keyboard Helper */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => {
                        inputRef.current?.focus();
                        processCommand("help");
                    }}
                    className="bg-[#3b4252] p-3 rounded-full shadow-lg border border-[#4c566a] active:scale-95 transition-transform"
                >
                    <TerminalIcon size={20} className="text-[#88c0d0]" />
                </button>
            </div>
        </div>
    );
};

export default TerminalHome;
