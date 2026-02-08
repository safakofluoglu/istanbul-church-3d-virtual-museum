import { useRef, useEffect, memo } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface PanoramaSceneProps {
    imageUrl: string;
    children?: ReactNode;
}

const PanoSphere = memo(({ imageUrl }: { imageUrl: string }) => {
    const texture = useTexture(imageUrl);
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.needsUpdate = true;
        }
    }, [texture]);

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
                transparent={false}
            />
        </mesh>
    );
});

PanoSphere.displayName = 'PanoSphere';

const SceneContent = memo(({ imageUrl, children }: { imageUrl: string; children?: ReactNode }) => {
    const { camera, gl } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, 0.1);

        // Cleanup textures on unmount
        return () => {
            gl.dispose();
        };
    }, [camera, gl]);

    return (
        <>
            <PanoSphere imageUrl={imageUrl} />
            {children}
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={-0.5}
                zoomSpeed={0.5}
                minDistance={0.1}
                maxDistance={100}
            />
        </>
    );
});

SceneContent.displayName = 'SceneContent';

export default function PanoramaScene({ imageUrl, children }: PanoramaSceneProps) {
    return (
        <div className="w-full h-full bg-neutral-900">
            <Canvas
                camera={{ fov: 75 }}
                gl={{
                    antialias: true,
                    toneMapping: THREE.NoToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
            >
                <SceneContent imageUrl={imageUrl}>
                    {children}
                </SceneContent>
            </Canvas>
        </div>
    );
}
