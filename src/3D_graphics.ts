import * as THREE from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import put_in_scope_external_geom_input from "./import_file_into_scene";

/**
 * A class to set up some basic scene elements to minimize code in the
 * main execution file.
 */
export default class BasicScene extends THREE.Scene {
  // A dat.gui class debugger that is added by default
  debugger: GUI = null;

  // Setups a scene camera
  camera: THREE.PerspectiveCamera = null;

  // setup renderer
  renderer: THREE.Renderer = null;

  // setup Orbitals
  orbitals: OrbitControls = null;

  // Holds the lights for easy reference
  lights: Array<THREE.Light> = [];

  // Number of PointLight objects around origin
  lightCount: number = 2;

  // Distance above ground place
  lightDistance: number = 3;

  // Get some basic params
  graphic_app_canvas = document.getElementById("graphic-app") as HTMLCanvasElement;

  /**
   * Initializes the scene by adding lights, and the geometry
   */
  initialize(debug: boolean = true, addGridHelper: boolean = true) {
    // setup camera
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.graphic_app_canvas.width / this.graphic_app_canvas.height,
      0.1,
      1000
    );
    this.camera.position.z = 12;
    this.camera.position.y = 12;
    this.camera.position.x = 12;

    // setup renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.graphic_app_canvas,
      alpha: true,
    });
    this.renderer.setSize(
      this.graphic_app_canvas.width,
      this.graphic_app_canvas.height
    );

    // add window resizing
    BasicScene.addWindowResizing(this.camera, this.renderer);

    // sets up the camera's orbital controls
    this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);

    // Adds an origin-centered grid for visual reference
    if (addGridHelper) {
      this.add(new THREE.GridHelper(10, 10, "red"));
      this.add(new THREE.AxesHelper(3));
    }

    // set the background color
    this.background = new THREE.Color(0xefefef);

    // create the lights
    for (let i = 0; i < this.lightCount; i++) {
      // Positions evenly in a circle pointed at the origin
      const light = new THREE.PointLight(0xffffff, 1);
      let lightX =
        this.lightDistance * Math.sin(((Math.PI * 2) / this.lightCount) * i);
      let lightZ =
        this.lightDistance * Math.cos(((Math.PI * 2) / this.lightCount) * i);

      // Create a light
      light.position.set(lightX, this.lightDistance, lightZ);
      light.lookAt(0, 0, 0);
      this.add(light);
      this.lights.push(light);
    }

    put_in_scope_external_geom_input(this);
    this.scale;

    // setup Debugger
    if (debug) {
      this.debugger = new GUI();

      // Debug group with all lights in it.
      const lightGroup = this.debugger.addFolder("Lights");
      for (let i = 0; i < this.lights.length; i++) {
        lightGroup.add(this.lights[i], "visible", true);
      }
      lightGroup.open();
    }
  }

  /**
   * Given a ThreeJS camera and renderer, resizes the scene if the
   * browser window is resized.
   * @param camera - a ThreeJS PerspectiveCamera object.
   * @param renderer - a subclass of a ThreeJS Renderer object.
   */

  static addWindowResizing(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.Renderer
  ) {
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      // uses the global window widths and height
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
