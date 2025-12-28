

import GlitchText from "./GlitchText";

const CyberOverlay = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Top Left Bracket */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gaming opacity-50 rounded-tl-lg" />
            <div className="absolute top-4 left-4 w-4 h-4 bg-gaming opacity-20 blur-[2px]" />

            {/* Top Right Bracket */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gaming opacity-50 rounded-tr-lg" />
            <div className="absolute top-4 right-16 w-32 h-[1px] bg-gradient-to-l from-gaming to-transparent opacity-30" />

            {/* Bottom Left Bracket */}
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gaming opacity-50 rounded-bl-lg" />
            <div className="absolute bottom-4 left-16 w-32 h-[1px] bg-gradient-to-r from-gaming to-transparent opacity-30" />

            {/* Bottom Right Bracket */}
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gaming-accent opacity-50 rounded-br-lg" />

            {/* Center Crosshair (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/10 rounded-full" />

            {/* Vertical Lines */}
            <div className="absolute top-0 left-12 w-[1px] h-32 bg-gradient-to-b from-gaming to-transparent opacity-20" />
            <div className="absolute bottom-0 right-12 w-[1px] h-32 bg-gradient-to-t from-gaming-accent to-transparent opacity-20" />

            {/* Scanlines Effect - CSS Version */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px, #000 3px)',
                    backgroundSize: '100% 4px'
                }}
            />

            {/* Status Text HUD */}
            <div className="absolute bottom-8 right-24 font-gaming text-gaming/60 text-xs tracking-widest hidden md:block">
                <GlitchText text="SYSTEM: ONLINE" speed={5000} />
                <br />
                V.2.0.4 [OPTIMIZED]
            </div>

            <div className="absolute top-8 left-24 font-gaming text-gaming/40 text-xs tracking-[0.2em] hidden md:block">
                <GlitchText text="CONNECTING..." speed={3000} />
            </div>
        </div>
    );
};

export default CyberOverlay;
