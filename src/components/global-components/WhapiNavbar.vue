<template>
    <div class="whapi-navbar">
        <div class="whapi-header-icon">
            <img class="icon" src="@/assets/icons/whapi-main.svg" alt="">
        </div>
        <div class="lang-and-sign">
            <button v-if="$route.fullPath==='/'" @click="openSignCard" class="sign-button">
                {{getLang.navbar.loginButton}}
            </button>
            <Icon 
                pointer
                @clickEvent="openLangOptions"
                icon="lang.svg"
                :width="{
                    default:'40',
                    lg:'38',
                    md:'36',
                    sm:'34',
                    xs:'32',
                }"
                iconColor="#4689F1"
            />
            <div v-if="openSelectLangCard" class="lang-options">
                <div v-for="(item,i) in langOptions" :key="'lang'+i" @click="changeLang(item)" class="options-items">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {langOptions} from "@/enum/enum.js"
import Icon from "@/generic_components/icons/Icons.vue"
import {mapMutations,mapGetters} from "vuex"
export default {
    data(){
        return{
            langOptions,
            signButton:true,
            openSelectLangCard:false,
        }
    },
    components:{
        Icon,
    },
    computed:{
        ...mapGetters([
            "getOpenSignModal",
            "getLang",
        ]),
    },  
    methods:{
        ...mapMutations([
            "setOpenSignModal",
            "setLang",
        ]),
        changeLang(item){
            window.localStorage.setItem('lang',item.value);
            let selectedLang = require(`@/locales/${item.value}.json`)
            this.setLang(selectedLang);
            this.openSelectLangCard = false;
        },
        openLangOptions(){
            this.openSelectLangCard = !this.openSelectLangCard;
        },
        openSignCard(){
            if(this.signButton){
                this.setOpenSignModal(!this.getOpenSignModal);
                this.signButton=false;
                setTimeout(() => {
                    this.signButton=true;
                }, 1e3);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.whapi-navbar{
    position: relative;
    width: 100%;
    @include d-flex-center;
    padding: 10px;
    user-select: none;
    .whapi-header-icon{
        @include d-flex-center;
        pointer-events: none;
        user-select: none;
        .icon{
            width: 90px;
        }
    }
    .lang-and-sign{
        @include d-flex-center;
        gap: 10px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0,-50%);
        .sign-button{
            border: 1px solid #3EB9FB;
            border-radius: 999px;
            font-size: 1.8rem;
            color: #4689F1;
            padding: 4px 12px;
            cursor: pointer;
            transition: all .1s linear;
            &:hover{
                background-color: #8bb0e9;
                color: #fff;
            }
        }
        .lang-options{
            user-select: none;
            border-radius: 5px;
            width: 100px;
            font-size: 1.6rem;
            background-color: #fff;
            position: absolute;
            right: 20px;
            top: 120%;
            @include d-flex(column,flex-start,stretch);
            gap: 3px;
            -webkit-box-shadow: 0px 0px 20px -13px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 20px -13px rgba(0,0,0,0.75);
            box-shadow: 0px 0px 20px -13px rgba(0,0,0,0.75);
            .options-items{
                &:first-child{
                    border-radius: 5px 5px 0 0 ;
                }
                &:last-child{
                    border-radius: 0 0 5px 5px;
                }
                cursor: pointer;
                @include d-flex-center;
                gap: 5px;
                transition: all .1s linear;
                &:hover{
                    background-color: rgb(236, 236, 236);
                }
            }
        }
    }
}
</style>