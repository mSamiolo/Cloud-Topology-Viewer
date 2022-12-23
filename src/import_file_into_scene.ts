import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function put_in_scope_external_geom_input(scene: THREE.Scene) {

  // Upload and read geometries via button 
  document.getElementById("fileInput").addEventListener("change", (event) => {
    const file_list: FileList = (event.target as HTMLInputElement).files;

    Array.from(file_list).forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const objLoader = new OBJLoader();
        const new_group: THREE.Group = objLoader.parse(fileReader.result as string);
        new_group.position.y = 0.8;

        new_group.traverse((object: THREE.Object3D) => {

          if (object instanceof THREE.Mesh) {
            object.material.color.set(0xff9900); 
          }
        });      

        scene.add(new_group);
      };

      fileReader.onerror = () => {
        console.error(fileReader.error);
      };

      fileReader.readAsText(file);
    });
  });

  // // Upload and read geometries via drop File on DropArea
  // document.querySelector(".drag-area").addEventListener("drop", (event) => {
  //   event.preventDefault();
  //   const file_list = (event.target as HTMLInputElement).files;
  //   Array.from(file_list).forEach((file) => {
      
  //     const fileReader = new FileReader();

  //     fileReader.onload = () => {
  //       const objLoader = new OBJLoader();
  //       const new_group = objLoader.parse(fileReader.result as string);
  //       new_group.position.y = 0.8;
  //       scene.add(new_group);
  //     };

  //     fileReader.onerror = () => {
  //       console.error(fileReader.error);
  //     };

  //     fileReader.readAsText(file);
  //   });
  // });
}



