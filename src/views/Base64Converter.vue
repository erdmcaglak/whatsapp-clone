<template>
    <div class="base-64-main">
        <div class="converter-header-wrapper">
            <div class="converter-header">
                <div class="header-main">
                    Encode File to Base64
                </div>
                <div class="header-content">
                    Upload your files to send videos and pictures via API.
                </div>
            </div>
        </div>
        <div class="drop-and-base64">
            <div class="drop-wrapper">
                <!-- <div class="card-icon">
                    <img class="icon" src="@/assets/icons/base-64.svg" alt="">
                </div> -->
                <div class="drop-text">
                    Add your files here
                </div>
                <div class="drop">
                    <input @change="handleFileInput" type="file">
                    <img class="base-64-button" src="@/assets/icons/base64-button.svg" alt="">
                    <div class="upload-text">Click button or drag to insert</div>
                </div>
            </div>
            <div class="base-64-wrapper">
                <!-- <div class="card-icon">
                    <img class="icon" src="@/assets/icons/drop-file.svg" alt="">
                </div> -->
                <div class="base-64-text">
                    Base64
                </div>
                <div class="base-64-content-wrapper">
                    <div class="base-64">
                        {{base64}}
                    </div>
                    <div @click="copyBase64" class="copy">
                        <Icon 
                            icon="copy.svg"
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
                </div>
                
                
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/generic_components/icons/Icons.vue"
import {mapMutations} from "vuex"
export default {
    data(){
        return{
            base64:"",
        }
    },
    components:{
        Icon
    },
    methods:{
        ...mapMutations([
            "setAlert"
        ]),
        copyBase64(){
            if(this.base64!=""){
                navigator.clipboard.writeText(this.base64)
                this.setAlert({
                    title:"Copying to clipboard was successful!",
                    type:'success'
                })
            }
            else{
                this.setAlert({
                    title:"Base64 is empty",
                    type:'warning'
                })
            }
        },
        handleFileInput(e) {
            var file  = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=> {
                this.base64=reader.result
            };
            reader.onerror =err=> {
                console.log('Error: ', err);
            };
        },
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.base-64-main{
    width: 100%;
    height: 100%;
    overflow: hidden;
    @include d-flex(column,space-around,center);
    gap: 30px;
    .converter-header-wrapper{
        flex: 0 0 auto;
        width: 100%;
        @include d-flex-center;
        .converter-header{
            border-radius: 10px;
            padding: 15px;
            width: 50%;
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
    
    .drop-and-base64{
        flex: 1 0 1px;
        @include d-flex(column,space-around,center);
        width: 100%;
        gap: 50px;
        padding: 30px;
        .drop-wrapper{
            @include d-flex(column,center,center);
            background: rgba(245, 249, 255, 0.5);
            box-shadow: 0px 6px 4px rgba(183, 207, 243, 0.25);
            border-radius: 15px;
            padding: 20px;
            gap: 10px;
            height: 90%;
            width: 90%;
            position: relative;
            // .card-icon{
            //     user-select: none;
            //     pointer-events: none;
            //     position: absolute;
            //     left: 50%;
            //     transform: translate(-50%,0);
            //     top: -50px;
            //     padding: 30px;
            //     @include d-flex-center;
            //     background-color: #3EB9FC;
            //     border-radius: 99px;
            //     .icon{
            //         width: 40px;
            //     }
            // }
            .drop-text{
                flex: 0 0 auto;
                width: 50%;
                @include d-flex(row,flex-start,center);
                font-size: 1.7rem;
                color: #3C6DB2;
            }
            .drop{
                flex: 1 0 1px;
                background-color: #fff;
                width: 50%;
                border-radius: 10px;
                @include d-flex(column,center,center);
                position: relative;
                .base-64-button{
                    width: 75px;
                }
                .upload-text{
                    @include d-flex-center;
                    font-size: 1.7rem;
                    color: #3C6DB2;
                }
                input {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    cursor: pointer;
                    opacity: 0.0;
                    filter: alpha(opacity=0);
                    z-index: 1;
                }
            }
        }
        .base-64-wrapper{
            position: relative;
            @include d-flex(column,center,center);
            background: rgba(245, 249, 255, 0.5);
            box-shadow: 0px 6px 4px rgba(183, 207, 243, 0.25);
            border-radius: 15px;
            padding: 20px;
            gap: 10px;
            height: 90%;
            width: 90%;
            // .card-icon{
            //     user-select: none;
            //     pointer-events: none;
            //     position: absolute;
            //     left: 50%;
            //     transform: translate(-50%,0);
            //     top: -50px;
            //     padding: 30px;
            //     @include d-flex-center;
            //     background-color: #3EB9FC;
            //     border-radius: 99px;
            //     .icon{
            //         width: 40px;
            //     }
            // }
            .base-64-text{
                flex: 0 0 auto;
                width: 50%;
                @include d-flex(row,flex-start,center);
                font-size: 1.7rem;
                color: #3C6DB2;
            }
            .base-64-content-wrapper{
                flex: 1 0 1px;
                @include d-flex-center;
                width:50%;
                position: relative;
                .base-64{
                    flex: 1 0 1px;
                    background-color: #fff;
                    border-radius: 10px;
                    position: relative;
                    word-break: break-all;
                    overflow: auto;
                    padding: 10px;
                    width:100%;
                    height: 100%;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                }
                .copy{
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                }
            }
            
        }
    }
}
</style> 