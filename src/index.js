import SceneManagement from './components/scene_management/SceneManagement.vue'

const install = (app) => {
  app.component("registered-3dloader", SceneManagement)
}

export default { install, SceneManagement }

