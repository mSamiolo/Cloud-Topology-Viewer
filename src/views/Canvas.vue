<script setup>
import Uploader from '../components/Uploader.vue'
import { ref } from 'vue'

const mesh_url = ref('')

function handleModelLoaded(mesh_uploaded) {
    console.log("[parent] handleModelLoaded called with:", mesh_uploaded);
    mesh_url.value = mesh_uploaded
}
</script>

<template>
  <Uploader @model-loaded="handleModelLoaded" />
  <registered-3dloader :mesh="mesh_url" />
</template>
