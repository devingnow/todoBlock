import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { LegacyRef, RefAttributes, RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Camera = ({ clickScreenY, moveScreenY }: { clickScreenY: number, moveScreenY: number }) => {
    const [position, setPosition] = useState(10);
    const [lastScreen, setLastScreen] = useState(clickScreenY);
    const { camera } = useThree(); 

    camera.rotation.set(THREE.MathUtils.degToRad(-26.5), THREE.MathUtils.degToRad(42), THREE.MathUtils.degToRad(18.5));
    useEffect(() => {
        lastScreen > moveScreenY ? setPosition(position - 0.15) : setPosition(position + 0.15);

        setLastScreen(moveScreenY);
    }, [moveScreenY])
   
    return (
        <OrthographicCamera
            makeDefault
            zoom={30}
            far={1000}
            position={[20, position, 20]}
        />
    );
}

export default Camera;