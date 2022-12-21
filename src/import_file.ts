import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function put_in_scope_external_geom_input(scene: THREE.Scene) {
  // Upload and read the document
  document.getElementById("fileInput").addEventListener("change", (event) => {
    var file = (event.target as HTMLInputElement).files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      // console.log(fileReader.result);
      const objLoader = new OBJLoader();
      const new_group = objLoader.parse(fileReader.result as string);
      new_group.position.y = 0.8;
      scene.add(new_group);
    };

    fileReader.onerror = () => {
      console.error(fileReader.error);
    };

    fileReader.readAsText(file);
  });
}