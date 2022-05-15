<template>
    <div class="link-ceator-main">
        <div class="creator-header-wrapper">
            <div class="creator-header">
                <div class="header-main">
                    Copy the Link and Place it on Your Website or Social Networks!
                </div>
                <div class="header-content">
                    If someone clicks on the link on the phone, they will see Whatsapp with the message “ ” which will be sent to the phone number.
                </div>
            </div>
        </div>
        <div class="creator-and-link">
            <div class="creator-wrapper">
                <div class="phone-number-input-wrapper">
                    <div class="number-text">
                        Type your WhatsApp phone number. Make sure you include the country code followed by the area code. E.g.1 for the US, 44 for the UK.
                    </div>
                    <div class="phone-number-input">
                        <input v-model="phoneNumber" placeholder="Phone Number" class="input" autocomplete="false" :maxlength="maxLengthPhoneNumber" spellcheck="false" type="text">
                        <div class="length-control">
                            {{phoneNumberLengthControl}}
                        </div>
                    </div>
                </div>
                <div class="message-input-wrapper">
                    <div class="message-text">
                        What message do you want your customers to see when they contact you?
                    </div>
                    <div class="message-input">
                        <input v-model="message" placeholder="Message" class="input" autocomplete="false" :maxlength="maxLengthMessage" spellcheck="false" type="text">
                        <div class="length-control">
                            {{messageLengthControl}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="link-wrapper">
                <div class="link-text">
                    Your Link
                </div>
                <div class="link-input">
                    <div :style="!urlControl ? '':'color:#000'" class="link">
                        <template v-if="!urlControl">
                            Link
                        </template>
                        <template v-else>
                            {{sendMessageURL}}
                        </template>
                    </div>
                    <Icon 
                        @clickEvent="copyText"
                        icon="bordered-copy.svg"
                        :width="{
                            default:'25',
                            lg:'23',
                            md:'21',
                            sm:'19',
                            xs:'17',
                        }"
                        pointer
                        iconColor="#3bb0f0"
                    />
                </div>
                <div class="copy-text">
                    Copy this link and put it on the site or in social networks. <br>
                        When clicking on the link from the phone, the client will display WhatsApp with the message <br>
                        <b v-if="message.length > 0">"{{message}}"</b> <b v-else>“Message Text”</b> for the number <b
                            v-if="phoneNumber.length > 0">"{{phoneNumber}}"</b> <b v-else>“Phone Number”</b> .
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/generic_components/icons/Icons.vue"
import {mapMutations} from "vuex"
export default {
    components:{
        Icon,
    },
    data(){
        return{
            message:"",
            phoneNumber:"",
            maxLengthPhoneNumber: 13,
            maxLengthMessage:1000,
            link:"",
        }
    },
    computed:{
        urlControl() {
            if (this.phoneNumber.length > 11 && this.message.length > 0) 
                return true

            return false
            
        },
        sendMessageURL() {
            return `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(this.message)}`
        },
        phoneNumberLengthControl(){
            return `${this.phoneNumber.length} / ${this.maxLengthPhoneNumber}`
        },
        messageLengthControl(){
            return `${this.message.length} / ${this.maxLengthMessage}`
        }
    },
    methods:{
        ...mapMutations([
            "setAlert"
        ]),
        copyText(){
            if(this.urlControl){
                navigator.clipboard.writeText(this.sendMessageURL)
                this.setAlert({
                    title:'Copying to clipboard was successful!',
                    type:'success'
                })
            }
            else{
                this.setAlert({
                    title:'Nothing found to copy',
                    type:'warning'
                })
            }
            
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";

.link-ceator-main{
    width: 100%;
    height: 100%;
    overflow: auto;
    @include d-flex(column,flex-start,center);
    .creator-header-wrapper{
        flex: 0 0 auto;
        width: 100%;
        @include d-flex-center;
        .creator-header{
            border-radius: 10px;
            padding: 15px;
            width: 700%;
            @include d-flex(column,flex-start,center);
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
                color: #3EB9FC;
                font-weight: normal;
            }
            .header-content{
                @include d-flex-center;
                color: #363636;
                font-size: 1.8rem;
                font-weight: normal;
                text-align: center;
            }
        }
    }
    .creator-and-link{
        flex: 1 0 1px;
        @include d-flex(column,space-around,center);
        width: 100%;
        gap: 50px;
        padding: 50px;
        .creator-wrapper{
            @include d-flex(column,center,center);
            background: rgba(245, 249, 255, 0.5);
            box-shadow: 0px 6px 4px rgba(183, 207, 243, 0.25);
            border-radius: 15px;
            padding: 20px;
            gap: 10px;
            flex: 1 0 1px;
            width: 90%;
            position: relative;
            .phone-number-input-wrapper{
                @include d-flex(column,flex-start,stretch);
                width: 50%;
                gap: 10px;
                .number-text{
                    @include d-flex(row,flex-start,center);
                    font-size: 1.3rem;
                    color: #3EB9FC;
                }
                .phone-number-input{
                    position: relative;
                    @include d-flex(column,center,center);
                    width: 100%;
                    .input{
                        appearance: none;
                        width: 100%;
                        outline: none;
                        padding: 6px;
                        font-size: 1.6rem;
                        background-color: #fff;
                        border-radius: 4px;
                    }
                    .length-control{
                        width: 100%;
                        @include d-flex(row,flex-end,center);
                        color: #3EB9FC;
                        font-size: 1.3rem;
                    }
                }
            }
            .message-input-wrapper{
                @include d-flex(column,flex-start,stretch);
                width: 50%;
                gap: 10px;
                .message-text{
                    @include d-flex(row,flex-start,center);
                    font-size: 1.3rem;
                    color: #3EB9FC;
                }
                .message-input{
                    position: relative;
                    @include d-flex(column,center,center);
                    width: 100%;
                    .input{
                        appearance: none;
                        width: 100%;
                        outline: none;
                        padding: 6px;
                        font-size: 1.6rem;
                        background-color: #fff;
                        border-radius: 4px;
                    }
                    .length-control{
                        width: 100%;
                        @include d-flex(row,flex-end,center);
                        color: #3EB9FC;
                        font-size: 1.3rem;
                    }
                }
            }
        }
        .link-wrapper{
            @include d-flex(column,center,center);
            background: rgba(245, 249, 255, 0.5);
            box-shadow: 0px 6px 4px rgba(183, 207, 243, 0.25);
            border-radius: 15px;
            padding: 20px;
            gap: 10px;
            flex: 1 0 1px; 
            width: 90%;
            position: relative;
            .link-text{
                font-weight: 700;
                width: 50%;
                @include d-flex(row,flex-start,center);
                color: #3EB9FC;
                font-size: 1.5rem;
            }
            .link-input{
                width: 50%;
                @include d-flex-center;
                background-color: #fff;
                padding: 10px;
                .link{
                    flex: 1 0 auto;
                    color: #B3B3B3;
                    font-size: 1.5rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            .copy-text{
                width: 50%;
                color: #3EB9FC;
                font-size: 1.2rem;
            }
        }
    }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>