import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

const Model3D = () => {
    const modelRef = useRef<THREE.Group>(null);

    // Load the 3D model
    const { scene } = useGLTF("/model.glb");

    // Clone the scene
    const clonedScene = scene.clone();

    // Smooth idle animation
    useFrame((state) => {
        if (modelRef.current) {
            // Gentle breathing effect
            const breathe = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
            modelRef.current.position.y = breathe;

            // Subtle auto-rotation
            modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
        }
    });

    return (
        <group ref={modelRef} position={[0, -0.8, 0]} rotation={[0, Math.PI, 0]}>
            <primitive
                object={clonedScene}
                scale={2.2}
            />
        </group>
    );
};

const LoadingSpinner = () => (
    <Html center>
        <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyan-400 text-base font-semibold tracking-wide">Loading Model...</p>
        </div>
    </Html>
);

const Profile3D = () => {
    return (
        <div className="w-full h-full min-h-[450px] relative">
            <Canvas
                camera={{
                    position: [0, 0.1, 5],
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={<LoadingSpinner />}>
                    {/* Professional lighting setup */}
                    <ambientLight intensity={0.5} />

                    <directionalLight
                        position={[5, 8, 5]}
                        intensity={2}
                    />

                    <directionalLight
                        position={[-3, 3, -3]}
                        intensity={0.8}
                    />

                    <pointLight
                        position={[0, 2, -5]}
                        intensity={1.5}
                        color="#00ffff"
                    />

                    <spotLight
                        position={[3, 5, 0]}
                        angle={0.4}
                        penumbra={1}
                        intensity={1.2}
                    />

                    {/* Environment for realistic reflections */}
                    <Environment preset="city" environmentIntensity={0.6} />

                    {/* The 3D Model */}
                    <Model3D />

                    {/* Interactive controls */}
                    <OrbitControls
                        enableZoom={true}
                        minDistance={3.5}
                        maxDistance={9}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 4}
                        enableDamping={true}
                        dampingFactor={0.08}
                        rotateSpeed={0.5}
                        target={[0, 0, 0]}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

// Preload the model
useGLTF.preload("/model.glb");

export default Profile3D;
