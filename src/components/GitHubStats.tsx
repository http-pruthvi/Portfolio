import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
}

const GitHubStats = () => {
    const username = "http-pruthvi";
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [stats, setStats] = useState({ repos: 0, stars: 0 });

    useEffect(() => {
        // Fetch user repos
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            .then((res) => res.json())
            .then((data) => {
                setRepos(data.slice(0, 6));
                const totalStars = data.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
                setStats({ repos: data.length, stars: totalStars });
            })
            .catch((err) => console.error("GitHub API Error:", err));
    }, []);

    return (
        <section id="github" className="py-20 bg-neutral-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                        Open Source Contributions
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Building in public and contributing to the developer community
                    </p>
                </motion.div>

                {/* GitHub Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Github className="text-cyan-400" size={24} />
                            <h3 className="text-lg font-semibold text-white">Repositories</h3>
                        </div>
                        <p className="text-4xl font-bold text-cyan-400">{stats.repos}+</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Star className="text-yellow-400" size={24} />
                            <h3 className="text-lg font-semibold text-white">Total Stars</h3>
                        </div>
                        <p className="text-4xl font-bold text-yellow-400">{stats.stars}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Github className="text-purple-400" size={24} />
                            <h3 className="text-lg font-semibold text-white">Profile</h3>
                        </div>
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 text-lg font-semibold"
                        >
                            @{username} <ExternalLink size={18} />
                        </a>
                    </motion.div>
                </div>

                {/* Pinned Repositories */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo, index) => (
                        <motion.a
                            key={repo.name}
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-neutral-900/50 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <Github className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                                <ExternalLink className="text-neutral-500 group-hover:text-cyan-400 transition-colors" size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {repo.name}
                            </h3>
                            <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                                {repo.description || "No description available"}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                {repo.language && (
                                    <span className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full bg-cyan-400" />
                                        {repo.language}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Star size={14} /> {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GitFork size={14} /> {repo.forks_count}
                                </span>
                            </div>
                            {repo.topics && repo.topics.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {repo.topics.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.a>
                    ))}
                </div>

                {/* GitHub Contribution Graph Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-neutral-900/50 p-8 rounded-2xl border border-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-4">Contribution Activity</h3>
                    <img
                        src={`https://ghchart.rshah.org/${username}`}
                        alt="GitHub Contribution Chart"
                        className="w-full rounded-lg"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubStats;
