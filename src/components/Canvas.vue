<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { themeColor, themeColorWhite, themeColorLille } from '../app_config.js'
import { create_grid } from '../grid_handler/init.js'
import { fadeDistance, opacity } from '../app_config.js'
import Uploader from './Uploader.vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'three';

const fov  = 75;
const near = 0.1;
const far  = 5000;

const canvas   = ref(null);

let renderer, scene, camera, controls, width, height;

const initThreeJS = () => {
    
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(themeColorWhite);

    // Camera setup - fix aspect ratio calculation
    let aspect       = width / height;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas.value,
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Controls setup
    controls = new OrbitControls(camera, canvas.value);
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
 
    create_grid(scene);
    
    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
    }
    
    controls.addEventListener('change', render);
    window.addEventListener('resize', handleResize);
    render();

};

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    
    return needResize;
}

// const handleResize = () => {
//     width = window.innerWidth;
//     height = window.innerHeight;
    
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//     renderer.setSize(width, height);
// };

// const updateGrid = () => {
//     // Remove old grid first
//     const existingGrid = scene.getObjectByName('grid');
//     if (existingGrid) {
//         scene.remove(existingGrid);
//     }
//     create_grid(scene);
// };

// Cleanup on component unmount
onUnmounted(() => {
    if (controls) {
        controls.dispose();
    }
    if (renderer) {
        renderer.dispose();
    }
    // window.removeEventListener('resize', handleResize);
});

onMounted(() => {
    initThreeJS();
    console.log('mounted')
});
</script>

<template>
  <div class="relative w-full h-full">
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
  </div>
</template>


<style scoped>
</style>
