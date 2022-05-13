<template>
    <div class="login-main">
        <div class="video-promo">
            <div id="video" :class="getOpenSignModal ? 'video flex-5':'video flex-50'">
                VIDEO
            </div>
            <div class="promo">
                <WhapiNavbar/>
                <div class="promo-text">
                    {{getLang.login.promoText}}
                </div>
                <transition name="fade" mode="out-in">
                    <SignCard v-if="getOpenSignModal"/>
                    <div v-else class="synchronicity-promo">
                        <div class="no-need">
                            {{getLang.login.noNeed}}
                        </div>
                        <div class="animation-promo">
                            <div class="animation-headers">
                                <div :style="selectedHeader === item.value ? 'transform:scale(1.15)':''" :id="item.value" v-for="(item,i) in animationPromo" :key="'animationPromo'+i" class="header-items">
                                    <img class="header-items-icon" :src="require('@/assets/icons/'+item.icon)" alt="">
                                </div>
                            </div>
                            <div class="animation-content">
                                <div class="content-header">
                                    {{getLang.login.animationPromo[animationPromoHeader]}}
                                </div>
                                <div class="content-text">
                                    {{getLang.login.animationPromo[animationPromoText]}}
                                </div>
                            </div>
                        </div>
                        <div class="try-free">
                            <div @click="openSignCard" class="try-free-button">
                                {{getLang.login.tryFree}}
                            </div>
                            <div class="try-free-text">
                                {{getLang.login.tryFreeText}}
                            </div>
                        </div>
                    </div>
                </transition>
                <div class="footer">
                    <div class="privacy-and-about">
                        <div @click="openPrivacy" class="privacy">
                            {{getLang.login.privacy}}
                        </div>
                        <div @click="openAbout" class="about">
                            {{getLang.login.aboutUs}}
                        </div>
                    </div>
                    <div v-if="getOpenSignModal" class="footer-promo">
                        {{getLang.login.paymentPromo}}
                    </div>
                    <div @click="routePayment" class="about-pricing">
                        {{getLang.login.aboutPricing}}
                    </div>
                </div>
            </div>
        </div>
        <AboutUsModal :openModal.sync="openAboutUsModal" v-if="openAboutUsModal"/>
        <PrivacyPolicy :openPrivacy.sync="openPrivacyModal" v-if="openPrivacyModal"/>
    </div>
</template>

