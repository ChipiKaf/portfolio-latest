import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import * as THREE from 'three'

import vertexShader from '../../shaders/wobble/vertex.glsl';
import fragmentShader from '../../shaders/wobble/fragment.glsl';

export const uniforms = {
    uTime: new THREE.Uniform(0),
    uPositionFrequency: new THREE.Uniform(0.22),
    uTimeFrequency: new THREE.Uniform(0.4),
    uStrength: new THREE.Uniform(0.3),
    uCursorDistance: new THREE.Uniform(1.0),

    uWarpPositionFrequency: new THREE.Uniform(0.38),
    uWarpTimeFrequency: new THREE.Uniform(0.12),
    uWarpStrength: new THREE.Uniform(1.7),

    uColorA: new THREE.Uniform(new THREE.Color("#CBD9C5")),
    uColorB: new THREE.Uniform(new THREE.Color("#E6F288"))
} 

class CustomPhysicalMaterial extends CustomShaderMaterial {
    constructor(parameters) {
        super({
            baseMaterial: THREE.MeshPhysicalMaterial,
            vertexShader,
            fragmentShader,
            uniforms,
            silent: true,
            ...parameters
        })
    }
}

export default CustomPhysicalMaterial;