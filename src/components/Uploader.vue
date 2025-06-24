<script setup>
import * as THREE from 'three';
import { defineProps, ref } from 'vue';

const props = defineProps(['scene', 'camera', 'controls']);

// const props = defineProps({
//     scene: {
//         type: Object,
//         required: true
//     },
//     camera: {
//         type: Object,
//         required: true
//     },
//     controls: {
//         type: Object,
//         required: true
//     }
// });

// Define missing variables
const themeColorLille = 0x4a90e2;
let modelMesh = null;

function isBinarySTL(buffer) {
    const reader = new DataView(buffer);
    const triangleCount = reader.getUint32(80, true);
    const expectedLength = 84 + triangleCount * 50;
    return buffer.byteLength === expectedLength;
}

function parse(buffer) {
    const isBinary = isBinarySTL(buffer);
    return isBinary ? parseBinary(new DataView(buffer)) : parseASCII(new TextDecoder().decode(buffer));
}

function parseASCII(data) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const normals = [];
    
    const lines = data.split('\n');
    let normal = [0, 0, 1]; // default normal
    
    for (let line of lines) {
        line = line.trim();
        const parts = line.split(/\s+/);

        if (parts[0] === 'facet' && parts[1] === 'normal') {
            normal = [parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4])];
        } else if (parts[0] === 'vertex') {
            vertices.push(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            );
            normals.push(normal[0], normal[1], normal[2]);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    return geometry;
}


function parseBinary(view) {
    const geometry = new THREE.BufferGeometry();
    let offset = 80;

    const triangles = view.getUint32(offset, true);
    offset += 4;

    // const expectedLength = 84 + triangles * 50;
    // if (view.byteLength < expectedLength) {
    //     throw new Error('Incomplete binary STL file');
    // }

    
    const vertices = [];
    const normals = [];

    for (let i = 0; i < triangles; i++) {
        // Normals parsing
        const nx = view.getFloat32(offset, true); offset += 4;
        const ny = view.getFloat32(offset, true); offset += 4;
        const nz = view.getFloat32(offset, true); offset += 4;

        normals.push(nx, ny, nz);

        for (let j = 0; j < 3; j++) {
            
            const vx = view.getFloat32(offset, true); offset += 4;
            const vy = view.getFloat32(offset, true); offset += 4;
            const vz = view.getFloat32(offset, true); offset += 4;

            vertices.push(vx, vy, vz);
        }

        offset += 2; // skip attribute byte count
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    return geometry;
}


const loadSTL = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function (e) {
        try {
            const contents = e.target.result;
            const geometry = parse(contents);
            
            const material = new THREE.MeshStandardMaterial({
                color: themeColorLille,
                side: THREE.DoubleSide // Ensure both sides are visible
            });

            if (!props.scene || !props.camera || !props.controls) {
                console.error('Scene, camera, or controls not ready');
                return;
            }
            
            // // Dispose of old model to prevent memory leaks
            // if (modelMesh) {
            //     props.scene.remove(modelMesh);
            //     modelMesh.geometry.dispose();
            //     modelMesh.material.dispose();
            // }
            
            modelMesh = new THREE.Mesh(geometry, material);
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(modelMesh);
            const center = box.getCenter(new THREE.Vector3());
            modelMesh.position.sub(center);

            props.scene.add(modelMesh);
            
            // Auto-fit camera to model
            const size = box.getSize(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z);
            const distance = maxSize * 2;
            props.camera.position.set(distance, distance, distance);
            props.camera.lookAt(0, 0, 0);
            props.controls.update();
            
        } catch (error) {
            console.error('Error loading STL file:', error);
            alert('Error loading STL file. Please make sure it\'s a valid STL file.');
        }
    };
    
    reader.readAsArrayBuffer(file);
};
</script>

<template>
<label class="upload-button">
  📁
  <input type="file" @change="loadSTL" accept=".stl" class="hidden" />
</label>
</template>

<style scoped>
.upload-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    padding: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
}

.upload-button:hover {
    background-color: #f0f0f0;
    transform: translateX(-50%) scale(1.05);
}

.hidden {
    display: none;
}
</style>
