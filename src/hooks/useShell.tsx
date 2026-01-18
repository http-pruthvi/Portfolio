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
                    <div key={Date.now()} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <div className="text-[#88c0d0] font-bold mb-2">Navigation</div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                                <span className="text-[#ebcb8b]">cd</span> <span className="text-[#d8dee9]">Change directory</span>
                                <span className="text-[#ebcb8b]">ls</span> <span className="text-[#d8dee9]">List contents</span>
                                <span className="text-[#ebcb8b]">pwd</span> <span className="text-[#d8dee9]">Print working directory</span>
                                <span className="text-[#ebcb8b]">clear</span> <span className="text-[#d8dee9]">Clear screen</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[#88c0d0] font-bold mb-2">System</div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                                <span className="text-[#ebcb8b]">whoami</span> <span className="text-[#d8dee9]">User info</span>
                                <span className="text-[#ebcb8b]">neofetch</span> <span className="text-[#d8dee9]">System stats</span>
                                <span className="text-[#ebcb8b]">gui</span> <span className="text-[#d8dee9]">Switch to graphical modes</span>
                                <span className="text-[#ebcb8b]">theme</span> <span className="text-[#d8dee9]">Change color scheme</span>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="text-[#88c0d0] font-bold mb-2">Portfolio</div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                                <span className="text-[#a3be8c]">projects</span> <span className="text-[#d8dee9]">View project gallery</span>
                                <span className="text-[#a3be8c]">skills</span> <span className="text-[#d8dee9]">Check technical stats</span>
                                <span className="text-[#a3be8c]">contact</span> <span className="text-[#d8dee9]">Open communication channels</span>
                                <span className="text-[#a3be8c]">resume</span> <span className="text-[#d8dee9]">Download localized resume</span>
                            </div>
                        </div>
                    </div>
                ]);
                break;

            case 'clear':
                setHistory([]);
                break;

            case 'whoami':
                addToHistory(cmd, [
                    <div key={Date.now()} className="p-4 border border-[#4c566a] rounded-md bg-[#2e3440]/50 max-w-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-[#bf616a] flex items-center justify-center text-2xl">👨‍💻</div>
                            <div>
                                <div className="text-xl font-bold text-[#88c0d0]">Visitor</div>
                                <div className="text-xs text-[#d8dee9]">Generic User Role</div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-[#eceff4]">
                            <div className="flex justify-between"><span>Access Level:</span> <span className="text-[#a3be8c]">Guest</span></div>
                            <div className="flex justify-between"><span>Session ID:</span> <span className="font-mono text-[#5e81ac]">{Math.random().toString(36).substring(7)}</span></div>
                            <div className="flex justify-between"><span>Location:</span> <span>Remote Terminal</span></div>
                        </div>
                    </div>
                ]);
                break;

            case 'pwd':
                addToHistory(cmd, [currentPath.join('/')]);
                break;

            case 'ls': {
                const dir = getDirectory(currentPath);
                if (dir && dir.children) {
                    const items = Object.entries(dir.children).map(([name, item]) => {
                        const isDir = item.type === 'directory';
                        return (
                            <span key={name} className={`mr-4 ${isDir ? 'text-[#88c0d0] font-bold' : 'text-[#e5e9f0]'}`}>
                                {name}{isDir ? '/' : ''}
                            </span>
                        );
                    });
                    addToHistory(cmd, [<div key={Date.now()} className="flex flex-wrap">{items}</div>]);
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

            case 'projects':
                addToHistory(cmd, [
                    <div key={Date.now()} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                        {projects.map((p, i) => (
                            <div key={i} className="border border-[#4c566a] p-3 rounded hover:border-[#88c0d0] transition-colors group">
                                <div className={`font-bold ${p.color} mb-1 group-hover:underline`}>{p.title}</div>
                                <div className="text-xs text-[#d8dee9] mb-2">{p.description}</div>
                                <div className="flex gap-2 text-[10px] uppercase tracking-wider">
                                    {p.tags.map(tag => <span key={tag} className="bg-[#2e3440] px-1 rounded text-[#8fbcbb]">{tag}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                ]);
                break;

            case 'skills': {
                const skillBar = (name: string, level: number, color: string) => {
                    const filled = Math.floor(level / 10);
                    const empty = 10 - filled;
                    return (
                        <div key={name} className="flex items-center gap-4 font-mono text-sm max-w-md">
                            <span className="w-24 shrink-0 text-right text-[#d8dee9]">{name}</span>
                            <div className="flex-1 flex text-[#4c566a]">
                                <span className={color}>{'#'.repeat(filled)}</span>
                                <span>{'-'.repeat(empty)}</span>
                            </div>
                            <span className={color}>{level}%</span>
                        </div>
                    );
                };

                addToHistory(cmd, [
                    <div key={Date.now()} className="space-y-1 my-2">
                        <div className="text-[#88c0d0] font-bold mb-2">:: TECHNICAL COMPETENCE ::</div>
                        {skillBar('TypeScript', 90, 'text-[#88c0d0]')}
                        {skillBar('React / Next', 95, 'text-[#5e81ac]')}
                        {skillBar('Node.js', 85, 'text-[#a3be8c]')}
                        {skillBar('Python / AI', 80, 'text-[#bf616a]')}
                        {skillBar('Rust', 40, 'text-[#d08770]')}
                        {skillBar('DevOps', 75, 'text-[#ebcb8b]')}
                    </div>
                ]);
                break;
            }

            case 'resume':
                addToHistory(cmd, [
                    <div key={Date.now()} className="my-2">
                        <div className="text-[#d8dee9] mb-2">Generating download link...</div>
                        <a
                            href="/resume.pdf"
                            download
                            className="inline-flex items-center gap-2 bg-[#4c566a] hover:bg-[#5e81ac] text-white px-4 py-2 rounded transition-colors"
                        >
                            <span>📥</span> Download Resume (PDF)
                        </a>
                    </div>
                ]);
                break;

            case 'contact':
                addToHistory(cmd, [
                    <div key={Date.now()} className="my-2 border-l-2 border-[#a3be8c] pl-4">
                        <div className="mb-2 text-[#eceff4]">Initiating secure handshake...</div>
                        <div className="grid gap-2 text-sm">
                            <a href="mailto:phusepruthvi@gmail.com" className="flex items-center gap-2 hover:text-[#a3be8c] transition-colors">
                                <span className="text-[#ebcb8b]">✉</span> phusepruthvi@gmail.com
                            </a>
                            <a href="https://github.com/http-pruthvi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#a3be8c] transition-colors">
                                <span className="text-[#ebcb8b]">⌘</span> github.com/http-pruthvi
                            </a>
                            <a href="https://www.linkedin.com/in/pruthviraj-phuse-aa0513324/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#a3be8c] transition-colors">
                                <span className="text-[#ebcb8b]">💼</span> linkedin.com/in/pruthviraj-phuse
                            </a>
                        </div>
                    </div>
                ]);
                break;

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

            case 'gui':
                window.location.href = '/';
                break;

            case '':
                addToHistory('', []);
                break;

            default:
                addToHistory(cmd, [`Command not found: ${mainCommand}. Type 'help' for available commands.`]);
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
