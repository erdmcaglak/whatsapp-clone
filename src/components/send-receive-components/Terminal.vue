<template>
    <div class="terminal-main">
        <div class="terminal-wrapper">
            <div class="terminal">
                <div class="terminal-token">
                    <div class="token">
                        <b>Your Token:</b> {{stringShorter(getToken,100)}}
                    </div>
                    <div @click="closeTerminal" class="close-terminal">
                        Close terminal
                    </div>
                </div>
                <div class="last-requests-and-logs">
                    <div class="last-requests-wrapper">
                        <div class="last-requests">
                            <div @click="copyItem(item)" v-for="(item,i) in lastRequests" :key="'lastRequests'+i" class="last-request-item">
                                <span style="display:flex;justify-content:center;align-items:flex-start;height:100%">></span> {{item}}
                            </div>
                        </div>
                        <div class="terminal-input">
                            <input
                                @keypress.enter="pushLastRequests"
                                autocomplete="false" 
                                spellcheck="false" 
                                v-model="terminalInput" 
                                type="text"
                                class="input"
                                placeholder="Type your code"
                            >
                            <Icon 
                                icon="send.svg"
                                :width="{
                                    default:'20',
                                    lg:'18',
                                    md:'16',
                                    sm:'15',
                                    xs:'14',
                                }"
                                pointer
                                iconColor="#fff"
                                @clickEvent="pushLastRequests"
                            />
                        </div>
                    </div>
                    <div class="log-wrapper">
                        <div class="log-terminal-header">
                            LOGS
                        </div>
                        <div @click="copyItem(item)" v-for="(item,i) in lastLogs" :key="'lastRequests'+i" class="last-request-item">
                            {{item}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {cookieParser,stringShorter} from "@/utils/utils.js"
import Icon from "@/generic_components/icons/Icons.vue"
import _ from "lodash"
import {mapMutations} from "vuex"
import {SERVER_URL} from "@/control.js"
import axios from "axios"
export default {
    props:{
        selectedApi:{type:Object},
        isOpenTerminal:{type:Boolean},
    },
    data(){
        return{
            stringShorter,
            terminalInput:"",
            lastRequests:[],
            lastLogs:[],
            copyCount:0,
            copyTextArr:[
                "Copying to clipboard was successful!",
                "Double copy successful",
                "Triple copy successful",
                "Super copy successful",
                "Mega copy successful"
            ],
            tempHolder:"",
            tempTimeOut:null,
        }
    },
    methods:{
        closeTerminal(){
            this.$emit('update:isOpenTerminal',false);
        },
        copyItem(item){
            if(this.tempHolder != item){
                this.copyCount = 0;
                navigator.clipboard.writeText(item)
                this.setAlert({
                    title:this.copyTextArr[this.copyCount],
                    type:'success'
                })
                this.tempHolder=item;
            }
            else{
                clearTimeout(this.tempTimeOut)
                if(this.copyCount!=4)
                    this.copyCount++;
                navigator.clipboard.writeText(item)
                this.setAlert({
                    title:this.copyTextArr[this.copyCount],
                    type:this.copyCount===4?'danger':'success'
                })
                this.tempTimeOut = setTimeout(() => {
                    this.copyCount = 0
                    this.tempHolder=""
                }, 5e3);
            }
        },
        async pushLastRequests(){
            console.log('-------terminal---------')
            if(this.terminalInput!=''){
                let tempApiHolder = this.terminalInput.split(' ')[0].split('/')[1];
                if(tempApiHolder===''){
                    this.setAlert({
                        title:'Invalid terminal format',
                        type:'warning'
                    })
                    return
                }
                if(this.selectedApi.type==='POST'){
                    let mainApi="";
                    mainApi += tempApiHolder +'/'+`${cookieParser().token}`;
                    let apiBody={};
                    let _apiHolderArr=this.terminalInput.split(' ');
                    for(let i=1;i<_apiHolderArr.length;i++){
                        _.set(apiBody,[`${_apiHolderArr[i].split(':')[0]}`],_apiHolderArr[i].split(':')[1])
                    }
                    console.log({mainApi,apiBody})
                    const response = await axios.post(`${SERVER_URL}/${mainApi}`,apiBody).catch(err=>{
                        console.log(`Error in ${mainApi}`)
                        console.log({err})
                    })
                    if(!response){
                        this.setAlert({
                            title:'Server not responding',
                            type:'danger'
                        })
                        return
                    }   
                    if(response.data){
                        this.setAlert({
                            title:'Api worked',
                            type:'success'
                        })
                        this.lastLogs.unshift(response.data)
                    }
                    else{
                        this.setAlert({
                            title:'Api not found',
                            type:'danger'
                        })
                        return
                    }
                    console.log('-----------anan response ---------------')
                    console.log({response})
                }
                else{
                    console.log('--------------GET----------------')
                    const response = await axios.get(`${SERVER_URL}/account/selected/${cookieParser().token}`).catch(err=>{
                        console.log({err})
                        this.setAlert({
                            title:'Can not get selected number',
                            type:'danger'
                        })
                        return
                    })
                    if(!response){
                        this.setAlert({
                            title:'Server not responding',
                            type:'danger'
                        })
                        return
                    }
                    if(response.data){
                        if(response.data===''){
                            this.setAlert({
                                title:'Please select a number',
                                type:'warning'
                            })
                            return
                        }
                        console.log({l:this.terminalInput})
                        if(response.data == ""){
                            this.setAlert({
                                title:'Please select a number from Whatsapp Numbers',
                                type:'danger',
                            })
                        }
                        this.terminalInput = this.terminalInput.replace('{{fromNumber}}',response.data)
                    }
                    console.log({i:this.terminalInput})
                    const res = await axios.get(`${SERVER_URL}${this.terminalInput}`).catch(err=>{
                        console.log(`Error in ${this.terminalInput}`)
                        console.log({err})
                        this.setAlert({
                            title:'Api not found',
                            type:'danger'
                        })
                        return
                    })
                    console.log({getResponse:res})
                    if(!res){
                        this.setAlert({
                            title:'Server not responding',
                            type:'danger'
                        })
                        return
                    }
                    if(res.data){
                        this.setAlert({
                            title:'Api worked',
                            type:'success'
                        })
                        this.lastLogs.unshift(res.data);
                    }
                    else{
                        this.setAlert({
                            title:'Api not found',
                            type:'danger'
                        })
                        return
                    }
                }
                
                
                this.lastRequests.unshift(this.terminalInput)
                this.terminalInput = '';
            }
        },
        ...mapMutations([
            "setAlert"
        ])
    },
    computed:{
        getToken(){
            return cookieParser().token
        }
    },
    mounted(){
        this.terminalInput = this.selectedApi.terminal
        for(let item of this.selectedApi.parameters){
            this.terminalInput = this.terminalInput.replace(`{{${_.startCase(item.title)}}}`,encodeURIComponent(`${item.inputHolder}`))
        }
        this.terminalInput = this.terminalInput.replace('{{Token}}',this.getToken);
        this.pushLastRequests();
        //this.terminalInput = "";
    },
    components:{
        Icon,
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.terminal-main{
    height: 100%;
    width: 100%;
    @include d-flex-center;
    .terminal-wrapper{
        width: 90%;
        height: 90%;
        @include d-flex(column,flex-start,stretch);
        border-radius: 15px;
        @include box-shadow(0px,4px,8px,2px,rgba(183, 207, 243, 0.25));
        background: rgba(245, 249, 255, 0.5);
        padding: 20px;
        .terminal{
            height: 100%;
            @include d-flex(column,flex-start,stretch);
            gap: 10px;
            .terminal-token{
                flex: 0 0 auto;
                @include d-flex(row,space-between,center);
                .token{
                    font-size: 1.9rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .close-terminal{
                    @include d-flex-center;
                    padding: 6px 18px;
                    font-size: 1.7rem;
                    border: 1px solid black;
                    border-radius: 5px;
                    user-select: none;
                    cursor: pointer;
                    transition: all .1s linear;
                    &:hover{
                        background-color: #000;
                        color: #fff;
                    }
                }
            }
            .last-requests-and-logs{
                @include d-flex(row,flex-start,stretch);
                flex: 1 0 1px;
                .last-requests-wrapper{
                    border-right: 1px solid #fff;
                    overflow: hidden;
                    flex: 1 0 1px;
                    @include d-flex(column,flex-start,stretch);
                    .last-requests{
                        overflow: auto;
                        flex: 1 0 1px;
                        background-color: #000;
                        color: #fff;
                        font-size: 1.7rem;
                        @include d-flex(column,flex-start,stretch);
                        padding: 10px;
                        .last-request-item{
                            word-break: break-all;
                            padding: 3px 0;
                            @include d-flex(row,flex-start,center);
                            gap: 5px;
                            user-select: none;
                        }
                    }
                    .terminal-input{
                        padding-right: 10px;
                        background-color: #000;
                        @include d-flex-center;
                        flex: 0 0 auto;
                        border-top: 1px solid #fff;
                        .input{
                            outline: none;
                            width: 100%;
                            background-color: #000;
                            color: #fff;
                            padding: 6px 10px;
                            font-size: 1.7rem;
                            &::placeholder{
                                color: rgb(231, 231, 231);
                            }
                        }
                    }
                }
                .log-wrapper{
                    overflow: hidden;
                    flex: 1 0 1px;
                    background-color: #000;
                    @include d-flex(column,flex-start,stretch);
                    font-size: 1.7rem;
                    color: #fff;
                    .log-terminal-header{
                        position: relative;
                        @include d-flex-center;
                        background-color: #1a1a1a;
                        user-select: none;
                        padding: 10px;
                    }
                    .last-request-item{
                        word-break: break-all;
                        padding: 3px 0;
                        @include d-flex(row,flex-start,center);
                        gap: 5px;
                        user-select: none;
                        word-break: break-all;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                        white-space: pre-wrap;
                    }
                }
            }
        }
    }
}
</style>