import Vue from 'vue'
import VueRouter from 'vue-router'

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
    path:'/whatsapp-numbers',
    component:WhatsappNumbers,
    name:'WhatsappNumbers'
  },
  {
    path:'/send-receive',
    component:SendReceive,
    name:'SendReceive'
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

export default router
