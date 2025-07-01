<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['model-loaded']);

const emit_mesh_URL = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  emit('model-loaded', fileURL); // Emit only the "path"
  console.log("mesh path emitted:", fileURL);
};
</script>

<template>
<label class="upload-button">
  Input 📁
  <input type="file" @change="emit_mesh_URL" accept=".stl" class="hidden" />
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
