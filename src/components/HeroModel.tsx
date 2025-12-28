import { Canvas } from "@react-three/fiber";
import { useGLTF, Float, Environment, Center, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Html } from "@react-three/drei";
import { Atom, Database, Brain, Code2, Cpu, Globe } from "lucide-react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Electron = ({ radius = 1.2, speed = 1, angle = 0, rotation = [0, 0, 0], children }: { radius?: number; speed?: number; angle?: number; rotation?: [number, number, number]; children: React.ReactNode }) => {
    const groupRef = useRef<THREE.Group>(null);
    const iconRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!iconRef.current) return;
        const t = state.clock.getElapsedTime() * speed + angle;
        // Elliptical motion on the local X-Y plane of the rotated group
        iconRef.current.position.x = Math.cos(t) * radius;
        iconRef.current.position.y = Math.sin(t) * radius * 0.4; // Flatten y to make it elliptical
        iconRef.current.position.z = 0;
    });

    return (
        <group rotation={rotation} ref={groupRef}>
            <group ref={iconRef}>
                <Html transform>
                    {children}
                </Html>
            </group>
        </group>
    );
};

const FloatingIcons = () => {
    return (
        <>
            {/* Pair 1: Horizontal Orbit (0 deg) */}
            <Electron radius={2.5} speed={0.8} angle={0} rotation={[0, 0, 0]}>
                <div className="bg-black/50 p-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
                    <Atom className="w-3 h-3 text-cyan-400" />
                </div>
            </Electron>
            <Electron radius={2.5} speed={0.8} angle={Math.PI} rotation={[0, 0, 0]}>
                <div className="bg-black/50 p-1 rounded-full border border-yellow-500/30 backdrop-blur-md">
                    <Database className="w-3 h-3 text-yellow-400" />
                </div>
            </Electron>

            {/* Pair 2: 60 deg Orbit */}
            <Electron radius={2.5} speed={0.8} angle={0} rotation={[0, 0, Math.PI / 3]}>
                <div className="bg-black/50 p-1 rounded-full border border-purple-500/30 backdrop-blur-md">
                    <Brain className="w-3 h-3 text-purple-400" />
                </div>
            </Electron>
            <Electron radius={2.5} speed={0.8} angle={Math.PI} rotation={[0, 0, Math.PI / 3]}>
                <div className="bg-black/50 p-1 rounded-full border border-green-500/30 backdrop-blur-md">
                    <Code2 className="w-3 h-3 text-green-400" />
                </div>
            </Electron>

            {/* Pair 3: -60 deg Orbit */}
            <Electron radius={2.5} speed={0.8} angle={0} rotation={[0, 0, -Math.PI / 3]}>
                <div className="bg-black/50 p-1 rounded-full border border-blue-500/30 backdrop-blur-md">
                    <Cpu className="w-3 h-3 text-blue-400" />
                </div>
            </Electron>
            <Electron radius={2.5} speed={0.8} angle={Math.PI} rotation={[0, 0, -Math.PI / 3]}>
                <div className="bg-black/50 p-1 rounded-full border border-pink-500/30 backdrop-blur-md">
                    <Globe className="w-3 h-3 text-pink-400" />
                </div>
            </Electron>
        </>
    );
};

const Model = () => {
    const { scene } = useGLTF("/model.glb");
    return (
        <Center>
            {/* Adjusted rotation to face front by default if model is side-on. 
                Common GLTF issue is model facing +Z or -Z. 
                OrbitControls let user rotate it manually. */}
            <primitive object={scene} scale={3.0} rotation={[0, -1.57, 0]} />
        </Center>
    );
}

const HeroModel = () => {
    return (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={1} />
                <Suspense fallback={null}>
                    <group position={[0, 1.5, 0]}>
                        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
                            <Model />
                        </Float>
                        <FloatingIcons />
                    </group>
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}

// Preload
useGLTF.preload("/model.glb");

export default HeroModel;
