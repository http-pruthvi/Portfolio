import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpine } from "./SpineContext";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// --- Reusable Materials ---
const useBoneMaterial = () => useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f5f5f0", // Calcium white/off-white
    roughness: 0.6,   // Matte bone texture
    metalness: 0.0,
}), []);

const useDiscMaterial = () => useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#e0f7fa", // Whitish-blue cartilage
    roughness: 0.4,
    metalness: 0.1,
    transmission: 0.2, // Slight subsurface/translucency effect
    thickness: 0.5,
    ior: 1.5,
}), []);

// --- SKELETAL COMPONENTS ---

const Vertebra = ({ position, rotation = [0, 0, 0], scale = 1 }: { position: [number, number, number], rotation?: [number, number, number], scale?: number }) => {
    const material = useBoneMaterial();
    const s = scale * 0.4; // Global scale down to ~0.7 unit to match real world meters

    return (
        <group position={position} rotation={rotation as any}> {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
            {/* Vertebral Body (Centrum) */}
            <mesh material={material} position={[0, 0, 0.02 * s]}>
                <cylinderGeometry args={[0.045 * s, 0.045 * s, 0.05 * s, 24]} />
            </mesh>

            {/* Neural Arch */}
            <mesh material={material} position={[0, 0, -0.015 * s]}>
                <torusGeometry args={[0.03 * s, 0.01 * s, 12, 24, Math.PI * 1.3]} />
            </mesh>

            {/* Spinous Process */}
            <mesh material={material} position={[0, -0.015 * s, -0.07 * s]} rotation={[-Math.PI / 2.8, 0, 0]}>
                <coneGeometry args={[0.01 * s, 0.06 * s, 12]} />
            </mesh>

            {/* Transverse Processes */}
            <mesh material={material} position={[0.05 * s, 0, -0.01 * s]} rotation={[0, 0, -Math.PI / 2.5]}>
                <coneGeometry args={[0.008 * s, 0.06 * s, 12]} />
            </mesh>
            <mesh material={material} position={[-0.05 * s, 0, -0.01 * s]} rotation={[0, 0, Math.PI / 2.5]}>
                <coneGeometry args={[0.008 * s, 0.06 * s, 12]} />
            </mesh>

            {/* Articular Facets (Upper) */}
            <mesh material={material} position={[0.02 * s, 0.035 * s, -0.025 * s]} rotation={[0.5, 0, 0]}>
                <cylinderGeometry args={[0.012 * s, 0.012 * s, 0.01 * s, 8]} />
            </mesh>
            <mesh material={material} position={[-0.02 * s, 0.035 * s, -0.025 * s]} rotation={[0.5, 0, 0]}>
                <cylinderGeometry args={[0.012 * s, 0.012 * s, 0.01 * s, 8]} />
            </mesh>
        </group>
    );
};

const IntervertebralDisc = ({ position, rotation = [0, 0, 0], scale = 1 }: { position: [number, number, number], rotation?: [number, number, number], scale?: number }) => {
    const material = useDiscMaterial();
    const s = scale * 0.4;
    return (
        <group position={position} rotation={rotation as any}> {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
            <mesh material={material} position={[0, 0, 0.02 * s]}>
                <cylinderGeometry args={[0.046 * s, 0.046 * s, 0.015 * s, 24]} />
            </mesh>
        </group>
    )
}

const SpineColumn = () => {
    // 24 Mobile Vertebrae: 7 Cervical, 12 Thoracic, 5 Lumbar
    const parts = [];
    const count = 24;
    // Total physical length should be approx 0.7 units (70cm)
    // 0.7 / 24 ~ 0.03 spacing

    for (let i = 0; i < count; i++) {
        // Normalized index 0 to 1
        const t = i / (count - 1);

        // Anatomical S-Curve Calculations (Cervical Lordosis, Thoracic Kyphosis, Lumbar Lordosis)
        // Y Position: Spaced to form column
        const y = 0.35 - (i * 0.03); // Starts at +0.35 -> Ends approx -0.35

        // Z curve (S-shape depth) reduced amplitude
        const z = 0;

        // Rotation (Tilt)
        const rotX = 0;

        // Progressive Scaling (Cervical < Thoracic < Lumbar)
        const baseScale = 1.0;
        const scale = baseScale + (t * 0.8);

        // Add Vertebra
        parts.push(
            <Vertebra
                key={`vert-${i}`}
                position={[0, y, z]}
                rotation={[rotX, 0, 0]}
                scale={scale}
            />
        );

        // Add Disc below (except last)
        if (i < count - 1) {
            const nextY = 0.35 - ((i + 1) * 0.03);
            const nextZ = 0;
            const nextRotX = 0;

            // Interpolate pos/rot for disc
            const discY = (y + nextY) * 0.5;
            const discZ = (z + nextZ) * 0.5;
            const discRotX = (rotX + nextRotX) * 0.5;

            parts.push(
                <IntervertebralDisc
                    key={`disc-${i}`}
                    position={[0, discY, discZ]}
                    rotation={[discRotX, 0, 0]}
                    scale={scale}
                />
            )
        }
    }

    // Sacrum Base Removed

    return <group>{parts}</group>;
};

const Spine3D = () => {
    const { rotation, progress } = useSpine();
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Smooth Rotation
            // Rotation from context is already in radians (approx 0 to 28rad over full scroll)
            const targetRotationY = rotation;

            // Auto-rotate slight idle
            const idleRotation = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetRotationY + idleRotation,
                0.1
            );

            // Breathing Animation
            groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02; // Reduced breathing for stability

            // --- REAL TRAVERSAL ---
            // Model height is ~0.8 units (+0.35 to -0.45)
            // Screen is looking at 0.
            // Start: Look at C1 (top) -> Offset Y = -0.35
            // End: Look at Sacrum (bot) -> Offset Y = +0.45

            const startY = -0.35;
            const endY = 0.45;

            // Linear interpolation based on scroll progress
            const targetY = THREE.MathUtils.lerp(startY, endY, progress);

            groupRef.current.position.y = THREE.MathUtils.lerp(
                groupRef.current.position.y,
                targetY,
                0.1
            );
        }
    });

    return (
        <group ref={groupRef} scale={[2.5, 2.5, 2.5]}> {/* Reset Scale, we bake it in */}
            <Float
                speed={1.0}
                rotationIntensity={0.1}
                floatIntensity={0.0}
                floatingRange={[0, 0]}
            >
                {/* Only Spine */}
                <SpineColumn />
            </Float>

            {/* Dramatic Lighting - Adjusted for new scale */}
            <ambientLight intensity={0.4} color="#fff1e6" /> {/* Warm ambient */}
            <pointLight position={[2, 2, 2]} intensity={1.5} color="#fff" distance={5} />
            <pointLight position={[-2, -2, 2]} intensity={0.5} color="#e6f7ff" distance={5} />
            {/* Key Light */}
            <spotLight
                position={[0, 3, 2]}
                angle={0.6}
                penumbra={0.5}
                intensity={3}
                color="#fff"
                castShadow
            />
            {/* Rim light for edge definition */}
            <spotLight position={[0, 1, -2]} intensity={3} color="#00ffff" angle={1} penumbra={1} />
        </group>
    );
};

export default Spine3D;
