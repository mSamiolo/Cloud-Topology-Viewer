import BasicScene from "./3D_graphics";

// sets up the scene
let scene = new BasicScene();
scene.initialize();

// loops updates
function scene_loop() {
  scene.camera.updateProjectionMatrix();
  scene.renderer.render(scene, scene.camera);
  scene.orbitals.update();
  requestAnimationFrame(scene_loop);
}

// runs a continuous loop
scene_loop();

// //selecting all required elements
// const dropArea = document.querySelector(".drag-area"),
//   dragText = dropArea.querySelector("header"),
//   button = dropArea.querySelector("button"),
//   input = dropArea.querySelector("input");

// button.onclick = () => {
//   input.click();
// };

// //If user Drag File Over DropArea
// dropArea.addEventListener("dragover", (event) => {
//   event.preventDefault(); //preventing from default behaviour
//   dropArea.classList.add("active");
//   dragText.textContent = "Release to Upload File";
// });
// //If user leave dragged File from DropArea
// dropArea.addEventListener("dragleave", () => {
//   dropArea.classList.remove("active");
//   dragText.textContent = "Drag & Drop to Upload File";
// });


