import ToolsBar from './ToolsBar'
import TagBar from './TagBar'
import UpdateExcel from './UpdateExcel'
import ImageLoad from './ImageLoad'

export default {
  install(Vue) {
    Vue.component('ToolsBar', ToolsBar)
    Vue.component('TagBar', TagBar)
    Vue.component('UpdateExcel', UpdateExcel)
    Vue.component('ImageLoad', ImageLoad)
  }
}
