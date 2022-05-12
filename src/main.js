import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import uniqid from "uniqid"
import {SERVER_URL} from "@/control.js"
import * as axios from "axios"
import moment from "moment"
import io from "socket.io-client"
import browser from 'browser-detect'
import VueMask from 'v-mask'
import {utidCreator} from "@/utils/utils.js"

Vue.use(VueMask);

//todo user-panel kalktığında burdaki socket kalkacak

const socket = io(`https://test.whapi.chat`, {
  autoConnect: false,
  auth: {
    token: ''
  },
  forceNew: true,
})

Vue.prototype.$socket = socket;

if(window.localStorage.getItem('lang')){
  let selectedLang = require(`@/locales/${window.localStorage.getItem('lang')}.json`)
  store.commit('setLang',selectedLang)
}
else{
  window.localStorage.setItem('lang','en')
  let selectedLang = require('@/locales/en.json')
  store.commit('setLang',selectedLang)
}
//console.log(moment(Date.now()+120000))






async function registerAgent(){
  let browserInfo = browser();
  const res = await axios.get('https://ifconfig.me').catch(err=>{
    console.log({err})
  })
  
  let ipv4 = res.data;
  const resp = await axios.get(`https://ipapi.co/${ipv4}/json`).catch(err=>{
    console.log({err})
  });
  let location = resp.data;

  const agentObj = {
    uid:window.localStorage.getItem('utid-1').split('-')[0],
    agent:{
      ip:ipv4,
      location,
      browserInfo,
    }
  }
  const response = await axios.post(`${SERVER_URL}/login/agent`,agentObj).catch(err=>{
    console.log('Error in login/agent')
    console.log({err})
  })
  //console.log({response})
}

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('@/mocks/browser.js')
  worker.start()
} else {
  
}

registerAgent();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
