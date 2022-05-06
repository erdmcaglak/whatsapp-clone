<template>
    <div class="sign-modal-main">
        <template v-if="windowWidth>=1024">
            <div class="sign-in">
                <div class="background-1"></div>
                <div class="background-2"></div>
                <div class="whapi-logo">
                    <img class="logo" src="@/assets/icons/whapi-min.svg" alt="">
                </div>
                <div class="sign-main">
                    <div class="sign-text">
                        Sign In to Website
                        <div class="scan-qr-and-click-link">
                            Scan QR and click link
                        </div>
                    </div>
                    <div class="buttons-and-qr">
                        <div class="qr">
                            <img class="whatsapp-qr" :src="signInQrUrl" alt="">
                            <div class="expired">
                                Qr will change in {{qrExpired}} seconds
                            </div>
                        </div>
                        <div class="or">
                            or
                        </div>
                        <div class="web-whatsapp-button">
                            <img class="whatsapp-filled-icon" src="@/assets/icons/whatsapp-filled.svg" alt="">
                            <a target="_blank" :href="`https://web.whatsapp.com/send?phone=${this.whapiNumber}&text=${encodeURIComponent(`Let me login,token=${this.$utid}`)}`" class="web-whatsapp">
                                Open web.whatsapp
                            </a>
                        </div>
                    </div>
                    
                </div>
                <transition name="sign-up-slide">
                    <div v-if="selectedCard==='signIn'" class="closed-card">
                        <div class="welcome-back">
                            Welcome Back !
                        </div>
                        <div class="closed-card-text">
                            Login with your information to use the API
                        </div>
                        <button @click="changeCard('signUp')" class="sign-up-button">
                            SIGN IN
                        </button>
                    </div>
                </transition>
                
            </div>
            <div class="sign-up">
                <div class="background-1"></div>
                <div class="background-2"></div>
                <div class="whapi-logo">
                    <img class="logo" src="@/assets/icons/whapi-min.svg" alt="">
                </div>
                <div class="sign-main">
                    <div class="sign-text">
                        Sign Up to Website
                        <div class="scan-qr-and-click-link">
                            Scan QR and click link
                        </div>
                    </div>
                    <div class="buttons-and-qr">
                        <div class="qr">
                            <img class="whatsapp-qr" :src="signUpQrUrl" alt="">
                        </div>
                        <div class="or">
                            or
                        </div>
                        <div class="web-whatsapp-button">
                            <img class="whatsapp-filled-icon" src="@/assets/icons/whatsapp-filled.svg" alt="">
                            <a target="_blank" :href="`https://web.whatsapp.com/send?phone=${whapiNumber}&text=${encodeURIComponent('Let me register')}`" class="web-whatsapp">
                                Open web.whatsapp
                            </a>
                        </div>
                    </div>
                </div>
                <transition name="sign-in-slide">
                    <div v-if="selectedCard==='signUp'" class="closed-card">
                        <div class="welcome-back">
                            Hello !
                        </div>
                        <div class="closed-card-text-signup">
                            <div class="header">
                                Create Account
                            </div>
                            <div class="text">
                                Login with your information to use the API
                            </div>
                        </div>
                        <!-- <Button 
                            title="SIGN IN" 
                            fontSize="2"
                            background="linear-gradient(180deg, #3DBAFB 0%, #5FAAED 0.01%, #888CF1 100%)"
                            @clickFunc="changeCard('signIn')"
                            color="#fff"
                            radius="10"
                        /> -->
                        <button @click="changeCard('signIn')" class="sign-up-button">
                            SIGN UP
                        </button>
                    </div>
                </transition>
            </div>
        </template>
        <template v-else>
            <div class="button-wrapper">
                <a target="_blank" :href="`https://api.whatsapp.com/send?phone=${whapiNumber}&text=${encodeURIComponent('Let me register')}`" class="web-whatsapp">
                    Register
                </a>
                <a target="_blank" :href="`https://api.whatsapp.com/send?phone=${this.whapiNumber}&text=${encodeURIComponent(`Let me login,token=${this.$utid}`)}`" class="web-whatsapp">
                    Login
                </a>
            </div>
        </template>
    </div>
</template>

