import MSVueLoader from './3D_loading_handler/MSVueLoader.vue'

const install = (app) => {
  app.component("registered-3dloader", MSVueLoader)
}

export default { install, MSVueLoader }

