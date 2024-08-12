// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { parseTime } from '@/utils/index'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库
import '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import '@/assets/css/index.scss'
// 分页组件
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
import Pagination from '@/components/Pagination'

// 全局挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.prototype.parseTime = parseTime

// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
