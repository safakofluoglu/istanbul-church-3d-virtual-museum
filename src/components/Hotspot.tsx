import { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface HotspotProps {
    position: { x: number; y: number; z: number };
    title: string;
    onClick: () => void;
}

const Hotspot = memo(({ position, title, onClick }: HotspotProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        if (meshRef.current) {
            // Billboard effect: Make the hotspot always face the camera
            meshRef.current.lookAt(camera.position);
        }
    });

    return (
        <group position={[position.x, position.y, position.z]}>
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent passing click to background
                    onClick();
                }}
                onPointerOver={() => {
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                scale={hovered ? 1.2 : 1}
            >
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial color={hovered ? 'white' : 'rgba(255, 255, 255, 0.8)'} side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>

            {hovered && (
                <Html position={[0, 0.3, 0]} center pointerEvents="none">
                    <div className="px-3 py-1 bg-neutral-900/90 text-white text-xs font-medium rounded shadow-lg backdrop-blur-sm whitespace-nowrap border border-white/20 select-none">
                        {title}
                    </div>
                </Html>
            )}
        </group>
    );
});

Hotspot.displayName = 'Hotspot';

export default Hotspot;
