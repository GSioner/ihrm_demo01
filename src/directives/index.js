// 统一所有自定义指令文件
import { Message } from 'element-ui'

export const imgerror = {
  inserted(dom, data) {
    dom.onerror = () => {
      console.log(data)
      Message.error('图片获取失败，将展示默认图片')
      dom.src = data.value
    }
  }
}
