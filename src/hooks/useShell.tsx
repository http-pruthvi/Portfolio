import React, { useState, useCallback } from 'react';
import { terminalFileSystem, type FileSystemItem } from '../data/terminalFileSystem';
import { projects } from '../data/projects';

export interface CommandHistory {
    id: number;
    command: string;
    output: (string | React.ReactNode)[];
    path: string;
}

export const useShell = () => {
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>(['~']);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const addToHistory = useCallback((command: string, output: (string | React.ReactNode)[]) => {
        setHistory(prev => [...prev, {
            id: Date.now(),
            command,
            output,
            path: currentPath.join('/')
        }]);
        if (command.trim()) {
            setCommandHistory(prev => [command, ...prev]);
            setHistoryIndex(-1);
        }
    }, [currentPath]);

    const getDirectory = (path: string[]): FileSystemItem | null => {
        if (path.length === 1 && path[0] === '~') return { type: 'directory', children: terminalFileSystem };

        let current: FileSystemItem = { type: 'directory', children: terminalFileSystem };

        // Start from index 1 because index 0 is '~'
        for (let i = 1; i < path.length; i++) {
            if (current.children && current.children[path[i]]) {
                current = current.children[path[i]];
            } else {
                return null;
            }
        }
        return current;
    };

    const processCommand = (cmd: string) => {
        const parts = cmd.trim().split(' ');
        const mainCommand = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (mainCommand) {
            case 'help':
                addToHistory(cmd, [
                    "Available commands:",
                    "  cat [file]     - Read file content",
                    "  cd [dir]       - Change directory",
                    "  clear          - Clear terminal history",
                    "  echo [text]    - Print text",
                    "  help           - Show this help message",
                    "  ls             - List directory contents",
                    "  neofetch       - Display system info",
                    "  open [url]     - Open URL in new tab",
                    "  projects       - View projects database",
                    "  pwd            - Print working directory",
                    "  theme [name]   - Change terminal theme",
                    "  whoami         - Display current user",
                    "  gui            - Exit to standard GUI"
                ]);
                break;

            case 'clear':
                setHistory([]);
                break;

            case 'whoami':
                addToHistory(cmd, ["visitor"]);
                break;

            case 'pwd':
                addToHistory(cmd, [currentPath.join('/')]);
                break;

            case 'ls': {
                const dir = getDirectory(currentPath);
                if (dir && dir.children) {
                    const items = Object.entries(dir.children).map(([name, item]) => {
                        return item.type === 'directory' ? `<DIR> ${name}` : name;
                    });
                    addToHistory(cmd, items);
                } else {
                    addToHistory(cmd, [`Error: Cannot list contents of ${currentPath.join('/')}`]);
                }
                break;
            }

            case 'cd': {
                if (!args[0] || args[0] === '~') {
                    setCurrentPath(['~']);
                    addToHistory(cmd, []);
                    return;
                }
                if (args[0] === '..') {
                    if (currentPath.length > 1) {
                        setCurrentPath(prev => prev.slice(0, -1));
                    }
                    addToHistory(cmd, []);
                    return;
                }

                const dir = getDirectory(currentPath);
                if (dir && dir.children && dir.children[args[0]] && dir.children[args[0]].type === 'directory') {
                    setCurrentPath(prev => [...prev, args[0]]);
                    addToHistory(cmd, []);
                } else {
                    addToHistory(cmd, [`cd: ${args[0]}: No such file or directory`]);
                }
                break;
            }

            case 'cat': {
                if (!args[0]) {
                    addToHistory(cmd, ["Usage: cat [filename]"]);
                    return;
                }
                const dir = getDirectory(currentPath);
                if (dir && dir.children && dir.children[args[0]]) {
                    const item = dir.children[args[0]];
                    if (item.type === 'file') {
                        addToHistory(cmd, [item.content || ""]);
                    } else {
                        addToHistory(cmd, [`cat: ${args[0]}: Is a directory`]);
                    }
                } else {
                    addToHistory(cmd, [`cat: ${args[0]}: No such file or directory`]);
                }
                break;
            }

            case 'neofetch':
                addToHistory(cmd, [
                    <div className="flex flex-col md:flex-row gap-6 p-2 rounded-lg bg-black/20" key={Date.now()}>
                        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 overflow-hidden rounded-md border-2 border-[#88c0d0] relative">
                            <img
                                src="/profile.png"
                                alt="Avatar"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-[#2e3440] text-xs text-center text-[#d8dee9] p-2">
                                [Image Not Found]
                            </div>
                        </div>
                        <div className="flex-1 font-mono text-sm leading-relaxed">
                            <div className="mb-2">
                                <span className="text-[#bf616a] font-bold">visitor</span>
                                <span className="text-[#e5e9f0]">@</span>
                                <span className="text-[#88c0d0]">pruthvi.dev</span>
                            </div>
                            <div className="h-px bg-white/20 w-full mb-3" />

                            <div className="grid grid-cols-[100px_1fr] gap-x-2">
                                <span className="text-[#88c0d0] font-bold">OS</span>
                                <span className="text-[#e5e9f0]">PruthviOS v2.0</span>

                                <span className="text-[#88c0d0] font-bold">Host</span>
                                <span className="text-[#e5e9f0]">Web Browser</span>

                                <span className="text-[#88c0d0] font-bold">Kernel</span>
                                <span className="text-[#e5e9f0]">React 18.2.0</span>

                                <span className="text-[#88c0d0] font-bold">Uptime</span>
                                <span className="text-[#e5e9f0]">Continuous</span>

                                <span className="text-[#88c0d0] font-bold">Packages</span>
                                <span className="text-[#e5e9f0]">npm, lucide, framer</span>

                                <span className="text-[#88c0d0] font-bold">Shell</span>
                                <span className="text-[#e5e9f0]">zsh (simulated)</span>

                                <span className="text-[#88c0d0] font-bold">Theme</span>
                                <span className="text-[#e5e9f0]">Nord Dark</span>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <span className="w-4 h-4 bg-[#bf616a] rounded-sm"></span>
                                <span className="w-4 h-4 bg-[#a3be8c] rounded-sm"></span>
                                <span className="w-4 h-4 bg-[#ebcb8b] rounded-sm"></span>
                                <span className="w-4 h-4 bg-[#81a1c1] rounded-sm"></span>
                                <span className="w-4 h-4 bg-[#b48ead] rounded-sm"></span>
                                <span className="w-4 h-4 bg-[#88c0d0] rounded-sm"></span>
                                <span className="w-4 h-4 bg-[#e5e9f0] rounded-sm"></span>
                            </div>
                        </div>
                    </div>
                ]);
                break;

            case 'projects':
                addToHistory(cmd, ["Listing Projects...", ...projects.map(p => `* ${p.title} - ${p.description}`)]);
                break;

            case 'gui':
                window.location.href = '/';
                break;

            case '':
                addToHistory('', []);
                break;

            default:
                addToHistory(cmd, [`Command not found: ${mainCommand}`]);
        }
    };

    const getPreviousCommand = () => {
        if (commandHistory.length === 0) return null;
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        return commandHistory[newIndex];
    };

    const getNextCommand = () => {
        if (historyIndex <= 0) {
            setHistoryIndex(-1);
            return ''; // Return empty string if we're back at the start
        }
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        return commandHistory[newIndex];
    };

    return {
        history,
        currentPath: currentPath.join('/'),
        processCommand,
        getPreviousCommand,
        getNextCommand
    };
};
