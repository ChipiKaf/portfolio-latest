import { useThree, extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomPhysicalMaterial, {
  uniforms,
} from "./custom/materials/CustomPhysicalMaterial";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import vertexShader from "./shaders/wobble/vertex.glsl";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { createControlConfig } from "./utils/objectUtils";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import gsap from "gsap";
import useMouse from "./hooks/useMouse";
import useCanvas from "./hooks/useCanvas";

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
  const { getCursorDistance, camCursor, screenCursor } = useMouse();
  const initialCamPosition = useRef(new THREE.Vector3(9999, 9999, 9999));
  const canvas = useCanvas();
  // #region controls
  // const controlsMaterial = useControls("Material", {
  //   metalness: {
  //     value: 0.60,
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //   },
  //   roughness: {
  //     value: 1.0,
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //   },
  //   transmission: {
  //     value: 0,
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //   },
  //   ior: {
  //     value: 1.5,
  //     min: 0,
  //     max: 10,
  //     step: 0.001,
  //   },
  //   thickness: {
  //     value: 1.5,
  //     min: 0,
  //     max: 10,
  //     step: 0.001,
  //   },
  // });
  // const controlsUniform = useControls(
  //   "Uniform",
  //   createControlConfig(uniforms, ["uCursorDistance"])
  // );

  // useEffect(() => {
  //   Object.entries(controlsUniform).forEach(([key, value]) => {
  //     if (key.toLowerCase().includes("color")) {
  //       material.current.uniforms[key].value.set(value);
  //       depthMaterial.uniforms[key].value.set(value);
  //     } else {
  //       material.current.uniforms[key].value = value;
  //       depthMaterial.uniforms[key].value = value;
  //     }
  //   });
  // }, [controlsUniform]);
  // #endregion

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

  //
  useFrame((state) => {
    const { elapsedTime } = state.clock;

    state.raycaster.setFromCamera(screenCursor.current, state.camera);
    const intersection = state.raycaster.intersectObject(wobble.current);
    if (intersection.length) {
      // console.log(intersection[0])
    }
    if (!isAnimating.current) {
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

    // material.current.uniforms.uCursorDistance.value = getCursorDistance();
    // depthMaterial.uniforms.uCursorDistance.value = getCursorDistance();
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
        castShadow={true}
        customDepthMaterial={depthMaterial}
      >
        {/* <customPhysicalMaterial
          ref={material}
          metalness={controlsMaterial.metalness}
          roughness={controlsMaterial.roughness}
          color={controlsMaterial.color}
          transmission={controlsMaterial.transmission}
          ior={controlsMaterial.ior}
          thickness={controlsMaterial.thickness}
          transparent={true}
          wireframe={false}
        /> */}

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
