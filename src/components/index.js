import ToolsBar from './ToolsBar'
import TagBar from './TagBar'
import UpdateExcel from './UpdateExcel'
import ImageLoad from './ImageLoad'
import ScreenFull from './ScreenFull'

export default {
  install(Vue) {
    Vue.component('ToolsBar', ToolsBar)
    Vue.component('TagBar', TagBar)
    Vue.component('UpdateExcel', UpdateExcel)
    Vue.component('ImageLoad', ImageLoad)
    Vue.component('ScreenFull', ScreenFull)
  }
}
