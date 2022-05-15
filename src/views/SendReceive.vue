<template>
    <div id="send-receive-main" class="send-receive-main">
        <div class="api-side-wrapper">
            <div class="try-api">
                You Can Try Api From Here !
            </div>
            <div class="api-side">
                <div class="choose-api-and-inputs">
                    <div class="choose-api">
                        <div class="choose-api-header">
                            <div class="choose-api-text">
                                Choose API Methods
                            </div>
                            <div :style="selectedApiObj.type === 'POST' ? 'color:#02AF02':'color:#3C79E6'" v-if="apiListArr.length!=0" class="api-method-type">
                                {{selectedApiObj.type}}
                            </div>
                        </div>
                        <div class="api-list-wrapper">
                            <!-- <div class="back-api">
                                <img class="left-filled-arrow" src="@/assets/icons/arrow-left-filled.svg" alt="">
                            </div> -->
                            <div class="api-list">
                                <div v-if="apiListArr.length != 0" class="api-list-main">
                                    <div 
                                        :style="getStyle(item)" 
                                        @click="selectApi(item)" 
                                        v-for="(item,i) in apiListArr" 
                                        :key="'apiItem'+i" 
                                        class="api-list-item-card"
                                        
                                    >
                                        <div :style="item.type==='POST'?'background-color: #02AF02;':'background-color:#3C79E6'" class="api-list-item-card-header">
                                            <img class="whapi-text-icon" src="@/assets/icons/whapi-text.svg" alt="">
                                            <div class="headeer-text">
                                                {{item.title}}
                                            </div>
                                        </div>
                                        <div class="api-list-card-content">
                                            {{item.url}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="next-api">
                                <img class="right-filled-arrow" src="@/assets/icons/arrow-right-filled.svg" alt="">
                            </div> -->
                        </div>
                    </div>
                    <div class="choose-api-requirement">
                        <div v-if="apiListArr.length != 0" class="requirement-header">
                            {{selectedApiObj.url}}
                        </div>
                        <div v-if="apiListArr.length != 0" class="requirements">
                            <div v-for="(item,i) in selectedApiObj.parameters" :key="'apiInput'+i" class="input-wrapper">
                                <div @mouseenter="overIn=item.title" @mouseleave="overIn=''" class="input-name">
                                    {{startCase(item.title)}}
                                </div>
                                <input :placeholder="item.placeHolder" class="api-number-input" type="text" autocomplete="false" spellcheck="false" v-model="item.inputHolder">
                                <transition name="fade">
                                    <div :key="'inputInfo'+i" v-if="overIn===item.title" class="input-info">
                                        {{item.description}}
                                    </div>
                                </transition>
                                
                            </div>
                            <div  class="send-button">
                                <div @click="sendToTerminal" class="button">
                                    SEND
                                </div>
                            </div>
                        </div>
                        <div class="fill-input-text">
                            You can {{lowerCase(selectedApiObj.title)}} with Whapi by filling in the fields
                        </div>
                    </div>
                </div>
                <div class="curl-wrapper">
                    <div class="icon-and-curl-code">
                        <Icon 
                            icon="curl.svg"
                            :width="{
                                default:'25',
                                lg:'23',
                                md:'21',
                                sm:'19',
                                xs:'17',
                            }"
                            iconColor="#00EFD1"
                            pointerNone
                        />
                        <div class="curl-code">
                            {{stringShorter(curlCode,100)}}
                        </div>
                    </div>
                    <div class="select-and-copy">
                        <select @change="changeCurlCode" class="curl-select" v-model="curlHolder" name="" id="">
                            <option v-for="(item,i) in curlType" :key="'curlType'+i" :value="item.value">{{item.title}}</option>
                        </select>
                        <div @click="copyCurlCode" class="copy">
                            <Icon 
                                icon="copy.svg"
                                :width="{
                                    default:'25',
                                    lg:'23',
                                    md:'21',
                                    sm:'19',
                                    xs:'17',
                                }"
                                iconColor="#2196F3"
                                pointerNone
                            />
                        </div>
                    </div>
                </div>
                <div class="api-info-wrapper">
                    <div class="api-doc-icon">
                        <Icon 
                            icon="api-info.svg"
                            :width="{
                                default:'30',
                                lg:'28',
                                md:'26',
                                sm:'24',
                                xs:'22',
                            }"
                            iconColor="#00E4D5"
                        />
                    </div>
                    <div class="api-info-main">
                        <div class="api-info-header">
                            <div class="api-url">
                                {{selectedApiObj.url}}
                            </div>
                            <div class="api-url-info">
                                {{selectedApiObj.apiAbout}}
                            </div>
                        </div>
                        <div class="api-info-table">
                            <div class="api-info-table-main-header">
                                Parameters
                            </div>
                            <div class="api-info-table-main">
                                <div class="table-header">
                                    <div v-for="(item,i) in apiInfoTableHeaders" :key="'tableHeader'+i" class="table-header-item">
                                        {{item}}
                                    </div>
                                </div>
                                <div class="table-content">
                                    <div v-for="(item,i) in selectedApiObj.parameters" :key="'paramaters'+i" class="table-content-item">
                                        <div class="parameter-content">
                                            {{item.title}}
                                        </div>
                                        <div class="description-content">
                                            {{item.description}}
                                        </div>
                                        <div class="data-type-content">
                                            {{item.dataType}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div @click="routeDocumentation" class="documentation-button">
                        <div class="api-doc-button">
                            Documentation
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <Terminal v-if="isOpenterminal" :isOpenTerminal.sync="isOpenterminal" :selectedApi="selectedApiForTerminal"/>
        </transition>
        
    </div>
</template>

<script>
import Icon from "@/generic_components/icons/Icons.vue"
import {apiList,curlType} from "@/enum/enum.js"
import _ from "lodash"
import {startCase,lowerCase} from "lodash"
import {mapMutations} from "vuex"
import Terminal from "@/components/send-receive-components/Terminal.vue"
import {cookieParser,stringShorter} from "@/utils/utils.js"
import axios from "axios"
import {SERVER_URL} from "@/control.js"
export default {
    data(){
        return{
            lowerCase,
            stringShorter,
            cookieParser,
            apiInfoTableHeaders:[
                "Paramater",
                "Description",
                "Data Type"
            ],
            overIn:"",
            startCase,
            apiListArr:[],
            apiList,
            apiNumber:"",
            apiMessage:"",
            curlType,
            curlHolder:"curl",
            selectedApi:"sendMessage",
            selectedApiObj:{},
            selectedApiForTerminal:{},
            curlCode:"Waiting for events",
            isOpenterminal:false,
            tempCurlholder:"",
        }
    },
    methods:{
        getStyle(item){
            return this.getStyle1(this.selectedApi === item.value ? 'transform:scale(1.2)':'filter:blur(3px)',item) 
        },
        getStyle1(style,item){
            return item.type==='POST'?`${style};border: 1px solid #02AF02`:`${style};border:1px solid #3C79E6`
        },
        async sendToTerminal(){
            const response = await axios.get(`${SERVER_URL}/account/selected/${cookieParser().token}`).catch(err=>{
                console.log({err})
                this.setAlert({
                    title:'Can not get selected number',
                    type:'danger'
                })
                return
            })
            console.log({response})
            if(!response){
                this.setAlert({
                    title:'Server not responding',
                    type:'danger'
                })
                return
            }
            if(response.data){
                if(response.data == ""){
                    this.setAlert({
                        title:'Please select a number from Whatsapp Numbers',
                        type:'danger',
                    })
                     return
                }

                for(let item of this.selectedApiObj.parameters){
                    if(item.inputHolder===''){
                        this.setAlert({
                            title:"Required fields must be filled",
                            type:'warning'
                        })
                        return
                    }
                }
                this.selectedApiForTerminal = _.cloneDeep(this.selectedApiObj);
                this.curlCode = this.selectedApiObj[this.curlHolder]
                for(let item of this.selectedApiObj.parameters){
                    this.curlCode = this.curlCode.replace(`{{${_.startCase(item.title)}}}`,item.inputHolder);
                    item.inputHolder = '';
                }
                this.curlCode = this.curlCode.replace('{{Token}}',this.cookieParser().token);
                this.isOpenterminal = true;
                setTimeout(() => {
                    document.getElementById('send-receive-main').scroll({
                        top: 5000,
                        behavior: 'smooth'
                    });
                }, 100);
            }
            else{
                this.setAlert({
                    title:'Please select a number from Whatsapp Numbers',
                    type:'danger',
                })
            }
        },
        routeDocumentation(){
            this.$router.push(this.$route.query.redirect || `/api-documentation`);
        },
        copyCurlCode(){
            if(this.curlCode != 'Waiting for events'){
                navigator.clipboard.writeText(this.curlCode)
                this.setAlert({
                    title:'Copying to clipboard was successful!',
                    type:'success'
                })
            }
            else{
                this.setAlert({
                    title:'Curl code not found',
                    type:'warning'
                })
            }
        },
        over(item){
            this.overIn = item;
        },
        leave(){
            this.overIn = "";
        },
        changeCurlCode(){
            if(this.curlCode != 'Waiting for events'){
                this.curlCode = this.selectedApiObj[this.curlHolder]
                for(let item of this.selectedApiForTerminal.parameters){
                    this.curlCode = this.curlCode.replace(`{{${_.startCase(item.title)}}}`,item.inputHolder);
                }
                this.curlCode = this.curlCode.replace('{{Token}}',this.cookieParser().token);
                
            }
        },
        selectApi(item){
            if(item.value!=this.selectedApi){
                this.curlCode = "Waiting for events";
                this.selectedApi = item.value;
                this.selectedApiObj = item;
            }
        },
        ...mapMutations([
            "setAlert"
        ])
    },
    mounted(){
        this.apiListArr=_.cloneDeep(apiList);
        this.selectedApiObj = _.cloneDeep(this.apiListArr.find(e=>e.value === this.selectedApi))
    },
    computed:{
        
    },
    components:{
        Icon,
        Terminal,
    },
    
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.send-receive-main{
    width: 100%;
    height: 100%;
    overflow: auto;
    .api-side-wrapper{
        position: relative;
        width: 100%;
        height: 100%;
        @include d-flex(column,center,center);
        gap: 10px;
        .try-api{
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%,0);
            font-size: 2rem;
            font-weight: 700;
            color: #2196F3;
        }
        .api-side{
            width: 90%;
            background: rgba(245, 249, 255, 0.5);
            height: 90%;
            border-radius: 15px;
            @include box-shadow(0px,4px,8px,2px,rgba(183, 207, 243, 0.25));
            @include d-flex(column,flex-start,stretch);
            padding: 25px;
            gap: 20px;
            .choose-api-and-inputs{
                @include d-flex(row,space-around,stretch);
                flex: 0 0 auto;
                .choose-api{
                    background-color: #fff;
                    border-radius: 10px;
                    width: 45%;
                    @include d-flex(column,flex-start,stretch);
                    padding: 10px;
                    gap: 30px;
                    .choose-api-header{
                        flex: 0 0 auto;
                        @include d-flex(row,space-between,center);
                        .choose-api-text{
                            @include d-flex-center;
                            font-size: 1.8rem;
                        }
                        .api-method-type{
                            @include d-flex-center;
                            font-size: 2.3rem;
                            font-weight: 700;
                        }
                    }
                    .api-list-wrapper{
                        flex: 1 0 1px;
                        @include d-flex(row,flex-start,stretch);
                        gap: 5px;
                        .back-api{
                            flex: 0 0 auto;
                            @include d-flex-center;
                            padding: 5px;
                        }
                        .api-list{
                            flex: 1 0 1px;
                            @include d-flex(row,flex-start,center);
                            padding: 10px;
                            .api-list-main{
                                width: 100%;
                                @include d-flex(row,space-evenly,stretch);
                                gap: 25px;
                                .api-list-item-card{
                                    transition: all .1s linear;
                                    user-select: none;
                                    border-radius: 10px;
                                    width: 150px;
                                    @include d-flex(column,flex-start,stretch);
                                    cursor: pointer;
                                    
                                    .api-list-item-card-header{
                                        max-height: 75px;
                                        flex: 1 0 1px;
                                        border-radius: 10px 10px 0 0;
                                        padding: 6px;
                                        @include d-flex(column,center,center);
                                        word-break: break-all;
                                        word-wrap: break-word;
                                        color: #fff;
                                        gap: 8px;
                                        pointer-events: none;
                                        .whapi-text-icon{
                                            width: 40%;
                                        }
                                        .headeer-text{
                                            font-size: 1.8rem;
                                        }
                                    }
                                    .api-list-card-content{
                                        height: 100%;
                                        @include d-flex-center;
                                        padding: 5px;
                                        font-size: 1.5rem;
                                        text-align: center;
                                        word-break: break-all
                                    }
                                }
                            }
                        }
                        .next-api{
                            @extend .back-api;
                        }
                    }
                }
                .choose-api-requirement{
                    background-color: #fff;
                    border-radius: 10px;
                    width: 45%;
                    @include d-flex(column,flex-start,stretch);
                    padding: 10px;
                    gap: 30px;
                    .requirement-header{
                        flex: 0 0 auto;
                        @include d-flex(row,flex-start,center);
                        font-size: 1.8rem;
                        font-weight: 700;

                        color: #242424;
                    }
                    .requirements{
                        @include d-flex(column,center,center);
                        gap: 10px;
                        flex: 1 0 1px;
                        .input-wrapper{
                            border-radius: 99px;
                            width: 80%;
                            @include d-flex-center;
                            background-color: #F0F0F0;
                            position: relative;
                            .input-name{
                                user-select: none;
                                flex: 1 0 1px;
                                transition: all .1s linear;
                                padding:5px;
                                font-size: 2rem;
                                @include d-flex-center;
                                color: #fff;
                                background-color: #02AF02;
                                border-radius: 99px;
                            }
                            .api-number-input{
                                flex: 3 0 1px;
                                padding: 5px 10px;
                                outline: none;
                                border-radius: 0 10px 10px 0;
                                
                                font-size: 2rem;
                            }
                            .input-info{
                                position: absolute;
                                top: 50%;
                                right: 105%;
                                transform: translate(0,-50%);
                                width: fit-content;
                                padding: 6px;
                                max-width: 500px;
                                font-size: 1.6rem;
                                @include d-flex-center;
                                text-align: center;
                                border-radius: 4px;
                                background-color: rgb(228, 228, 228);
                            }
                        }
                        .send-button{
                            width: 100%;
                            padding: 0 20px;
                            @include d-flex(row,flex-end,center);
                            .button{
                                @include d-flex-center;
                                color: #fff;
                                font-size: 1.8rem;
                                border-radius: 99px;
                                cursor: pointer;
                                padding: 6px 28px;
                                background-color: #02AF02;
                                transition: all .1s linear;
                                &:hover{
                                    filter: brightness(110%);
                                }
                            }
                        }
                    }
                    .fill-input-text{
                        @include d-flex-center;
                        font-size: 1.5rem;
                        color: #000;
                        text-align: center;
                    }
                }
                
            }
            .curl-wrapper{
                width: 100%;
                flex: 0 0 auto;
                @include d-flex(row,space-between,stretch);
                background-color: #fff;
                border-radius: 99px;
                .icon-and-curl-code{
                    @include d-flex(row,flex-start,center);
                    gap: 30px;
                    padding: 10px;
                    .curl-code{
                        flex: 1 0 1px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        font-size: 1.6rem;
                        color: #4f4f4f;
                        font-weight: 700;
                    }
                }
                .select-and-copy{
                    @include d-flex(row,flex-start,center);
                    gap: 10px;
                    .curl-select{
                        cursor: pointer;
                        appearance: menulist;
                        padding: 6px;
                        font-size: 1.6rem;
                        outline: none;
                        border: 1px solid #2196F3;
                        border-radius: 5px;
                    }
                    .copy{
                        height: 100%;
                        cursor: pointer;
                        @include d-flex-center;
                        padding: 10px 20px;
                        background-color: #F0F0F0;
                        border-radius: 0 99px 99px 0;
                    }
                }
            }
            .api-info-wrapper{
                flex: 1 0 1px;
                background-color: #fff;
                border-radius: 15px;
                @include d-flex(row,flex-start,stretch);
                padding: 15px;
                gap: 20px;
                .api-doc-icon{
                    @include d-flex(column,flex-start,center);
                    flex: 0 0 auto;
                }
                .api-info-main{
                    flex: 1 0 1px;
                    font-size: 1.6rem;
                    @include d-flex(column,flex-start,flex-start);
                    gap: 20px;
                    .api-info-header{
                        @include d-flex(column,flex-start,flex-start);
                        .api-url{
                            @include d-flex-center;
                            font-weight: 700;
                        }
                        .api-url-info{
                            color: #000;
                        }
                    }
                    .api-info-table{
                        @include d-flex(column,flex-start,flex-start);
                        .api-info-table-main-header{
                            color: #02AF02;
                            font-size: 1.9rem;
                            padding-left: 10px;
                            font-weight: 700;
                        }
                        .api-info-table-main{
                            @include d-flex(column,flex-start,flex-start);
                            color: #454545;
                            .table-header{
                                padding: 5px;
                                border-bottom: 1px solid #E9E9E9;
                                gap: 15px;
                                @include d-flex(row,flex-start,center);
                                .table-header-item{
                                    width: 200px;
                                    @include d-flex(row,flex-start,center);
                                    font-size: 1.7rem;
                                    font-weight: 700;
                                }
                            }
                            .table-content{
                                @include d-flex(column,flex-start,flex-start);
                                .table-content-item{
                                    padding: 5px;
                                    
                                    @include d-flex(row,flex-start,center);
                                    gap: 15px;
                                    &:not(:last-child){
                                        border-bottom: 1px solid #E9E9E9;
                                    }
                                    .parameter-content{
                                        @include d-flex(row,flex-start,center);
                                        width: 200px;
                                        word-break: break-all;
                                        font-size: 1.6rem;
                                    }
                                    .description-content{
                                        @extend .parameter-content;
                                    }
                                    .data-type-content{
                                        @extend .parameter-content;
                                    }
                                }
                            }
                        }
                    }
                }
                .documentation-button{
                    @include d-flex(column,flex-end,center);
                    .api-doc-button{
                        transition: all .1s linear;
                        @include d-flex-center;
                        padding: 6px 18px;
                        font-size: 2rem;
                        color: #fff;
                        background: linear-gradient(180deg, #3EB9FC 0%, #5F90FC 100%);
                        border-radius: 8px;
                        cursor: pointer;
                        &:hover{
                            filter: brightness(110%);
                        }
                    }
                }
            }
        }
    }
    
}
</style>