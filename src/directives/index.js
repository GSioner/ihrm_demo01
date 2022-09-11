// 统一所有自定义指令文件
export const imgerror = {
  inserted(dom, data) {
    dom.src = dom.src || dom.value
    dom.onerror = () => {
      dom.src = data.value
    }
  },
  componentUpdate(dom, data) {
    dom.src = dom.src || dom.value
  }
}
