// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { parseTime } from '@/utils/index'

// 引入全局样式
import '@/assets/css/index.scss'

// 全局挂载
Vue.prototype.parseTime = parseTime
import TDesign from 'tdesign-vue'

// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css'

Vue.use(TDesign)
// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
