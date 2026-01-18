
export type FileSystemItem = {
    type: 'file' | 'directory';
    content?: string;
    children?: Record<string, FileSystemItem>;
};

export const terminalFileSystem: Record<string, FileSystemItem> = {
    'about.md': {
        type: 'file',
        content: `
# Pruthvi.Dev
-----------
Role: Full Stack Developer
Status: Online & Ready to Code
Location: India (Remote Friendly)

I specialize in building high-performance web applications and 3D web experiences.
`.trim()
    },
    'skills.md': {
        type: 'file',
        content: `
# Technical Skills
----------------
Frontend:  React, TypeScript, TailwindCSS, Three.js, Framer Motion
Backend:   Node.js, Express, PostgreSQL, Python
Tools:     Git, Docker, Figma, VS Code
`.trim()
    },
    'contact.md': {
        type: 'file',
        content: `
# Contact Channels
----------------You can reach me at:
- Email: phusepruthvi@gmail.com
- GitHub: github.com/http-pruthvi
- LinkedIn: linkedin.com/in/pruthviraj-phuse-aa0513324/
- Twitter: @pruthvi_dev
`.trim()
    },
    'projects': {
        type: 'directory',
        children: {
            'readme.txt': { type: 'file', content: "Type 'projects' to view the interactive gallery." },
            'portfolio.md': { type: 'file', content: "This website! Built with React + Vite." },
            'algoquest.md': { type: 'file', content: "A gamified DSA learning platform." }
        }
    },
    'secrets': {
        type: 'directory',
        children: {
            'todo.txt': { type: 'file', content: "1. Take over the world\n2. Drink coffee" }
        }
    }
};
