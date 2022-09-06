// 统一所有自定义指令文件
export const imgerror = {
  inserted(dom, data) {
    dom.onerror = () => {
      dom.src = data.value
    }
  }
}
