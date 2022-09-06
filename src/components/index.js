import ToolsBar from './ToolsBar'
import TagBar from './TagBar'

export default {
  install(Vue) {
    Vue.component('ToolsBar', ToolsBar)
    Vue.component('TagBar', TagBar)
  }
}
