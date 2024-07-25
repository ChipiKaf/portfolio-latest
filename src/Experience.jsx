import { useThree, extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomPhysicalMaterial, {
  uniforms,
} from "./custom/materials/CustomPhysicalMaterial";
import { useEffect, useMemo, useRef } from "react";
import vertexShader from "./shaders/wobble/vertex.glsl";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import gsap from "gsap";
import useMouse from "./hooks/useMouse";

extend({ OrbitControls, CustomPhysicalMaterial });

const materialDefaults = {
  metalness: 0.6,
  roughness: 1.0,
  transmission: 0,
  ior: 1.5,
  thickness: 1.5,
};

export default function Experience() {
  const material = useRef();
  const wobble = useRef();
  const isAnimating = useRef(false);
  const { getCursorDistance } = useMouse();
  const isClick = useRef(false);
  const mouseHoldCounts = useRef(0);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const handlePointerDown = () => {
      isMouseDown.current = true;
    };
    const handleClick = () => {
      isMouseDown.current = false;
      if (!isClick.current) {
        isClick.current = true;
        const newValue = Math.min(mouseHoldCounts.current * 10, .5);
        if (!material.current)
        gsap.fromTo(
          material.current.uniforms.uStrength,
          { value: material.current.uniforms.uStrength.value },
          {
            value: material.current.uniforms.uStrength.value + newValue,
            duration: 1,
            onUpdate: () => {
              depthMaterial.uniforms.uCursorDistance =
                material.current.uniforms.uCursorDistance.value;
            },
            onComplete: () => {
              gsap.fromTo(
                material.current.uniforms.uStrength,
                { value: material.current.uniforms.uStrength.value },
                {
                  value: material.current.uniforms.uStrength.value - newValue,
                  duration: 1,
                  onUpdate: () => {
                    depthMaterial.uniforms.uCursorDistance =
                      material.current.uniforms.uCursorDistance.value;
                  },
                  onComplete: () => {
                    isClick.current = false;
                    mouseHoldCounts.current = 0;
                  },
                }
              );
            },
          }
        );
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);

    window.addEventListener("pointerup", handleClick);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handleClick);
    
    }
  }, []);

  const mergedGeometry = useMemo(() => {
    const geometry = mergeVertices(new THREE.IcosahedronGeometry(2.5, 50));
    geometry.computeTangents(); // Needed for shader
    return geometry;
  }, []);

  const depthMaterial = useMemo(() => {
    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshDepthMaterial,
      vertexShader,
      silent: true,
      uniforms,

      depthPacking: THREE.RGBADepthPacking,
    });
  }, []);

  useEffect(() => {
    const dummyVar = {current: 0 }
    gsap.fromTo(dummyVar, { current: 0 }, {
      current: 1,
      duration: 1,
      ease: 'expo.out',
      onUpdate: (val) => {
        wobble.current.scale.set(dummyVar.current, dummyVar.current, dummyVar.current)
      }

    })
  }, [wobble])

  //
  useFrame((state, delta) => {
    const { elapsedTime } = state.clock;
    if (isMouseDown.current) {
      mouseHoldCounts.current += delta;
    }
    if (!isAnimating.current && !isClick.current) {
      gsap.fromTo(
        material.current.uniforms.uCursorDistance,
        { value: material.current.uniforms.uCursorDistance.value },
        {
          value: getCursorDistance(),
          duration:
            getCursorDistance() >
            material.current.uniforms.uCursorDistance.value
              ? 0.1
              : 0.5,
          ease:
            getCursorDistance() >
            material.current.uniforms.uCursorDistance.value
              ? "expo.in"
              : "linear",
          onUpdate: () => {
            isAnimating.current = true;
            depthMaterial.uniforms.uCursorDistance =
              material.current.uniforms.uCursorDistance.value;
          },
          onComplete: () => {
            isAnimating.current = false;
          },
        }
      );
    }

    material.current.uniforms.uTime.value = elapsedTime;
    depthMaterial.uniforms.uTime.value = elapsedTime;
  });

  return (
    <>
      <directionalLight
        args={["#ffffff", 15]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={15}
        shadow-normalBias={0.05}
        position={[0, 5, 10]}
      />
      <mesh
        ref={wobble}
        receiveShadow={true}
        position={[0, 1, 0]}
        castShadow={true}
        customDepthMaterial={depthMaterial}
      >

        <customPhysicalMaterial
          ref={material}
          metalness={materialDefaults.metalness}
          roughness={materialDefaults.roughness}
          color={materialDefaults.color}
          transmission={materialDefaults.transmission}
          ior={materialDefaults.ior}
          thickness={materialDefaults.thickness}
          transparent={true}
          wireframe={false}
        />
        <primitive object={mergedGeometry} attach={"geometry"} />
      </mesh>
    </>
  );
}
