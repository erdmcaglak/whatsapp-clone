<template>
    <div class="settings-main">
        <div class="user-information-wrapper">
            <div class="user-information-main">
                <div class="user-information">
                    <div class="informations">
                        <div class="user-name">
                            <div class="text">
                                User Information
                            </div>
                            <div class="name-surname">
                                <Icon 
                                    pointerNone
                                    icon="user.svg"
                                    :width="{
                                        default:'40',
                                        lg:'38',
                                        md:'36',
                                        sm:'34',
                                        xs:'32',
                                    }"
                                    iconColor="#585858"
                                />
                                <div class="name-number">
                                    {{nameSurname}}
                                    <div class="number">
                                        {{userNumber}}
                                    </div>
                                    <div @click="changeName" class="change-name">
                                        Change Name
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="payment-method">
                            <div class="text">
                                Payment Method
                            </div>
                            <div class="payment">
                                <div v-for="(item,i) in paymentCards" :key="'payment'+i" class="payment-main">
                                    <img class="payment-card" :src="require(`@/assets/icons/${item.cardType}.svg`)" alt="">
                                    <div class="payment-card-info">
                                        <div class="card-type">
                                            {{startCase(item.cardType)}}
                                        </div>
                                        <div class="card-number">
                                            {{item.cardNumber}}
                                        </div>
                                    </div>
                                    <div class="card-date">
                                        {{moment(item.paymentDate).format('DD/MM/YYYY')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="billing-address">
                            <div class="text">
                                Billing Information
                            </div>
                            <div class="billing">
                                <div class="email-text">
                                    Email
                                </div>
                                <div class="billing-email">
                                    {{billingEmail}}
                                </div>
                                <div class="edit-billing">
                                    <Icon 
                                        pointerNone
                                        icon="edit-billing.svg"
                                        :width="{
                                            default:'25',
                                            lg:'23',
                                            md:'21',
                                            sm:'19',
                                            xs:'17',
                                        }"
                                        pointer
                                        iconColor="#3EB9FC"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="check-boxes">

                    </div>
                </div>
            </div>
        </div>
        <div class="number-list-wrapper">
            <div class="number-list-main">
                <div class="number-list-header">
                    <div class="text">
                        Number List
                    </div>
                    <div class="search-and-input">
                        <input @keyup="searchInnumberListItems" v-model="accountSearch" spellcheck="false" autocomplete="false" placeholder="Search" class="search-input" type="text">
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
                <div class="table-header">
                    <div class="item-number">
                        Number
                    </div>
                    <div class="created-time">
                        Created Time
                    </div>
                    <div class="end-time">
                        End Time
                    </div>
                    <div class="package-name">
                        Package Name
                    </div>
                    <div class="item-price">
                        Price
                    </div>
                </div>
                <div class="number-list-content">
                    <div v-for="(item,i) in numberListItems" :key="'listItem'+i" class="list-item">
                        <div class="item-number">
                            {{item.remoteJid}}
                        </div>
                        <div class="created-time">
                            {{moment(item.createdTs).format('DD/MM/YYYY')}}
                        </div>
                        <div class="end-time">
                            {{moment(item.endTs).format('DD/MM/YYYY')}}
                        </div>
                        <div class="package-name">
                            {{item.title}}
                        </div>
                        <div class="item-price">
                            <template v-if="item.price!='0'">
                                ${{item.price}}
                            </template>
                            <template v-else>
                                FREE
                            </template>
                        </div>
                        <div class="edit">
                            <img class="icon" src="@/assets/icons/list-item-edit.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/generic_components/icons/Icons.vue"
import axios from "axios"
import {SERVER_URL} from "@/control.js"
import {cookieParser} from "@/utils/utils.js"
import _ from "lodash"
import {startCase} from "lodash"
import {mapMutations} from "vuex"
import moment from "moment"
export default {
    data(){
        return{
            moment,
            startCase,
            nameSurname:"",
            userNumber:"",
            currentPaymentCard:"mastercard",
            paymentCards:[],
            billingEmail:"",
            numberListItems:[],
            tempnumberListItems:[],
            accountSearch:"",
        }
    },
    methods:{
        searchInnumberListItems(){
            if(this.accountSearch === ''){
                this.numberListItems = _.cloneDeep(this.tempnumberListItems);
            }
            else{
                this.numberListItems = _.cloneDeep(this.tempnumberListItems.filter(e=>_.upperCase(e.remoteJid).includes(_.upperCase(this.accountSearch)) || _.upperCase(e.title).includes(_.upperCase(this.accountSearch))))
               
            }
        },
        async accountList(){
            const response = await axios.post(`${SERVER_URL}/account/accounts`,{
                token:cookieParser().token
            }).catch(err=>{
                this.setAlert({
                    title:"Error",
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
                if(response.data.userPackages){
                    this.numberListItems = _.cloneDeep(_.flattenDeep(response.data.userPackages))
                    this.tempnumberListItems = _.cloneDeep(_.flattenDeep(response.data.userPackages))
                }
            }
            else{
            this.setAlert({
                    title:"Can not get number list",
                    type:'danger'
                })
            }
        },
        changeName(){

        },
        ...mapMutations([
            "setAlert"
        ])
    },
    // TODO infoda kayıt olunan hesabın telefon numarası da dönmesi lazım
    async mounted(){
        const response = await axios.post(`${SERVER_URL}/account/info`,{
            token:cookieParser().token,
        }).catch(err=>{
            console.log('Error in account/info')
            console.log({err})
        })
        console.log('--------- infoo ----------')
        console.log({response})
        if(!response){
            return
        }
        if(response.data){
            this.nameSurname= _.startCase(response.data.name)+ ' ' + _.upperCase(response.data.surname);
            this.userNumber = response.data.number || '905315677183'
        }

        const res = await axios.post(`${SERVER_URL}/payment/info`,{
            token:cookieParser().token,
        }).catch(err=>{
            console.log('Error in /payment/info')
            console.log({err})
        })
        console.log("-------- payment/info -----------")
        console.log({res})
        if(!res){
            return
        }
        if(res.data){
            this.paymentCards = _.cloneDeep(res.data.cards)
            this.billingEmail = res.data.billingEmail      
        }

        await this.accountList();
    },
    components:{
        Icon
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.settings-main{
    width: 100%;
    height: 100%;
    overflow: auto;
    .user-information-wrapper{
        position: relative;
        width: 100%;
        @include d-flex-center;
        .user-information-main{
            width: 90%;
            background: rgba(245, 249, 255, 0.5);
            border-radius: 15px;
            @include box-shadow(0px,4px,8px,2px,rgba(183, 207, 243, 0.25));
            @include d-flex(column,flex-start,stretch);
            padding: 25px;
            .user-information{
                @include d-flex(row,flex-start,stretch);
                .informations{
                    flex: 1 0 1px;
                    @include d-flex(column,flex-start,stretch);
                    gap: 30px;
                    .user-name{
                        @include d-flex(column,flex-start,stretch);
                        gap: 10px;
                        .text{
                            @include d-flex(row,flex-start,center);
                            color: #3EB9FC;
                            font-size: 2rem;
                            font-weight: 700;
                        }
                        .name-surname{
                            @include d-flex(row,flex-start,center);
                            color: #454545;
                            gap: 20px;
                            .name-number{
                                position: relative;
                                user-select: none;
                                background-color: #fff;
                                flex: 1 0 1px;
                                padding: 10px;
                                border-radius: 10px;
                                font-size: 2.5rem;
                                @include d-flex(column,flex-start,flex-start);
                                @include box-shadow-inset(0px,4px,4px,0px,rgba(183, 207, 243, 0.25));
                                .number{
                                    font-size: 2rem;
                                    @include d-flex-center;
                                }
                                .change-name{
                                    position: absolute;
                                    font-size: 1.5rem;
                                    color: #3EB9FC;
                                    right: 10px;
                                    bottom: 10px;
                                    cursor: pointer;
                                    @include d-flex-center;
                                    &:hover{
                                        text-decoration: underline;
                                    }
                                }
                            }
                            
                        }
                    }
                    .payment-method{
                        @include d-flex(column,flex-start,stretch);
                        gap: 10px;
                        .text{
                            @include d-flex(row,flex-start,center);
                            color: #3EB9FC;
                            font-size: 2rem;
                            font-weight: 700;
                        }
                        .payment{
                            @include d-flex(column,flex-start,stretch);
                            color: #454545;
                            gap: 10px;
                            background-color: #fff;
                            border-radius: 10px;
                            @include box-shadow-inset(0px,4px,4px,0px,rgba(183, 207, 243, 0.25));
                            padding: 10px;
                            .payment-main{
                                @include d-flex(row,flex-start,center);
                                gap: 20px;
                                &:not(:last-child){
                                    border-bottom: 1px solid rgb(211, 211, 211);
                                }
                                .payment-card{
                                    flex: 0 0 auto;
                                    width: 40px;
                                }
                                .payment-card-info{
                                    position: relative;
                                    user-select: none;
                                    flex: 1 0 1px;
                                    padding: 10px;
                                    @include d-flex(column,flex-start,flex-start);
                                    .card-type{
                                        @include d-flex-center;
                                        font-size: 1.6rem;
                                    }
                                    .card-number{
                                        @include d-flex-center;
                                        font-size: 1.2rem;
                                        color: #6e6e6e;
                                    }
                                }
                                .card-date{
                                    @include d-flex-center;
                                    font-size: 1.5rem;
                                    color: #5f5f5f;
                                }
                            }
                            
                        }
                    }
                    .billing-address{
                        @include d-flex(column,flex-start,stretch);
                        gap: 10px;
                        .text{
                            @include d-flex(row,flex-start,center);
                            color: #3EB9FC;
                            font-size: 2rem;
                            font-weight: 700;
                        }
                        .billing{
                            @include d-flex(row,flex-start,stretch);
                            color: #454545;
                            gap: 30px;
                            background-color: #fff;
                            border-radius: 10px;
                            @include box-shadow-inset(0px,4px,4px,0px,rgba(183, 207, 243, 0.25));
                            padding: 10px;
                            .email-text{
                                @include d-flex-center;
                                font-size: 1.6rem;
                                flex: 0 0 auto;
                            }
                            .billing-email{
                                @include d-flex(row,flex-start,center);
                                font-size: 1.6rem;
                                flex: 1 0 1px;
                            }
                            .edit-billing{
                                @include d-flex-center;
                                flex: 0 0 auto;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .check-boxes{
                    flex: 1 0 1px;
                }
            }
        }
    }
    .number-list-wrapper{
        height: 100%;
        @include d-flex-center;
        .number-list-main{
            overflow: hidden;
            width: 90%;
            background: rgba(245, 249, 255, 0.5);
            border-radius: 15px;
            @include box-shadow(0px,4px,8px,2px,rgba(183, 207, 243, 0.25));
            @include d-flex(column,flex-start,stretch);
            padding: 25px;
            height: 90%;
            .number-list-header{
                flex: 0 0 auto;
                @include d-flex(row,space-between,center);
                .text{
                    @include d-flex-center;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #3EB9FC;
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
            .table-header{
                margin-top: 20px;
                @include d-flex(row,flex-start,center);
                border-bottom: 1px solid black;
                .item-number{
                    flex: 1 0 1px;
                    font-size: 2rem;
                    @include d-flex-center;
                    padding: 10px;
                    font-weight: 700;
                    color: #454545;
                }
                .created-time{
                    @extend .item-number;
                    
                }
                .end-time{
                    @extend .created-time;
                }
                .package-name{
                    @extend .created-time;
                }
                .item-price{
                    @extend .created-time;
                }
            }
            .number-list-content{
                overflow: auto;
                .list-item{
                    position: relative;
                    user-select: none;
                    @include d-flex(row,flex-start,center);
                    &:not(:last-child){
                        border-bottom: 1px solid rgb(219, 217, 217);
                    }
                    .item-number{
                        flex: 1 0 1px;
                        font-size: 2rem;
                        @include d-flex-center;
                        padding: 10px;
                    }
                    .created-time{
                        @extend .item-number;
                    }
                    .end-time{
                        @extend .created-time;
                    }
                    .package-name{
                        @extend .created-time;
                    }
                    .item-price{
                        @extend .created-time;
                        color: #3EB9FC;
                    }
                    .edit{
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translate(0,-50%);
                        cursor: pointer;
                        padding: 0 10px;
                        @include d-flex-center;
                        .icon{
                            width: 6px;
                        }
                    }
                }
            }
        }
    }
}
</style>