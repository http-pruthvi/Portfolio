import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';

// Loading fallback component
const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
    <div className="text-white/50 text-sm">Loading 3D scene...</div>
  </div>
);

const Scene3D = ({ 
  enableParticles = true, 
  enableGeometry = true, 
  enableControls = false,
  className = "absolute inset-0 -z-10",
  performance = 'auto' // 'high', 'medium', 'low', 'auto'
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState(performance);

  useEffect(() => {
    // Check device capabilities and user preferences
    const checkPerformance = () => {
      const hasReducedMotion = typeof window !== 'undefined' && window.matchMedia 
        ? window.matchMedia('(prefers-reduced-motion: reduce)')?.matches || false
        : false;
      
      if (hasReducedMotion) {
        setShouldRender(false);
        return;
      }

      if (performance === 'auto') {
        const isMobile = typeof navigator !== 'undefined' 
          ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          : false;
        
        if (isMobile) {
          setPerformanceLevel('low');
        } else {
          setPerformanceLevel('medium');
        }
      }

      setShouldRender(true);
    };

    // Reduced delay for faster 3D scene loading
    const timer = setTimeout(checkPerformance, 500);
    
    return () => clearTimeout(timer);
  }, [performance]);

  if (!shouldRender) {
    return null;
  }

  // Adjust settings based on performance level
  const getSceneSettings = () => {
    switch (performanceLevel) {
      case 'high':
        return {
          particleCount: 1500,
          geometryCount: 6,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          antialias: true
        };
      case 'medium':
        return {
          particleCount: 800,
          geometryCount: 4,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5),
          antialias: true
        };
      case 'low':
        return {
          particleCount: 400,
          geometryCount: 2,
          pixelRatio: 1,
          antialias: false
        };
      default:
        return {
          particleCount: 800,
          geometryCount: 4,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5),
          antialias: true
        };
    }
  };

  const settings = getSceneSettings();

  return (
    <div className={className}>
      <Canvas
        dpr={settings.pixelRatio}
        gl={{ 
          antialias: settings.antialias,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 10], fov: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
          
          {/* Environment for reflections */}
          <Environment preset="night" />
          
          {/* Particle field */}
          {enableParticles && (
            <ParticleField 
              count={settings.particleCount} 
              color="#3b82f6" 
            />
          )}
          
          {/* Floating geometry */}
          {enableGeometry && (
            <>
              <FloatingGeometry 
                position={[-4, 2, -2]} 
                color="#3b82f6" 
                geometry="sphere" 
                scale={0.8} 
              />
              <FloatingGeometry 
                position={[4, -2, -3]} 
                color="#8b5cf6" 
                geometry="octahedron" 
                scale={0.6} 
              />
              <FloatingGeometry 
                position={[2, 3, -4]} 
                color="#06b6d4" 
                geometry="torus" 
                scale={0.5} 
              />
              {settings.geometryCount > 3 && (
                <>
                  <FloatingGeometry 
                    position={[-3, -3, -2]} 
                    color="#10b981" 
                    geometry="tetrahedron" 
                    scale={0.7} 
                  />
                  {settings.geometryCount > 4 && (
                    <>
                      <FloatingGeometry 
                        position={[0, -4, -5]} 
                        color="#f59e0b" 
                        geometry="box" 
                        scale={0.4} 
                      />
                      {settings.geometryCount > 5 && (
                        <FloatingGeometry 
                          position={[-2, 4, -3]} 
                          color="#ef4444" 
                          geometry="sphere" 
                          scale={0.3} 
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          
          {/* Controls (optional) */}
          {enableControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;