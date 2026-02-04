import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const FloatingGeometry = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const GlowingSphere = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere args={[0.5, 32, 32]} position={position}>
        <MeshDistortMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={0.3}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

const CyberTorus = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 100]} position={position}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.4}
          wireframe
        />
      </Torus>
    </Float>
  );
};

const TerminalBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={2}>
      <Box ref={meshRef} args={[2, 1.5, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0a1520"
          emissive="#00ff00"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[1.8, 1.3, 0.05]} position={[0, 0, 0.05]}>
        <meshStandardMaterial
          color="#001a00"
          emissive="#00ff00"
          emissiveIntensity={0.2}
        />
      </Box>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff00" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#ff00ff" />
        
        <TerminalBox />
        <FloatingGeometry position={[-4, 2, -2]} color="#00ff00" speed={0.8} />
        <FloatingGeometry position={[4, -2, -3]} color="#00ffff" speed={1.2} />
        <FloatingGeometry position={[-3, -2, -1]} color="#ff00ff" speed={0.6} />
        <GlowingSphere position={[3, 2, -2]} />
        <GlowingSphere position={[-2, 3, -4]} />
        <CyberTorus position={[5, 0, -5]} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
