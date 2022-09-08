import ToolsBar from './ToolsBar'
import TagBar from './TagBar'
import UpdateExcel from './UpdateExcel'

export default {
  install(Vue) {
    Vue.component('ToolsBar', ToolsBar)
    Vue.component('TagBar', TagBar)
    Vue.component('UpdateExcel', UpdateExcel)
  }
}
