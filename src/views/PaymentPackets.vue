<template>
    <div class="payment-packages-main">
        <div class="payment-packages-header-wrapper">
            <div @click="routeMainPage" class="turn-back">
                <Icon 
                    icon="left-arrow.svg"
                    :width="{
                        default:'30',
                        lg:'28',
                        md:'26',
                        sm:'24',
                        xs:'22',
                    }"
                    iconColor="#3FBCFE"
                    pointerNone
                />
            </div>
            <div class="payment-packages-header">
                <div class="header-main">
                    By using Whapi, you can easily send/receive WhatsApp messages through your own number.
                </div>
                <div class="header-content">
                    No need to the Business API.
                </div>
            </div>
        </div>
        <div class="payment-packages-content">
            <div v-for="(item,i) in packageList" :key="'packageItems'+i" class="packages-items">
                <div class="item-header">
                    {{item.title}}
                </div>
                <div v-for="(content,i) in item.packageItems" :key="'itemPackageItems'+i" class="items-content">
                    {{content}}
                </div>
                <div class="item-price">
                    {{item.price}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import {SERVER_URL} from "@/control.js"
import Icon from "@/generic_components/icons/Icons.vue"
export default {
    data(){
        return{
            packageList:[
                { 
                    "id": "0", 
                    "title": "Only Send", 
                    "numberType": "Qr", 
                    "price": "9.99", 
                    "value": "sendReceiveQr", 
                    "createdTs": "", 
                    "createdTime": "", 
                    "endTs": "", 
                    "end": "", 
                    "duration": "3 Days", 
                    "durationInDays": 3, 
                    "packageItems": [ 
                        "Only Send", 
                        "Link Creator", 
                        "Base64 Converter", 
                        "Account Control Panel", 
                        "Access to Whatsapp Account", 
                        "Up to 100.000 messages/day", 
                        "Quick Onboarding" 
                        ] 
                },
                { 
                    "id": "0", 
                    "title": "Send/Receive", 
                    "numberType": "Qr", 
                    "price": "19.99", 
                    "value": "sendReceiveQr", 
                    "createdTs": "", 
                    "createdTime": "", 
                    "endTs": "", 
                    "end": "", 
                    "duration": "3 Days", 
                    "durationInDays": 3, 
                    "packageItems": [ 
                        "Send/Receive Api", 
                        "Link Creator", 
                        "Base64 Converter", 
                        "Account Control Panel", 
                        "Access to Whatsapp Account", 
                        "Up to 100.000 messages/day", 
                        "Quick Onboarding" 
                        ] 
                },
                { 
                    "id": "0", 
                    "title": "Only Send Whapi Number", 
                    "numberType": "Qr", 
                    "price": "29.99", "value": "sendReceiveQr", 
                    "createdTs": "", 
                    "createdTime": "", 
                    "endTs": "", 
                    "end": "", 
                    "duration": "3 Days", 
                    "durationInDays": 3, 
                    "packageItems": [ 
                        "Use Whapi Number",
                        "Only Send", 
                        "Link Creator", 
                        "Base64 Converter", 
                        "Account Control Panel", 
                        "Access to Whatsapp Account", 
                        "Up to 100.000 messages/day", 
                        "Quick Onboarding" 
                        ] 
                },
                { 
                    "id": "0", 
                    "title": "Send/Receive Whapi Number", 
                    "numberType": "Qr", 
                    "price": "49.99", "value": "sendReceiveQr", 
                    "createdTs": "", 
                    "createdTime": "", 
                    "endTs": "", 
                    "end": "", 
                    "duration": "3 Days", 
                    "durationInDays": 3, 
                    "packageItems": [
                        "Use Whapi Number",
                        "Send/Receive Api", 
                        "Link Creator", 
                        "Base64 Converter", 
                        "Account Control Panel", 
                        "Access to Whatsapp Account", 
                        "Up to 100.000 messages/day", 
                        "Quick Onboarding" 
                        ] 
                },
                { 
                    "id": "0", 
                    "title": "W-UI",
                    "numberType": "Qr", 
                    "price": "99.99", "value": "sendReceiveQr", 
                    "createdTs": "", 
                    "createdTime": "", 
                    "endTs": "", 
                    "end": "", 
                    "duration": "3 Days", 
                    "durationInDays": 3, 
                    "packageItems": [ 
                        "----------", 
                        "Link Creator", 
                        "Base64 Converter", 
                        "Account Control Panel", 
                        "Access to Whatsapp Account", 
                        "Up to 100.000 messages/day", 
                        "Quick Onboarding" 
                        ] 
                },
                
            ]
        }
    },
    components:{
        Icon,
    },
    methods:{
        routeMainPage(){
            this.$router.push(this.$route.query.redirect || `/`);
        }
    },
    async mounted(){
        // const response = await axios.post(`${SERVER_URL}/account/packages`,{
            
        // }).catch(err=>{
        //     console.log('Error in account/packages')
        //     console.log({err});
        // })
        // console.log('-------packages-------')
        // console.log({response})
        // if(response && response.data){
        //     this.packageList = _.cloneDeep(response.data);
        // }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.payment-packages-main{
    width: 100%;
    height: 100%;
    @include d-flex(column,flex-start,center);
    .payment-packages-header-wrapper{
        text-align: center;
        position: relative;
        flex: 0 0 auto;
        width: 100%;
        @include d-flex-center;
        .turn-back{
            position: absolute;
            left: 100px;
            top: 50%;
            transform: translate(0,-50%);
            @include d-flex-center;
            cursor: pointer;
        }
        .payment-packages-header{
            border-radius: 10px;
            padding: 15px;
            width: 700%;
            @include d-flex(column,flex-start,center);
            gap: 10px;
            @media screen and (max-width: 1440px) {
                width: 60%;
            }
            @media screen and (max-width: 1024px) {
                width: 70%;
            }
            @media screen and (max-width: 768px) {
                width: 80%;
            }
            @media screen and (max-width: 570px) {
                width: 100%;
            }
            @media screen and (max-width: 480px) {
            }
            .header-main{
                font-size:2.3rem;
                color: #4689F1;
                font-weight: normal;
                font-weight: 700;
            }
            .header-content{
                @include d-flex-center;
                color: #4689F1;
                font-size: 1.8rem;
                font-weight: normal;
                text-align: center;
            }
        }
    }
    .payment-packages-content{
        border-radius: 20px;
        flex: 1 0 1px;
        width: 90%;
        max-height: 80%;
        @include d-flex(row,flex-start,stretch);
        .packages-items{
            overflow: hidden;
            position: relative;
            flex: 1 0 1px;
            @include d-flex(column,flex-start,center);
            padding: 30px 10px;
            background: rgba(245, 249, 255, 0.5);
            
            &:not(:last-child){
                border-right: 1px solid #BCD5FA;
            }
            &:last-child{
                border-radius: 0 20px 20px 0;
            }
            &:first-child{
                border-radius: 20px 0 0 20px;
            }
            .item-header{
                @include d-flex(row,flex-start,center);
                width: 100%;
                font-size: 2rem;
                color: #4689F1;
                font-weight: 700;
                padding: 20px;
                text-align: center;
            }

            .items-content{
                @include d-flex(row,flex-start,center);
                width: 100%;
                padding: 10px;
                font-size: 1.7rem;
            }
             
            .item-price{
                user-select: none;
                @include d-flex-center;
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%,0);
                padding: 20px;
                background: rgba(250, 252, 255, 0.5);
                font-size: 2.5rem;
            }
        }
    }
}
</style>