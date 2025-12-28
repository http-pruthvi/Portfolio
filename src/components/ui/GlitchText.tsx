import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    speed?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", speed = 3000 }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);

            // Randomize next glitch
            const nextGlitch = Math.random() * speed + (speed / 2);
            setTimeout(triggerGlitch, nextGlitch);
        };

        const timer = setTimeout(triggerGlitch, speed);
        return () => clearTimeout(timer);
    }, [speed]);

    return (
        <div className={`relative inline-block ${className}`}>
            <span className={isGlitching ? "opacity-0" : "opacity-100"}>{text}</span>

            {isGlitching && (
                <>
                    <span
                        className="absolute top-0 left-0 -ml-[2px] text-gaming opacity-70 animate-pulse"
                        style={{ clipPath: 'inset(0 0 60% 0)' }}
                    >
                        {text}
                    </span>
                    <span
                        className="absolute top-0 left-0 ml-[2px] text-gaming-accent opacity-70 animate-pulse delay-75"
                        style={{ clipPath: 'inset(40% 0 0 0)' }}
                    >
                        {text}
                    </span>
                    <span
                        className="absolute top-0 left-0 -ml-[1px] translate-y-[-1px] text-white opacity-50"
                    >
                        {text}
                    </span>
                </>
            )}
        </div>
    );
};

export default GlitchText;