<script>
import QRCode from "qrcode"
import {whapiNumber} from "@/control.js"
import Button from "@/generic_components/buttons/Button.vue"
import uniqid from "uniqid"
import Vue from "vue"
export default {
    components:{
        Button
    },
    data(){
        return{
            signInQrUrl:"",
            signUpQrUrl:"",
            whapiNumber,
            selectedCard:"signIn",
            windowWidth:null,
            qrCount:0,
            qrInterval:null,
        }
    },
    methods:{
        changeCard(item){
            this.selectedCard = item;
        }
    },
    computed:{
        qrExpired(){
            return (60-this.qrCount)<10 ? `0${60-this.qrCount}`:`${60-this.qrCount}`
        }
    },
    destroyed(){
        clearInterval(this.qrInterval)
    },
    mounted(){
        this.windowWidth = window.innerWidth;
        let data = this;
        let opts = {
            errorCorrectionLevel: 'M',
            type: 'image/jpeg',
            quality: 0.3,
            margin: 0,
        }
        // TODO expire token 2 adet olacak toplamda 2 dklık control sağlancak ve agent bilgisi yeni token için tek seferlik gönderilecek
        // TODO /session/:token a loading eklenecek
        // TODO account sayfası mock ile yapılacak
        // TODO login sayfasındaki bütün butonlar boş olsa dahi çalışacak
        // TODO privacy ve about us modal yapılacak
        // TODO login için dil desteği yapılacak
        this.qrInterval = setInterval(() => {
            this.qrCount++
            if(this.qrCount === 60){
                window.localStorage.setItem('utid',uniqid())
                Vue.prototype.$utid = window.localStorage.getItem('utid')
                QRCode.toDataURL(`https://api.whatsapp.com/send?phone=${this.whapiNumber}&text=${encodeURIComponent(`Let me login,token=${this.$utid}`)}`,opts, function (err, url) {
                    data.signInQrUrl = url;
                })
                this.qrCount = 0;
            }
        }, 1e3);
        QRCode.toDataURL(`https://api.whatsapp.com/send?phone=${this.whapiNumber}&text=${encodeURIComponent('Let me register')}`,opts, function (err, url) {
            data.signUpQrUrl = url;
        })
        QRCode.toDataURL(`https://api.whatsapp.com/send?phone=${this.whapiNumber}&text=${encodeURIComponent(`Let me login,token=${this.$utid}`)}`,opts, function (err, url) {
            data.signInQrUrl = url;
        })
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.sign-modal-main{
    @include d-flex(row,flex-start,stretch);
    width: 80%;
    background-color: #F5F9FF;
    flex: 1 0 1px;
    border-radius: 10px;
    .sign-in{
        flex: 1 0 1px;
        background-color: #F5F9FF;
        border-radius: 10px 0 0 10px;
        @include d-flex(column,flex-start,center);
        overflow: hidden;
        position: relative;
        gap: 20px;
        .background-1{
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 999px;
            top: 5px;
            right: 10px;
            z-index: 0;
            @include box-shadow-inset(0px,4px,4px,0px,rgba(192, 171, 227, 0.25))
        }
        .background-2{
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 999px;
            bottom: -150px;
            left: -150px;
            @include box-shadow-inset(0px,4px,4px,0px,rgba(192, 171, 227, 0.25))
        }
        .whapi-logo{
            width: 100%;
            padding: 20px;
            @include d-flex(row,flex-start,center);
            flex: 0 0 auto;
            .logo{
                width: 90px;
            }
        }
        .sign-main{
            flex: 1 0 1px;
            @include d-flex(column,flex-start,center);
            gap: 50px;
            .sign-text{
                @include d-flex(column,center,center);
                font-size: 3rem;
                color: #4689F1;
                flex: 0 0 auto;
                .scan-qr-and-click-link{
                    @include d-flex-center;
                    text-align: center;
                    font-size: 1.3rem;
                    color: #467ABE;
                }
            }
            .buttons-and-qr{
                gap: 40px;
                @include d-flex-center;
                .qr{
                    @include d-flex(column,center,center);
                    gap: 10px;
                    .whatsapp-qr{
                        width: 300px;
                        height: 300px;
                        padding: 0;
                    }
                    .expired{
                        font-size: 1.5rem;
                        font-weight: 500;
                        color: rgb(133, 133, 133);
                        @include d-flex-center;
                    }
                }
                .or{
                    @include d-flex-center;
                    font-size: 2.5rem;
                    color: #5F90FC;
                }
                .web-whatsapp-button{
                    height: 100%;
                    @include d-flex(column,space-evenly,center);
                    .whatsapp-filled-icon{
                        width: 60px;
                    }
                    a,
                    a:visited,a:link,a:active {
                        color: #4C6CDD;
                    }
                    .web-whatsapp{
                        cursor: pointer;
                        padding: 10px 20px;
                        border: 1px solid #3EB9FB;
                        border-radius: 10px;
                        color: #4C6CDD;
                        font-size: 2rem;
                        transition: all .1s linear;
                        &:hover{
                            color: #fff;
                            background-color: #4C6CDD;
                        }
                    }
                }
            }
        }
        .closed-card{
            user-select: none;
            position: absolute;
            @include d-flex(column,center,center);
            background: rgb(245, 249, 255);
            width: 100%;
            height: 100%;
            border-radius: 10px 0 0 10px;
            gap: 30px;
            .welcome-back{
                @include d-flex-center;
                font-size: 3.8rem;
                font-weight: 700;
                color: #4689F1;
            }
            .closed-card-text{
                color: #4689F1;
                font-size: 2.3rem;
                @include d-flex-center;
                text-align: center;
                font-weight: 300;
            }
            .sign-up-button{
                font-size: 2rem;
                border-radius: 10px;
                color: #fff;
                background-color: #fff;
                background: linear-gradient(180deg, #3DBAFB 0%, #5FAAED 0.01%, #888CF1 100%);
                padding: 8px 28px;
            }
        }
    }
    .sign-up{
        @extend .sign-in;
        border-radius: 0 10px 10px 0;
        border-left: 1px solid rgb(219, 219, 219);
        .closed-card-text-signup{
            color: #4689F1;
            font-size: 2.3rem;
            text-align: center;
            font-weight: 300;
            @include d-flex(column,flex-start,center);
            .header{
                font-size: 2.8rem;
                font-weight: 700;

            }
        }
    }
    .button-wrapper{
        @include d-flex-center;
        gap: 35px;
        width: 100%;
        .web-whatsapp{
            cursor: pointer;
            padding: 10px 20px;
            border: 1px solid #3EB9FB;
            border-radius: 10px;
            color: #4C6CDD;
            font-size: 2rem;
            transition: all .1s linear;
            &:hover{
                color: #fff;
                background-color: #4C6CDD;
            }
        }
    }
    
}
</style>