<script>
import SignCard from "@/components/login-components/SignCard.vue"
import AboutUsModal from "@/components/login-components/AboutUsModal.vue"
import PrivacyPolicy from "@/components/login-components/PrivacyPolicyModal.vue"
import WhapiNavbar from "@/components/global-components/WhapiNavbar.vue"
import {mapGetters,mapMutations} from "vuex"
import {animationPromo} from "@/enum/enum.js"
import {SERVER_URL} from "@/control.js"
import axios from "axios"
import {utidCreator,cookieSetter,cookieParser} from "@/utils/utils.js"
export default {
    data(){
        return{
            openAboutUsModal:false,
            openPrivacyModal:false,
            signButton:true,
            widthInterval:null,
            animationPromo,
            selectedHeader:"rmm",
            headerList:[
                "rmm",
                "status",
                "notification"
            ],
            x:null,
            y:null,
        }
    },
    components:{
        WhapiNavbar,
        SignCard,
        AboutUsModal,
        PrivacyPolicy,
    },
    methods:{
        openPrivacy(){
            this.openPrivacyModal = true
        },
        openAbout(){
            this.openAboutUsModal =true;
        },
        routePayment(){
            this.$router.push(this.$route.query.redirect || '/payment-packets');
        },
        openSignCard(){
            if(this.signButton){
                this.setOpenSignModal(!this.getOpenSignModal);
                this.signButton=false;
                setTimeout(() => {
                    this.signButton=true;
                }, 1e3);
            }
        },
        ...mapMutations([
            "setOpenSignModal",
            "setAlert",
        ])
    },
    computed:{
        animationPromoText(){
            return this.animationPromo.find(e=>e.value===this.selectedHeader).content;
        },
        animationPromoHeader(){
            return this.animationPromo.find(e=>e.value===this.selectedHeader).header;
        },
        ...mapGetters([
            "getOpenSignModal",
            "getLang"
        ])
    },
    destroyed(){
        clearInterval(this.x)
        clearInterval(this.y)
    },
    async mounted(){
        utidCreator();
        let i = 0;
        setInterval(() => {
            if(i===3)
                i=0;
            this.selectedHeader=this.headerList[i];
            i++;
        }, 3e3);
        
        if(cookieParser().token){
            const response = await axios.post(`${SERVER_URL}/account/accounts`,{
                token:cookieParser().token
            }).catch(err=>{
                console.log('Error in /account/accounts');
                console.log({err})
            })
            if(!response){
                console.log({response})
            }
            else{
                if(response.data.success){
                    this.$router.push(this.$route.query.redirect || `/whatsapp-numbers`);
                }
            }
            
        }
        

        this.x = setInterval(async () => {
            let token1 = window.localStorage.getItem('utid-1').split('-')[0];
            console.log({before:cookieParser()})
            axios.post(`${SERVER_URL}/login/agent/${token1}`,{}).then(response=>{
                if(response.data.token){
                    cookieSetter('token',response.data.token)
                    console.log({responseToken:response.data.token})
                    clearInterval(this.x)
                    clearInterval(this.y)
                    setTimeout(() => {
                        this.$router.push(this.$route.query.redirect || '/whatsapp-numbers');
                        console.log({cookieAfter1s:cookieParser()})
                    }, 1e3);
                }
            }).catch(err=>{
                console.log('Error in login/agent/:uid')
                console.log({err})
            })
            
        }, 1e4);
        
        this.y = setInterval(async () => {
            if(window.localStorage.getItem('utid-2')){
                console.log({before:cookieParser()})

                let token2 = window.localStorage.getItem('utid-2').split('-')[0];
                axios.post(`${SERVER_URL}/login/agent/${token2}`,{}).then(response=>{
                    if(response.data.token){
                        cookieSetter('token',response.data.token)
                        console.log({responseToken:response.data.token})
                        clearInterval(this.y)
                        clearInterval(this.x)
                        setTimeout(() => {
                            this.$router.push(this.$route.query.redirect || '/whatsapp-numbers');
                            console.log({cookieAfter1s:cookieParser()})
                        }, 1e3);
                    }
                }).catch(err=>{
                    console.log('Error in login/agent/:uid')
                    console.log({err})
                })
            }
            
        }, 1e4);
    },
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.login-main{
    width: 100%;
    height: 100%;
    overflow: auto;
    .video-promo{
        height: 100%;
        @include d-flex(row,flex-start,stretch);
        .video{
            transition: all .3s linear;
            font-size: 4rem;
            background-color: #fff;
            @include d-flex-center;
            overflow: hidden;
            @media screen and (min-width: 1025px) and (max-width: 1440px) {
            }
            @media screen and (min-width: 769px) and (max-width: 1024px) {
                display: none;
            }
            @media screen and (min-width: 481px) and (max-width: 768px) {
                display: none;
            }
            @media screen and (max-width: 480px) {
                display: none;
            }
        }
        .flex-50{
            flex: 0 0 50%;
        }
        .flex-5{
            flex: 0 0 5%;
        }
        .promo{
            @include d-flex(column,flex-start,center);
            flex: 1 0 1px;
            gap: 20px;
            .promo-text{
                text-align: center;
                @include d-flex-center;
                font-size: 2rem;
                font-weight: 700;
                color: #467ABE;
            }
            .synchronicity-promo{
                flex: 1 0 1px;
                @include d-flex(column,center,center);
                gap: 20px;
                width: 100%;
                .no-need{
                    color: #4689F1;
                    font-size: 2.2rem;
                }
                .animation-promo{
                    @include d-flex(column,flex-start,stretch);
                    padding: 20px;
                    width: 90%;
                    .animation-headers{
                        @include d-flex(row,space-around,center);
                        .header-items{
                            padding: 20px 0;
                            width: 28%;
                            @include d-flex-center;
                            background-color: #F5F9FF;
                            border-radius: 20px 20px 0 0;
                            .header-items-icon{
                                width: 85px
                            }
                        }
                    }
                    .animation-content{
                        @include d-flex(column,flex-start,stretch);
                        padding: 30px 100px;
                        background-color: #F5F9FF;
                        gap: 20px;
                        min-height: 200px;
                        .content-header{
                            @include d-flex-center;
                            color: #4689F1;
                            font-size: 2.1rem;
                            font-weight: 700;
                            text-align: center;
                        } 
                        .content-text{
                            @include d-flex-center;
                            color: #4689F1;
                            font-size: 1.9rem;
                            text-align: center;
                        }
                    }
                }
                .try-free{
                    @include d-flex(column,center,center);
                    gap: 10px;
                    .try-free-button{
                        padding: 10px 100px;
                        color: #fff;
                        background: linear-gradient(180deg, #3EB9FB 0%, #4689F1 100%);
                        border-radius: 15px;
                        font-size: 1.8rem;
                        cursor: pointer;
                        transition: all .1s linear;
                        &:hover{
                            filter: brightness(110%);
                        }
                    }
                    .try-free-text{
                        color:#4689F1;
                        font-size: 1.5rem;
                    }
                }
            }
        }
        .footer{
            flex: 0 0 auto;
            width: 100%;
            @include d-flex(row,space-between,center);
            padding: 10px;
            .privacy-and-about{
                @include d-flex-center;
                gap: 20px;
                .privacy{
                    font-size: 1.5rem;
                    color: #4689F1;
                    user-select: none;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                .about{
                    @extend .privacy;
                }
            }
            .footer-promo{
                font-weight: 700;
                color: #52A2FC;
                @include d-flex-center;
                font-size: 2rem;
            }
            .about-pricing{
                border-radius: 20px;
                padding: 6px 18px;
                background: linear-gradient(180deg, #3DBAFB 0%, #608FFB 100%);
                color: #fff;
                font-size: 1.8rem;
                cursor: pointer;
            }
        }
    }
    
}
</style>