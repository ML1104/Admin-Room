import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Add from './components/Add.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path: 'add', component: Add
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
