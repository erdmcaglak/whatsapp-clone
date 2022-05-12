<template>
    <div class="whatsapp-numbers-main">
        <div class="number-list-main-card">
            <div class="number-list-main-wrapper">
                <div class="card-header">
                    <div class="header-text">
                        {{getLang.whatsappNumbers.yourWaAccount}}
                    </div>
                    <div class="right-side-wrapper">
                        <div class="search-and-input">
                            <input @keyup="searchInNumberList" v-model="accountSearch" spellcheck="false" autocomplete="false" :placeholder="getLang.whatsappNumbers.inputPlaceHolder" class="search-input" type="text">
                            <Icon 
                                icon="search.svg"
                                :width="{
                                    default:'30',
                                    lg:'28',
                                    md:'26',
                                    sm:'24',
                                    xs:'22',
                                }"
                                pointerNone
                                iconColor="#585858"
                            />
                        </div>
                    </div>
                </div>
                <div class="number-list-wrapper">
                    <div class="number-list-main">
                        <div class="number-list-item">
                            <div @click="addNewAccount" class="number-card">
                                <div style="gap:20px" class="number-name">
                                    <div class="icon-wrapper">
                                        <img class="icon" src="@/assets/icons/add-account.svg" alt="">
                                    </div>
                                    <div class="text">Add New Account</div>
                                </div>
                            </div>
                        </div>
                        <div @click="selectNumber(item)" v-for="(item,i) in numberlist" :key="'numberList'+i" class="number-list-item">
                            <div  class="number-card">
                                <div :style="selectedNumber === item.remoteJid?'background-color:#87E8B6':'border: 1px solid #454545;'" class="selected-control"></div>
                                <div class="number-date">
                                    {{moment(item.createdTime).format('DD/MM/YYYY')}}
                                </div>
                                <div class="number-name">
                                    <div class="name">
                                        {{moment.duration(item.endTs - Date.now()).days()}} Day {{moment.duration(item.endTs - Date.now()).hours()}} Hour
                                    </div>
                                    <div class="package-name">
                                        {{item.title}}
                                    </div>
                                </div>
                                <div class="number">
                                    {{item.remoteJid}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <StepperModal :numberListArr.sync="numberList" v-if="isOpenAddAccountModal" :openModal.sync="isOpenAddAccountModal"/>
        </transition>
    </div>
</template>

<script>
import StepperModal from "@/components/whatsapp-numbers-components/StepperModal.vue"
import {mapGetters,mapMutations} from "vuex"
import Icon from "@/generic_components/icons/Icons.vue"
import axios from "axios"
import {SERVER_URL} from "@/control.js"
import _ from "lodash"
import {cookieParser} from "@/utils/utils.js"
import moment from "moment"
export default {
    data(){
        return{
            moment,
            numberlist:[],
            tempNumberList:[],
            isOpenAddAccountModal:false,
            accountSearch:"",
            clickAgain:true,
            selectedNumber:"",
        }
    },
    components:{
        Icon,
        StepperModal,
    },
    methods:{
        async selectNumber(item){
            if(this.clickAgain){
                this.clickAgain=false;
                
                const response = await axios.post(`${SERVER_URL}/account/selected`,{
                    token:cookieParser().token,
                    selectedRemoteJid:item.remoteJid
                }).catch(err=>{
                    console.log('Error in account/selected POST')
                    console.log({err})
                })
                console.log({i:response});
                if(!response){
                    this.setAlert({
                        title:'Server not responding',
                        type:'danger'
                    })
                    return
                }
                if(response.data?.success){
                    this.setAlert({
                        title:'Number select succesful!',
                        type:'success'
                    })
                    this.selectedNumber = item.remoteJid;
                }
                setTimeout(() => {
                    this.clickAgain=true
                }, 3e3);
            }
            else{
                this.setAlert({
                    title:'Too many request',
                    type:'warning'
                })
            }
            
            

        },
        searchInNumberList(){
            if(this.accountSearch === ''){
                this.numberlist = _.cloneDeep(this.tempNumberList);
            }
            else{
                this.numberlist = _.cloneDeep(this.tempNumberList.filter(e=>_.upperCase(e.number).includes(_.upperCase(this.accountSearch)) || _.upperCase(e.name).includes(_.upperCase(this.accountSearch))))
            }
        },
        ...mapMutations([
            "setAlert",
            "setWhapiNumberList",
            "setIsCanBuyFreePackage"
        ]),
        addNewAccount(){
            this.isOpenAddAccountModal=true;
        }
    },
    computed:{
        ...mapGetters([
            "getLang",
            "getWhapiNumberList"
        ])
    },
    destroyed(){
        if(this.selectedNumber === ''){
            this.setAlert({
                title:'Number not selected',
                type:'warning',
            })
        }
    },
    async mounted(){
        let {token} = cookieParser()
        const response = await axios.post(`${SERVER_URL}/account/accounts`,{
            token
        }).catch(err=>{
            this.setAlert({
                title:"Something Error",
                type:'danger'
            })
            console.log({err})
        })

        console.log({response})

        if(!response){
            this.setAlert({
                title:"Server Error",
                type:'danger'
            })
        }else if(response.data?.success){
            if(response.data.userPackages.length>=1){
                this.setWhapiNumberList(_.flattenDeep(response.data.userPackages))
                this.tempNumberList = this.getWhapiNumberList;
                this.numberlist = this.getWhapiNumberList;
                console.log({i:response.data.userPackages.filter(e=>e.id==='0').length===1})
                console.log({k:response.data.userPackages.filter(e=>e.id==='0')})
                console.log({l:response.data.userPackages})
                if(response.data.userPackages){
                    if(_.flattenDeep(response.data.userPackages).filter(e=>e.id==='0').length===1){
                        this.setIsCanBuyFreePackage(false)
                    }
                }
            }
        }
        else{
           this.setAlert({
                title:"Can not get number list",
                type:'danger'
            })
        }
        console.log({token:cookieParser()})
        const res = await axios.get(`${SERVER_URL}/account/selected/${cookieParser().token}`).catch(err=>{
            console.log({err})
            this.setAlert({
                title:'Can not get selected number',
                type:'danger'
            })
            return
        })
        console.log({res})
        if(!res){
            this.setAlert({
                title:'Server not responding',
                type:'danger'
            })
            return
        }
        if(res.data){
            this.selectedNumber = res.data;
            return
        }
        //console.log({response})
    },
    watch:{
        getWhapiNumberList:{
            handler(){
                console.log('whapi numberlist changed')
                console.log({i:this.getWhapiNumberList})
                this.tempNumberList = _.cloneDeep(this.getWhapiNumberList);
                this.numberlist = _.cloneDeep(this.getWhapiNumberList);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.whatsapp-numbers-main{
    @include d-flex-center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .number-list-main-card{
        @include d-flex-center;
        width: 90%;
        height: 90%;
        background-image: url('../assets/icons/blurred-whatsapp-icon.svg');
        background-repeat: no-repeat;
        background-attachment: absolute;
        background-position: right bottom;
        .number-list-main-wrapper{
            border-radius: 20px;
            width: 100%;
            height: 100%;
            background: rgba(245, 249, 255, 0.4);
            @include d-flex(column,flex-start,stretch);
            gap: 30px;
            padding: 30px;
            .card-header{
                @include d-flex(row,space-between,center);
                .header-text{
                    font-size: 2.5rem;
                    color: #585858;
                    font-weight: 500;
                    @include d-flex-center;
                }
                .right-side-wrapper{
                    @include d-flex-center;
                    gap: 30px;
                    .add-new-number{
                        @include d-flex-center;
                        background-color: transparent;
                        font-size: 2rem;
                        padding: 6px 18px;
                        color: #000;
                        border-radius: 10px;
                        user-select: none;
                        cursor: pointer;
                        border: 1px solid black;
                        transition: all .1s linear;
                        &:hover{
                            border: 1px solid #3EB9FC;
                            color: #3EB9FC;
                        }
                    }
                    .search-and-input{
                        @include d-flex-center;
                        border-radius: 99px;
                        padding: 0 10px;
                        border: 1px solid #585858;
                        gap: 5px;
                        .search-input{
                            padding: 6px;
                            font-size: 2rem;
                            outline: none;
                        }
                    }
                }
                
            }
            .number-list-wrapper{
                height: 100%;
                overflow: hidden;
                @include d-flex(column,flex-start,center);
                .number-list-main{
                    width: 100%;
                    overflow: auto;
                    @include d-flex(row,flex-start,flex-start);
                    flex-wrap: wrap;
                    .number-list-item{
                        @include d-flex-center;
                        flex: 0 0 25%;
                        padding: 10px 0;
                        .number-card{
                            position: relative;
                            user-select: none;
                            cursor: pointer;
                            gap: 30px;
                            width: 90%;
                            min-height: 200px;
                            @include d-flex(column,flex-start,stretch);
                            background-color: #fff;
                            border-radius: 10px;
                            @include box-shadow(0px,0px,8px,2px,rgba(183, 207, 243, 0.25));
                            transition: all .1s linear;
                            &:hover{
                                transform: scale(1.1)
                            }
                            .selected-control{
                                border-radius: 99px;
                                padding: 10px;
                                position: absolute;
                                left: 10px;
                                top: 10px;
                            }
                            .number-date{
                                @include d-flex(row,flex-end,center);
                                padding: 8px;
                                font-size: 1.3rem;
                            }
                            .number-name{
                                flex: 1 0 1px;
                                color: #3EB9FC;
                                @include d-flex(column,center,center);
                                .icon-wrapper{
                                    @include d-flex(column,center,center);
                                    padding: 20px;
                                    border-radius: 999px;
                                    background-color: #F7F9FF;
                                    .icon{
                                        width: 50px;
                                    }
                                    
                                }
                                .text{
                                    color: #4689F1;
                                    font-size: 2rem;
                                }
                                
                                .name{
                                    font-size: 2.2rem;
                                    @include d-flex-center;
                                    color: #3EB9FC;
                                }
                                .package-name{
                                    font-size: 1.3rem;
                                    @include d-flex-center;
                                    color: #000;
                                }
                            }
                            .number{
                                @include d-flex-center;
                                padding: 10px;
                                background: rgba(248, 244, 244, 0.5);
                                border-radius: 0 0 10px 10px;
                                font-size: 1.8rem;
                                font-weight: 700;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>