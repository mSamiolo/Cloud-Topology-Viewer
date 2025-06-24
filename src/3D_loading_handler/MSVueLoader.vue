<template>
  <div id="scene-container" ref="container" class="absolute top-0 left-0 w-full h-full"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { themeColorWhite } from '../app_config.js'
import { create_grid } from '../grid_handler/init.js'

const container = ref(null)

let renderer, scene, camera, controls

function init() {
  const width = window.innerWidth
  const height = window.innerHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(themeColorWhite)

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
  camera.position.set(10, 10, 10)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  // ✅ Append canvas to DOM
  container.value.appendChild(renderer.domElement)

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()

  // Ambient Light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
  scene.add(ambientLight)

  create_grid(scene)

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.render(scene, camera)
  }

  controls.addEventListener('change', render)
  window.addEventListener('resize', onWindowResize)
  render()
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(init)

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  renderer.dispose()
})
</script>

<style scoped>
</style>
