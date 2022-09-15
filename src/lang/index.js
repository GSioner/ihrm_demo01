import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import elementEN from 'element-ui/lib/locale/lang/en'
import CustomZH from './zh.js'
import CustomEN from './en.js'

Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookie.get('language') || 'zh',
  messages: {
    'zh': {
      ...elementZH,
      ...CustomZH
    },
    'en': {
      ...elementEN,
      ...CustomEN
    }
  }
})
