import { motion } from "framer-motion";


const SkillRadar = () => {
    // Data Configuration
    const stats = [
        { label: "Frontend", value: 95 },
        { label: "Backend", value: 90 },
        { label: "DevOps", value: 80 },
        { label: "AI & ML", value: 85 },
        { label: "Mobile", value: 90 },
        { label: "Cloud", value: 75 },
    ];

    const numPoints = stats.length;
    const radius = 120; // Size of the chart
    const center = 150; // Center offset (SVG viewBox size / 2)

    // Calculate points for a polygon
    const getPoint = (index: number, value: number) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const r = (value / 100) * radius;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        return `${x},${y}`;
    };

    // Generate path data
    const pathData = stats.map((stat, i) => getPoint(i, stat.value)).join(" ");
    const fullPathData = stats.map((_, i) => getPoint(i, 100)).join(" ");
    const midPathData = stats.map((_, i) => getPoint(i, 50)).join(" ");

    return (
        <div className="flex flex-col items-center justify-center py-10 relative">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 tracking-wider">
                SKILL MATRIX_
            </h3>

            <div className="relative w-[300px] h-[300px] group cursor-crosshair">
                {/* SVG Chart */}
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                    {/* Background Web (100% and 50%) */}
                    <polygon points={fullPathData} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <polygon points={midPathData} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" strokeWidth="1" />

                    {/* Axis Lines */}
                    {stats.map((_, i) => (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={getPoint(i, 100).split(',')[0]}
                            y2={getPoint(i, 100).split(',')[1]}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Data Polygon */}
                    <motion.polygon
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        points={pathData}
                        fill="rgba(0, 243, 255, 0.2)"
                        stroke="#00f3ff"
                        strokeWidth="2"
                        className="group-hover:fill-cyan-500/30 transition-colors duration-300"
                    />

                    {/* Data Points */}
                    {stats.map((stat, i) => {
                        const [x, y] = getPoint(i, stat.value).split(',');
                        return (
                            <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="#fff"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group-hover:fill-cyan-400"
                            />
                        );
                    })}
                </svg>

                {/* Labels */}
                {stats.map((stat, i) => {
                    // Position labels slightly outside based on angle
                    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                    const labelRadius = radius + 30; // Push text out
                    const x = center + Math.cos(angle) * labelRadius;
                    const y = center + Math.sin(angle) * labelRadius;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            style={{
                                position: 'absolute',
                                left: x,
                                top: y,
                                transform: 'translate(-50%, -50%)',
                            }}
                            className="bg-black/80 text-cyan-200 text-xs px-2 py-1 rounded border border-cyan-900/50 backdrop-blur-sm font-mono whitespace-nowrap"
                        >
                            {stat.label} {stat.value}%
                        </motion.div>
                    );
                })}
            </div>

            <div className="absolute -bottom-6 text-xs text-center text-gray-500 font-mono">
                [SYSTEM STATUS: OPTIMAL]
            </div>
        </div>
    );
};

export default SkillRadar;
