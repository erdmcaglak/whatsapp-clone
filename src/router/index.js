import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios"
import {SERVER_URL} from "@/control.js"
import store from '@/store'
import {cookieParser,cookieRemover} from "@/utils/utils.js"

import Login from "@/views/Login.vue"
import WuiAccounts from "@/views/WuiAccounts.vue"
import SendReceive from "@/views/SendReceive.vue"
import StatusTyping from "@/views/StatusTyping.vue"
import Base64Converter from "@/views/Base64Converter.vue"
import LinkCreator from "@/views/LinkCreator.vue"
import UserPanel from "@/views/UserPanel.vue"
import ApiDoc from "@/views/ApiDoc.vue"
import Settings from "@/views/Settings.vue"
import LoginSession from "@/views/LoginSession.vue"
import WhatsappNumbers from "@/views/WhatsappNumbers.vue"
import PaymentPackets from "@/views/PaymentPackets.vue"


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Login,
    name:'Login'
  },
  {
    path:'/wui-account',
    component:WuiAccounts,
    name:'WuiAccounts'
  },
  {
    path:'/payment-packets',
    component:PaymentPackets,
    name:'PaymentPackets'
  },
  {
    path:'/whatsapp-numbers',
    component:WhatsappNumbers,
    name:'WhatsappNumbers'
  },
  {
    path:'/dashboard',
    component:SendReceive,
    name:'Dashboard'
  },
  {
    path:'/status-typing',
    component:StatusTyping,
    name:'StatusTyping'
  },
  {
    path:'/converter',
    component:Base64Converter,
    name:'Base64Converter'
  },
  {
    path:'/link-creator',
    component:LinkCreator,
    name:'LinkCreator'
  },
  {
    path:'/user-panel',
    component:UserPanel,
    name:'UserPanel'
  },
  {
    path:'/api-documentation',
    component:ApiDoc,
    name:'ApiDoc'
  },
  {
    path:'/settings',
    component:Settings,
    name:'Settings'
  },
  {
    path:'/session/:token',
    component:LoginSession,
    name:'Session'
  },
  {path:'*',redirect:'/'}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.path=='/'||to.path=='/payment-packets'||to.name=='Session'){
    next();
    return
  }
  else if(from.path=='/'){
    let {token} = cookieParser();
    if(token){
      const response = await axios.post(`${SERVER_URL}/account/accounts`,{
          token,
        }).catch(err=>{
          console.log({err})
          store.commit('setAlert',{
            title:'Server Error',
            type:'danger'
          })
          next('/')
          return
        })
        console.log('-----------accounts--------------')
        console.log({response})
      
        if(!response){
          store.commit('setAlert',{
            title:'Unexpected Error',
            type:'danger'
          })
          next('/')
          return
        }

      
        if(response.data?.success){
          next()
          return
        }
        else{
          store.commit('setAlert',{
            title:'Please Login',
            type:'warning'
          })
          next('/')
          return
        }
      }
      else{
        store.commit('setAlert',{
          title:'Please Login',
          type:'warning'
        })
        next('/')
        return
      }
    }
    
  next()
})

export default router
