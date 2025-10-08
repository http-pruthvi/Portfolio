import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ProjectCard3D = ({ 
  position, 
  project, 
  isActive, 
  onClick,
  index 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
      
      // Rotation based on hover state
      const targetRotationY = hovered ? Math.PI * 0.1 : 0;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      
      // Scale based on active state
      const targetScale = isActive ? 1.1 : hovered ? 1.05 : 1;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      );
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Card background */}
        <RoundedBox
          args={[2.5, 1.5, 0.1]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial
            color={isActive ? '#3b82f6' : hovered ? '#1e40af' : '#1f2937'}
            transparent
            opacity={0.9}
            roughness={0.3}
            metalness={0.1}
          />
        </RoundedBox>
        
        {/* Project title */}
        <Text
          position={[0, 0.3, 0.06]}
          fontSize={0.15}
          color={isActive || hovered ? '#ffffff' : '#e5e7eb'}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          font="/fonts/inter-bold.woff"
        >
          {project.title}
        </Text>
        
        {/* Project category */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.08}
          color={isActive || hovered ? '#93c5fd' : '#9ca3af'}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {project.category}
        </Text>
        
        {/* Tech stack indicators */}
        {project.techStack.slice(0, 3).map((tech, techIndex) => (
          <RoundedBox
            key={tech}
            args={[0.4, 0.15, 0.02]}
            position={[-0.8 + techIndex * 0.8, -0.4, 0.06]}
            radius={0.02}
          >
            <meshStandardMaterial
              color={isActive || hovered ? '#60a5fa' : '#374151'}
              transparent
              opacity={0.8}
            />
          </RoundedBox>
        ))}
        
        {/* Hover glow effect */}
        {(hovered || isActive) && (
          <RoundedBox
            args={[2.6, 1.6, 0.05]}
            radius={0.12}
            position={[0, 0, -0.03]}
          >
            <meshStandardMaterial
              color="#3b82f6"
              transparent
              opacity={0.2}
              emissive="#3b82f6"
              emissiveIntensity={0.1}
            />
          </RoundedBox>
        )}
      </group>
    </Float>
  );
};

const ProjectShowcase3D = ({ 
  projects = [], 
  onProjectSelect,
  className = "h-96"
}) => {
  const [activeProject, setActiveProject] = useState(0);

  const handleProjectClick = (index) => {
    setActiveProject(index);
    if (onProjectSelect) {
      onProjectSelect(projects[index]);
    }
  };

  // Arrange projects in a circular layout
  const getProjectPosition = (index, total) => {
    const radius = 4;
    const angle = (index / total) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.3,
      Math.sin(angle) * -2
    ];
  };

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        
        {/* Project cards */}
        {projects.slice(0, 8).map((project, index) => (
          <ProjectCard3D
            key={project.id}
            position={getProjectPosition(index, Math.min(projects.length, 8))}
            project={project}
            isActive={index === activeProject}
            onClick={() => handleProjectClick(index)}
            index={index}
          />
        ))}
        
        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ProjectShowcase3D;