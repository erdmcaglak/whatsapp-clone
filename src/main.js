import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import uniqid from "uniqid"
import {SERVER_URL} from "@/control.js"
import * as axios from "axios"

if(window.localStorage.getItem('lang')){
  let selectedLang = require(`@/locales/${window.localStorage.getItem('lang')}.json`)
  store.commit('setLang',selectedLang)
}
else{
  window.localStorage.setItem('lang','en')
  let selectedLang = require('@/locales/en.json')
  store.commit('setLang',selectedLang)
}

window.localStorage.setItem('utid',uniqid());

Vue.prototype.$utid = window.localStorage.getItem('utid')

async function registerAgent(){
  const agentObj = {
    uid:window.localStorage.getItem('utid'),
    agent:navigator.userAgent
  }
  const response = await axios.post(`${SERVER_URL}/login/agent`,agentObj).catch(err=>{
    console.log('Error in login/agent')
    console.log({err})
  })
  console.log({response})
}



async function isLogin(){
  
  
  
}

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('@/mocks/browser.js')
  worker.start()
} else {
  
}

registerAgent();
isLogin();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
