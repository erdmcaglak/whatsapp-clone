import Vue from 'vue'
import Vuex from 'vuex'
import _ from "lodash"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang:{},
    isOpenSmalledMenu:false,
    openSignModal:false,
    alert:{},
    userInfo:{},
    whapiNumberList:[],
    isCanBuyFreePackage:true,
  },
  mutations: {
    setIsCanBuyFreePackage(state,item){
      state.isCanBuyFreePackage = item
    },
    setWhapiNumberList(state,item){
      state.whapiNumberList = item
    },
    setUserInfo(state,item){
      state.userInfo = {...item}
    },
    setAlert(state,item){
      state.alert = _.cloneDeep(item)
    },
    setOpenSignModal(state,item){
      state.openSignModal=item
    },
    setLang(state,item){
      state.lang = item
    },
    setIsOpenSmalledMenu(state,item){
      state.isOpenSmalledMenu = item;
    }
  },
  getters:{
    getIsCanBuyFreePackage(state){
      return state.isCanBuyFreePackage;
    },
    getWhapiNumberList(state){
      return state.whapiNumberList;
    },
    getUserInfo(state){
      return state.userInfo
    },
    getAlert(state){
      return state.alert;
    },
    getOpenSignModal(state){
      return state.openSignModal;
    },
    getLang(state){
      return state.lang;
    },
    getIsOpenSmalledMenu(state){
      return state.isOpenSmalledMenu;
    }
  }
})
