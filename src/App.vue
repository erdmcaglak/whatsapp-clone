<template>
  <div class="main">
    <Menu v-if="$route.fullPath!='/' && $route.name!='Session'"/>
    <div class="main-wrapper">
      <Navbar v-if="$route.fullPath!='/'" />
      <router-view></router-view>
    </div>
    
    <Alert :err="getAlert"/>
  </div>
</template>

<script>
import Alert from "@/generic_components/alert/Alert.vue"
import Menu from "@/components/global-components/Menu.vue"
import Navbar from "@/components/global-components/WhapiNavbar.vue"
import {mapGetters} from "vuex"
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters([
      "getAlert",
    ])
  },
  components:{
    Menu,
    Alert,
    Navbar
  }
}
</script>


<style lang="scss">
@import "@/scss/mixins.scss";
@font-face {
  font-family: jost;
  src: url('./assets/fonts/Jost-Regular.ttf');
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  -webkit-tap-highlight-color:transparent;
  -moz-tap-highlight-color:transparent;
  -o-tap-highlight-color:transparent;
}
.main{
  width: 100%;
  height: 100%;
  @include d-flex(row,flex-start,flex-start);
  background-image: url('./assets/images/background.svg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  .main-wrapper{
    width: 100%;
    height: 100%;
    @include d-flex(column,flex-start,flex-start);
  }
}

html,body{
  font-family: jost;
  height: 100%;
  font-size: 10px!important;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    font-size: 9px!important;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 8px!important;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 8px!important;
  }
  @media screen and (max-width: 480px) {
    font-size: 7px!important;
  }
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
}

</style>
