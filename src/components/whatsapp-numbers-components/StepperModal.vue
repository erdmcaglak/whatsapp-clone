<template>
    <div class="stepper-modal-main">
        <div class="stepper-modal">
            <div class="stepper-modal-header">
                {{getModalHeader}}
                <div class="icon">
                    <Icon 
                        icon="close-stepper-modal.svg"
                        :width="{
                            default:'30',
                            lg:'28',
                            md:'26',
                            sm:'24',
                            xs:'22',
                        }"
                        @clickEvent="closeModal"
                        pointer
                        iconColor="#3FBCFE"
                    />
                </div>
            </div>
            <div class="stepper-modal-content-main">
                <transition name="slide" mode="out-in">
                    <div key="step1" v-if="currentStep===1" class="step-1">
                        <div @click="selectModalOption({title:'Whapi Number',value:'whapiNumber'})" class="step-1-whapi-number">
                            <div class="white-image">
                                <img class="icon" src="@/assets/icons/whapi-min.svg" alt="">
                                <div class="whapi-number-text">
                                    You can use API with Whapi numbers
                                </div>
                            </div>
                            <div class="use-whapi-number">
                                Use Whapi Number
                            </div>
                        </div>
                        <div class="step-1-or">
                            or
                        </div>
                        <div @click="selectModalOption({title:'Qr',value:'scanQr'})" class="step-1-qr-code">
                            <img class="blurred-qr" src="@/assets/images/temp-qr.svg" alt="">
                            <div class="blurred-qr-text">
                                Scan QR Code
                            </div>
                        </div>
                    </div>
                    <div key="step2" v-else-if="currentStep===2" class="step-2">
                        <div v-if="selectedOption.value==='scanQr'" class="scan-qr-option">
                            <template v-if="!typingLoading">
                                <div class="from-wp">Scan From WhatsApp</div>
                                <img v-if="qrUrl!=''" class="temp-qr" :src="qrUrl" alt="">
                                <div v-else class="loading-qr">
                                    <v-progress-circular :size="46" :width="7" color="#3C83A6" indeterminate></v-progress-circular>
                                </div>
                            </template>
                            <template v-else>
                                <transition name="fade">
                                    <div class="waitingArr">
                                        <v-progress-circular :size="30" :width="5" color="#454545" indeterminate></v-progress-circular>
                                        {{waitingArr}}
                                    </div>
                                </transition>
                            </template>
                            
                        </div>
                        <div v-else class="whapi-number-option">
                            <div class="map-and-select">
                                <div class="number-select-text">
                                    Select the Whapi number you want to use
                                </div>
                                <div class="map-wrapper">
                                    <img class="map" src="@/assets/images/map.png" alt="">
                                </div>
                                <div class="select-wrapper">
                                    <select v-model="selectedNumber" name="" id="" class="select">
                                        <option selected disabled value="">Select Whapi Number</option>
                                        <option class="whapi-number-select-option" v-for="(number,i) in holderWhapiNumberList" :key="'whapiNumber'+i" :value="number.number"><span>{{number.number}}</span> -- <span class="option-right">{{number.country.title}}</span></option>
                                    </select>
                                </div>
                            </div>
                            <div class="countries-list-wrapper">
                                <div class="countries-list">
                                    <div class="countries-list-header">
                                        Countries
                                        <div class="search-icon">
                                            <input @keyup="searchInCountryList" v-model="countrySearch" placeholder="Search" spellcheck="false" autocomplete="false" class="search-input" type="text">
                                            <Icon 
                                                icon="search.svg"
                                                :width="{
                                                    default:'20',
                                                    lg:'18',
                                                    md:'16',
                                                    sm:'14',
                                                    xs:'12',
                                                }"
                                                iconColor="#000"
                                            />
                                        </div>
                                    </div>
                                    <div class="countries-list-main">
                                        <div @click="changeFilterCountry('all')" :class="currentSelectedFilterCountry==='all'?'active-countries-list-item':'countries-list-item'">
                                            All <span style="color:#989898"> ({{whapiNumberList.length}})</span>
                                        </div>
                                        <div v-for="(country,i) in countryList" :key="'countries'+i" @click="changeFilterCountry(country.title)" :class="currentSelectedFilterCountry === country.title ?'active-countries-list-item':'countries-list-item'">
                                            {{country.title}} <span style="color:#989898"> ({{country.count}})</span>
                                        </div>
                                    </div>
                                </div>
                                <div @click="goNextStep" class="confirm-selection">
                                    Go Next Step
                                </div>
                            </div>
                        </div>
                    </div>
                    <div key="step-3" v-else-if="currentStep===3" class="step-3">
                        <div :style="!getIsCanBuyFreePackage && packages.id==='0'? 'pointer-events:none!important;background-color:rgb(245, 245, 245)!important':''" @click="selectPackage(packages)" v-for="(packages,i) in packageList" :key="'packages'+i"  :class="selectedPackage.id === packages.id ? 'packages-active':'packages'">
                            <div class="packages-header">
                                {{packages.title}}
                            </div>
                            <div class="packages-item-wrapper">
                                <div v-for="(item,i) in packages.packageItems" :key="'packagesItem'+i" class="packages-item">
                                    {{item}}
                                </div>
                            </div>
                            <template v-if="packages.price === '$~~~~'">
                                From $99.99
                            </template>
                            <template v-else-if="packages.price != '0'">
                                ${{packages.price}}
                            </template>
                            <template v-else>
                                Free
                            </template>
                            
                        </div>
                        <div @click="goNextStep" class="confirm-selection">
                            Go Next Step
                        </div>
                    </div>
                    <div key="step-4" v-else class="step-4">
                        <template v-if="!isFreePackage">
                            <div class="payment-inputs">
                                <div class="payment-inputs-wrapper">
                                    <div class="card-number">
                                        <div class="card-number-text">
                                            Card Number*
                                        </div>
                                        <div class="card-number-input">
                                            <input :style="!getCardType ?'width:100%':'width:80%'" v-model="cardNumber" class="input" v-mask="otherCardMask" autocomplete="false" spellcheck="false" type="text">
                                            <img v-if="getCardType" class="icon" :src="require('@/assets/icons/'+getCardType)" alt="">
                                        </div>
                                    </div>
                                    <div class="card-holder">
                                        <div class="card-number-text">
                                            Card Holder*
                                        </div>
                                        <div class="card-number-input">
                                            <input v-model="cardHolder" class="input" autocomplete="false" spellcheck="false" type="text">
                                        </div>
                                    </div>
                                    <div class="mini-inputs">
                                        <div class="date">
                                            <div class="text">
                                                Expiration Date*
                                            </div>
                                            <div class="date-inputs">
                                                <select v-model="selectboxHolderMounth" class="select-box" name="" id="">
                                                    <option disabled selected value="">Mounth</option>
                                                    <option v-for="(item,i) in mounth" :key="'mounth'+i" :value="item.value">
                                                        {{item.title}}</option>
                                                </select>
                                                <select v-model="selectboxHolderYear" class="select-box" name="" id="">
                                                    <option disabled selected value="">Year</option>
                                                    <option v-for="(item,i) in year" :key="'year'+i" :value="item.value">{{item.title}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="cvv">
                                            <div class="text">
                                                CVV*
                                            </div>
                                            <input v-model="cvv" v-mask="'###'" class="cvv-input" type="number">
                                        </div>
                                    </div>
                                </div>
                                <div class="iyzico-wrapper">
                                    <div class="cards">
                                        <img class="card-item" v-for="(card,i) in cards" :key="'card'+i" :src="require('@/assets/icons/'+card+'.svg')" alt="">
                                    </div>
                                    <img class="iyzico" src="@/assets/icons/iyzico.svg" alt="">
                                </div>
                            </div>
                            <div class="confirm-side">
                                <div class="payment-info">
                                    <div class="selected-option">
                                        Option: {{selectedOption.title}}
                                    </div>
                                    <div class="selected-number">
                                        Number: {{selectedNumber}}
                                    </div>
                                    <div v-if="this.selectedOption.value != 'scanQr'" class="number-country">
                                        Country: {{getCountryFromNumber.country.title}}
                                    </div>
                                    <div class="package-name">
                                        Package: {{selectedPackage.title}}
                                    </div>
                                    <div class="confirm-and-total">
                                        <div class="total">
                                            Total: <sup>$</sup><span style="font-weight:700;font-size:4rem">{{selectedPackagePrice.split('.')[0]}}.</span><span class="float-price">{{selectedPackagePrice.split('.')[1]}}</span>
                                        </div>
                                        <div class="buttons">
                                            <div @click="confirmPayment" class="confirm">
                                                CONFIRM
                                            </div>
                                            <div @click="closeModal" class="cancel">
                                                CANCEL
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <Loading/>
                        </template>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
//todo axioslar generic dosyaya taşıncak
import {mapGetters,mapMutations} from "vuex"
import {whapiNumberList} from "@/enum/enum.js"
import Icon from "@/generic_components/icons/Icons.vue"
import _ from "lodash"
import axios from "axios"
import {SERVER_URL} from "@/control.js"
import io from "socket.io-client"
import Vue from "vue"
import QRCode from "qrcode"
import {restartSocket,cookieParser} from "@/utils/utils.js"
import Loading from "@/generic_components/loading/Loading.vue"
export default {
    data(){
        return{
            waitingArrCount:0,
            waitingArr:"Getting Number Info",
            currentSelectedFilterCountry:'all',
            countrySearch:"",
            countryList:[],
            selectedPackagePrice:"",
            packageList:[],
            isCanBuyFreePackage:false,
            mounth: [{
                        title: '01',
                        value: "01"
                    },
                    {
                        title: '02',
                        value: "02"
                    },
                    {
                        title: '03',
                        value: "03"
                    },
                    {
                        title: '04',
                        value: "04"
                    },
                    {
                        title: '05',
                        value: "05"
                    },
                    {
                        title: '06',
                        value: "06"
                    },
                    {
                        title: '07',
                        value: "07"
                    },
                    {
                        title: '08',
                        value: "08"
                    },
                    {
                        title: '09',
                        value: "09"
                    },
                    {
                        title: '10',
                        value: "10"
                    },
                    {
                        title: '11',
                        value: "11"
                    },
                    {
                        title: '12',
                        value: "12"
                    },
            ],
            cards:[
                "mastercard",
                "visa",
            ],
            year: [],
            otherCardMask: "#### #### #### ####",
            selectboxHolderMounth: "",
            selectboxHolderYear: "",
            cardNumber:"",
            cardHolder:"",
            cvv:"",
            selectedOption:{},
            currentStep:1,
            clickAgain:true,
            selectedNumber:"",
            selectedPackage:{},
            whapiNumberList,
            tempCountryList:[],
            tempWhapiNumberList:[],
            holderWhapiNumberList:[],
            qrUrl:"",
            isFreePackage:false,
            remoteJid:"",
            nextStepControl:false,
            typingLoading:false,
            waitingArrInterval:null,
            errInterval:null,
        }
    },
    props:{
        openModal:{type:Boolean},
        numberListArr:{type:Array},
    },
    computed:{
        getCountryFromNumber(){
            return this.whapiNumberList.find(e=>e.number===this.selectedNumber)
        },
        getCardType(){
            let re = new RegExp("^4");
            if (this.cardNumber.match(re) != null){
                return  "visa.svg"
            }
            re = new RegExp("^5[1-5]");
            if (this.cardNumber.match(re) != null){
                return "mastercard.svg"
            }
            return false;
        },
        getModalHeader(){
            return this.currentStep===4 ? 'Payments' : 'New Account'
        },
        ...mapGetters([
            "getLang",
            "getWhapiNumberList",
            "getIsCanBuyFreePackage"
        ])
    },
    components:{
        Icon,
        Loading
    },
    async mounted(){
        const response = await axios.post(`${SERVER_URL}/account/packages`,{
            
        }).catch(err=>{
            console.log('Error in account/packages')
            console.log({err});
        })
        console.log('-------packages-------')
        console.log({response})
        if(response && response.data){
            this.packageList = _.cloneDeep(response.data);
        }
    
        for(let item of this.whapiNumberList){
            if(!this.countryList.find(e=>e.title===item.country.title)){
                this.countryList.push({
                    title:item.country.title,
                    count:this.whapiNumberList.filter(e=>e.country.title===item.country.title).length
                })
            }
        }
        let currentYear = new Date().getFullYear();
        for (let i = currentYear; i < currentYear + 10; i++) {
            this.year.push({
                title: `${i}`,
                value: i
            })
        }
        this.tempCountryList= _.cloneDeep(this.countryList);
        this.holderWhapiNumberList = [...this.whapiNumberList]
    },
    methods:{
        async confirmPayment(){
            if((this.selectboxHolderMounth!=''&&this.selectboxHolderYear!=''&&this.cardNumber!=''&&this.cardHolder!=''&&this.cvv!='')||this.selectPackage.id==='0'){
                    const response = await axios.post(SERVER_URL+'/payment/pay',{
                        cardHolderName:this.cardHolder,
                        cardNumber:this.cardNumber.split(' ').join(''),
                        expireMonth:this.selectboxHolderMounth,
                        expireYear:this.selectboxHolderYear % 2000,
                        cvc:this.cvv,
                        token:cookieParser().token,
                        desc:'temp Desc',
                        total:this.selectedPackagePrice,
                        packageList:this.selectedPackage,
                        packageRemoteJid : this.remoteJid,
                        packageRemoteJidNumber: this.selectedNumber
                    }).catch(err=>{
                        console.log("error in /payment/pay");
                        this.setAlert({
                            type:'danger',
                            title:err.response.data
                        })
                    
                        this.cardNumber=""
                        this.cardHolderName=""
                        this.cvv=""
                        this.selectboxHolderMounth=""
                        this.selectboxHolderYear=""
                        console.log({err})
                    })
                    if(response.data && response.data.success){
                        this.setAlert({
                            type:'success',
                            title:'Payment transaction successful'
                        })
                        this.cardNumber=""
                        this.cardHolderName=""
                        this.cvv=""
                        this.selectboxHolderMounth=""
                        this.selectboxHolderYear=""
                        this.confirmPrivacy=false;
                        let {token} = cookieParser();
                        const res = await axios.post(`${SERVER_URL}/account/accounts`,{
                        token,
                        }).catch(err=>{
                            console.log('Error in /account/accounts')
                            console.log({err})
                        })
                        console.log({resAfterParty:res})
                        if(!res){
                            this.setAlert({
                                title:'Server not responding',
                                type:'danger'
                            })
                            return
                        }
                        if(res.data?.succes){
                            this.$emit('update:numberListArr',_.flattenDeep(res.data.userPackages))
                        }
                        else{
                            this.setAlert({
                                title:'Can not get number list',
                                type:'danger'
                            })
                        }
                        this.closeModal();
                    }
                    else if (response.response?.status != 200 ||response.response?.status != 204){
                        this.setAlert({
                            type:'danger',
                            title:response.response.data
                        })
                    }
                
            }else{
                this.setAlert({
                    title:"Required fields must be filled",
                    type:'danger'
                })
            }
        },
        changeFilterCountry(item){
            this.currentSelectedFilterCountry = item;
            if(item === 'all'){
                this.holderWhapiNumberList = _.cloneDeep(this.whapiNumberList);
            }
            else{
                this.holderWhapiNumberList = _.cloneDeep(this.whapiNumberList.filter(e=>e.country.title===item))
            }
        },
        searchInCountryList(){
            if(this.countrySearch === ''){
                this.countryList = _.cloneDeep(this.tempCountryList);
            }
            else{
                this.countryList = _.cloneDeep(this.tempCountryList.filter(e=>_.upperCase(e.title).includes(_.upperCase(this.countrySearch))))
            }
        },
        closeModal(){
            this.$emit('update:openModal',false);
        },
        selectPackage(item){
            if(!this.getIsCanBuyFreePackage && item.id==='0'){
                this.setAlert({
                    title:'You can not select free package',
                    type:'warning'
                })
            }
            else{
                this.selectedPackagePrice = item.price;
                this.selectedPackage = item;
            }
        },
        
        async goNextStep(){
            if(this.clickAgain){
                if(this.currentStep === 3){
                    //console.log(this.selectedPackage)
                    if(this.selectedPackage.value){
                        this.currentStep++
                        if (this.selectedPackage.id==="0"){
                            this.isFreePackage = true;
                            const response = await axios.post(SERVER_URL+'/payment/pay',{
                                cardHolderName:this.cardHolder,
                                cardNumber:this.cardNumber.split(' ').join(''),
                                expireMonth:this.selectboxHolderMounth,
                                expireYear:this.selectboxHolderYear % 2000,
                                cvc:this.cvv,
                                token:cookieParser().token,
                                desc:'temp Desc',
                                total:this.selectedPackagePrice,
                                packageList:this.selectedPackage,
                                packageRemoteJid : this.remoteJid,
                                packageRemoteJidNumber: this.selectedNumber
                            }).catch(err=>{
                                console.log("error in /payment/pay");
                                this.setAlert({
                                    type:'danger',
                                    title:err.response.data
                                })
                            
                                this.cardNumber=""
                                this.cardHolderName=""
                                this.cvv=""
                                this.selectboxHolderMounth=""
                                this.selectboxHolderYear=""
                                console.log({err})
                                this.closeModal();
                            })
                            console.log({response})
                            if(!response){
                                this.setAlert({
                                    type:'danger',
                                    title:'Server not responding'
                                })
                                this.closeModal()
                            }
                            else{
                                if(response.data && response.data.success){
                                    this.setAlert({
                                        type:'success',
                                        title:'Payment transaction successful'
                                    })
                                    this.cardNumber=""
                                    this.cardHolderName=""
                                    this.cvv=""
                                    this.selectboxHolderMounth=""
                                    this.selectboxHolderYear=""
                                    this.confirmPrivacy=false;
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
                                        this.$emit('update:numberListArr',_.flattenDeep(response.data.userPackages))
                                    }
                                    else{
                                    this.setAlert({
                                            title:"Can not get number list",
                                            type:'danger'
                                        }) 
                                    }
                                    this.closeModal();
                                }
                                else if (response.data?.status != 200 ||response.data?.status != 204){
                                    this.setAlert({
                                        type:'danger',
                                        title:response.response.data
                                    })
                                    this.closeModal();
                                }
                                else{
                                    this.setAlert({
                                        type:'danger',
                                        title:response.message
                                    })
                                    this.closeModal();
                                }
                            }
                        }
                        this.clickAgain = false;
                        setTimeout(() => {
                            this.clickAgain = true;
                        }, 1e3);
                    }
                    else{
                        this.setAlert({
                            title:'Package is mandatory',
                            type:'warning'
                        })
                    }
                }
                else{
                    if(this.selectedNumber != ''){
                        this.currentStep++
                        this.clickAgain = false;
                        setTimeout(() => {
                            this.clickAgain = true;
                        }, 1e3);
                    }
                    else{
                        this.setAlert({
                            title:'Number is mandatory',
                            type:'warning'
                        })
                    }
                }
                if(this.currentStep===3){
                    if(this.selectedOption.value ==='scanQr'){
                        this.packageList=this.packageList.filter(e=>e.numberType ==='Qr');
                    }
                    else{
                        this.packageList=this.packageList.filter(e=>(e.numberType !='Qr' && e.numberType!='whapi-shared'));
                    }

                    console.log({l:this.packageList})
                }
            }
        },
        async selectModalOption(item){
            if(this.clickAgain){
                this.selectedOption = item;
                this.currentStep++
                this.clickAgain = false;
                setTimeout(() => {
                    this.clickAgain = true;
                }, 1e3);
            }
            if(this.currentStep === 2 && this.selectedOption.value==='scanQr'){
                console.log('aa')
                let {token} = cookieParser();
                restartSocket(token)
                let opts = {
                    errorCorrectionLevel: 'M',
                    type: 'image/jpeg',
                    quality: 0.3,
                    margin: 0,
                }
                let data = this
                this.$socket.on('qr',resp=>{
                    console.log({resp})
                    QRCode.toDataURL(resp,opts, function (err, url) {
                        data.qrUrl = url;
                    })
                })
                this.$socket.on('remoteJidLoaded',res=>{
                    this.typingLoading = res.success;
                    console.log({loaded:res})
                    this.errInterval=setInterval(() => {
                        this.setAlert({
                            title:'Server not responding',
                            type:'danger'
                        })
                    }, 6e4);
                })
                this.$socket.on('remoteJid',res=>{
                    
                    console.log('--------- remoteJid --------')
                    console.log({res})
                    console.log({account:this.getWhapiNumberList,e:res.remoteJid})
                    console.log(this.getWhapiNumberList.filter(e=>e.remoteJid === res.remoteJid.split('@')[0]));
                    console.log(this.remoteJid!=res.remoteJid)
                    console.log({k:this.remoteJid,l:res.remoteJid})
                    console.log(this.currentStep)
                    if(typeof res === 'object' && this.remoteJid!=res.remoteJid && this.getWhapiNumberList.filter(e=>e.remoteJid === res.remoteJid.split('@')[0]).length!=0 && this.currentStep===2){
                        this.setAlert({
                            title:res.err,
                            type:'danger'
                        })
                        console.log('Error in remoteJid socket')
                        console.log({res})
                        this.currentStep++;
                        clearInterval(this.errInterval)
                        this.closeModal();
                    }
                    else if(typeof res === 'string' ||typeof res==='object'){ 
                        clearInterval(this.errInterval)  
                        if(!this.nextStepControl){
                            this.currentStep++;
                            this.nextStepControl=true;
                        }
                        this.$socket.off('qr');
                        if(typeof res==='string'){
                            this.remoteJid = res;
                            this.selectedNumber = res.split('@')[0];
                            console.log({i:this.remoteJid,k:this.selectedNumber,res})
                            if(this.selectedOption.value ==='scanQr'){
                                this.packageList=this.packageList.filter(e=>e.numberType ==='Qr');
                            }
                        }
                        else{
                            this.remoteJid = res.remoteJid;
                            this.selectedNumber = res.remoteJid.split('@')[0];
                            console.log({i:this.remoteJid,k:this.selectedNumber,res})
                            if(this.selectedOption.value ==='scanQr'){
                                this.packageList=this.packageList.filter(e=>e.numberType ==='Qr');
                            }
                        }
                        
                        console.log({res})
                    }
                    
                })
                await axios.post('https://test.whapi.chat/qr',{
                    token,
                }).then(response=>{
                    console.log({response});
                }).catch(err=>{
                    console.log('Error in /qr');
                    console.log({err})
                    this.setAlert({
                        title:'/qr Error',
                        type:'danger'
                    })
                })
            }
        },
        ...mapMutations([
            "setAlert",
            "setWhapiNumberList"
        ])
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.stepper-modal-main{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(251, 251, 251, 0.3);
    backdrop-filter: blur(10px);
    top: 0;
    left: 0;
    @include d-flex-center;
    .stepper-modal{
        overflow: hidden;
        width: 80%;
        height: 70%;
        background: rgba(245, 249, 255, 0.6);
        border: 1px solid #D5CBE1;
        @include box-shadow(0px,0px,12px,0px,rgba(0, 0, 0, 0.25));
        backdrop-filter: blur(10px);
        border-radius: 15px;
        @include d-flex(column,flex-start,stretch);
        .stepper-modal-header{
            flex: 0 0 1px;
            @include d-flex-center;
            position: relative;
            padding: 20px;
            font-size: 2rem;
            user-select: none;
            .icon{
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translate(0,-50%);
            }
        }
        .stepper-modal-content-main{
            flex: 1 0 1px;
            padding: 20px;
            @include d-flex-center;
            .step-1{
                @include d-flex(row,center,center);
                width: 100%;
                height: 100%;
                gap: 100px;
                .step-1-whapi-number{
                    @include d-flex(column,center,stretch);
                    gap: 20px;
                    transition: all .1s linear;
                    cursor: pointer;
                    &:hover{
                        transform: scale(1.2);
                    }
                    .white-image{
                        width: 240px;
                        height: 250px;
                        padding: 20px;
                        background-color: #fff;
                        gap: 10px;
                        @include d-flex(column,center,center);
                        .icon{
                            width: 90px;
                        }
                        .whapi-number-text{
                            font-size: 1.5rem;
                            text-align: center;
                            @include d-flex-center;
                            color: #717171;
                        }
                    }
                    .use-whapi-number{
                        @include d-flex-center;
                        font-size: 2rem;
                        text-align: center;
                    }
                }
                .step-1-or{
                    @include d-flex-center;
                    color: #3EB9FC;
                    font-size: 2.5rem;
                    
                }
                .step-1-qr-code{
                    @include d-flex(column,center,stretch);
                    gap: 20px;
                    transition: all .1s linear;
                    cursor: pointer;
                    &:hover{
                        transform: scale(1.2);
                    }
                    .blurred-qr{
                        width: 240px;
                        height: 250px;
                        filter: blur(7px);
                    }
                    .blurred-qr-text{
                        @include d-flex-center;
                        font-size: 2rem;
                        text-align: center;
                    }
                }
            }
            .step-2{
                width: 100%;
                height: 100%;
                @include d-flex-center;
                .scan-qr-option{
                    @include d-flex(column,center,center);
                    width: 350px;
                    height: 350px;
                    gap: 20px;
                    .from-wp{
                        color: #3FBCFE;
                        font-size: 2rem;
                        
                    }
                    .waitingArr{
                        @include d-flex-center;
                        gap: 10px;
                        font-size: 2.3rem;
                        color: #454545;
                        transition: all .1s linear;
                    }
                    .temp-qr{
                        width: 100%;
                        height: 100%;
                    }
                    .loading-qr{
                        @include d-flex-center;
                        height: 100%;
                        width: 100%;
                    }
                }
                .whapi-number-option{
                    @include d-flex-center;
                    width: 100%;
                    height: 100%;
                    gap: 100px;
                    .map-and-select{
                        flex: 5 0 1px;
                        @include d-flex(column,center,center);
                        gap: 50px;
                        .number-select-text{
                            font-size: 2rem;
                            @include d-flex-center;
                            text-align: center;
                        }
                        .map-wrapper{
                            @include d-flex-center;
                            width: 100%;
                            pointer-events: none;
                            user-select: none;
                            .map{
                                width: 80%;
                            }
                        }
                        .select-wrapper{
                            width: 100%;
                            @include d-flex-center;
                            .select{
                                width: 80%;
                                padding: 10px;
                                background-color: #fff;
                                font-size: 1.7rem;
                                outline: none;
                                appearance: menulist;
                                cursor: pointer;
                                .whapi-number-select-option{
                                    width: 100%;
                                    position: relative;
                                    cursor: pointer;
                                    padding: 2px;

                                    .option-right{
                                        color: #fff;
                                        
                                    }
                                }
                            }

                        }
                        
                        
                    }
                    .countries-list-wrapper{
                        flex: 3 0 1px;
                        @include d-flex(column,center,center);
                        height: 100%;
                        gap:40px;
                        .countries-list{
                            overflow: hidden;
                            @include d-flex(column,flex-start,stretch);
                            width: 80%;
                            height: 90%;
                            background-color: #fff;
                            border-radius: 15px;
                            .countries-list-header{
                                flex: 0 0 auto;
                                background-color: #EEEEEE;
                                @include d-flex(row,space-between,center);
                                font-size: 1.8rem;
                                padding: 10px;
                                .search-icon{
                                    @include d-flex-center;
                                    background-color: #fff;
                                    border-radius: 10px;
                                    padding: 6px;
                                    gap: 5px;
                                    .search-input{
                                        font-size: 1.5rem;
                                        outline: none;
                                        padding: 0px;
                                    }
                                }
                            }
                            .countries-list-main{
                                overflow: auto;
                                flex: 1 0 1px;
                                @include d-flex(column,flex-start,stretch);
                                .countries-list-item{
                                    gap: 3px;
                                    @include d-flex-center;
                                    padding: 8px;
                                    font-size: 1.8rem;
                                    cursor: pointer;
                                    transition: all .1s linear;
                                    &:not(:last-child){
                                        border-bottom: 1px solid #EEEEEE;
                                    }
                                    &:hover{
                                        background-color: #f7f7f7;
                                    }
                                }
                                .active-countries-list-item{
                                    gap: 3px;
                                    @include d-flex-center;
                                    padding: 8px;
                                    font-size: 1.8rem;
                                    cursor: pointer;
                                    transition: all .1s linear;
                                    background-color: #f7f7f7;
                                }
                            }
                        }
                        .confirm-selection{
                            cursor: pointer;
                            width: 80%;
                            @include d-flex-center;
                            padding: 6px 18px;
                            background-color: #3FBCFE;
                            color: #fff;
                            font-size: 1.8rem;
                            border-radius: 8px;
                        }
                    }
                }
            }
            .step-3{
                width: 100%;
                height: 100%;
                @include d-flex-center;
                gap: 50px;
                position: relative;
                .packages{
                    cursor:pointer;
                    user-select: none;
                    @include d-flex(column,center,center);
                    padding: 20px 40px;
                    background-color: #fff;
                    border-radius: 10px;
                    font-size: 2.5rem;
                    gap: 20px;
                    transition: all .1s linear;
                    min-height: 65%;
                    &:hover{
                        transform: scale(1.2)
                    }
                    .packages-header{
                        @include d-flex-center;
                        text-align: center;
                        font-size: 2rem;
                        color: #4689F1;
                    }
                    .packages-item-wrapper{
                        @include d-flex(column,center,center);
                        .packages-item{
                            @include d-flex-center;
                            padding: 4px;
                            font-size: 1.5rem;
                        }
                    }
                }
                .packages-active{
                    @extend .packages;
                    background-color: #eeeeee;
                }
                .confirm-selection{
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    cursor: pointer;
                    @include d-flex-center;
                    padding: 6px 18px;
                    background-color: #3FBCFE;
                    color: #fff;
                    font-size: 1.8rem;
                    border-radius: 8px;
                }
            }
            .step-4{
                user-select: none;
                width: 100%;
                height: 100%;
                @include d-flex-center;
                .payment-inputs{
                    @include d-flex(column,center,center);
                    flex: 1 0 1px;
                    height: 100%;
                    .payment-inputs-wrapper{
                        width: 100%;
                        gap: 15px;
                        flex: 1 0 1px;
                        @include d-flex(column,center,stretch);
                        .card-number{
                            @include d-flex(column,center,stretch);
                            gap: 3px;
                            .card-number-text{
                                @include d-flex(row,flex-start,center);
                                font-size: 1.5rem;
                            }
                            .card-number-input{
                                position: relative;
                                @include d-flex(row,flex-start,stretch);
                                width: 100%;
                                .input{
                                    background: #fff;
                                    border-radius: 10px;
                                    outline: none;
                                    padding: 8px;
                                    font-size: 1.8rem;
                                    width: 100%;
                                }
                                .icon{
                                    position: absolute;
                                    right: 25px;
                                    top: 50%;
                                    transform: translate(0,-50%);
                                    width: 70px;
                                }
                            }
                        }
                        .card-holder{
                            @extend .card-number;
                        }
                        .mini-inputs {
                            width: 100%;
                            @include d-flex(row,center,stretch);
                            .date {
                                font-weight: normal;
                                @include d-flex(column, flex-start, flex-start);
                                flex: 1 0 1px;
                                gap: 5px;
                                .text {
                                    font-size: 1.5rem;
                                    font-weight: normal;
                                }
                                .date-inputs {
                                    @include d-flex(row, flex-start, center);
                                    width: 100%;
                                    gap: 20px;
                                    .select-box {
                                        padding: 8px;
                                        font-size: 1.5rem;
                                        border-radius: 5px;
                                        background-color: #fff;
                                        color: #454545;
                                        width: 45%;
                                        outline: none;
                                        appearance: listbox;
                                        cursor: pointer;
                                    }
                                }
                            }
    
                            .cvv {
                                gap: 5px;
                                @include d-flex(column, flex-start, flex-start);
                                .text {
                                    font-weight: normal;
                                    color: #454545;
                                    font-size: 1.5rem;
                                }
    
                                .cvv-input {
                                    padding: 8px;
                                    font-size: 1.5rem;
                                    border-radius: 5px;
                                    background-color: #fff;
                                    color: #454545;
                                    width: 100%;
                                    outline: none;
                                    appearance: none;
                                    &::-webkit-inner-spin-button,&::-webkit-outer-spin-button{
                                        -webkit-appearance: none;
                                        margin: 0;
                                    }
                                }
                            }
                        }
                    }
                    .iyzico-wrapper{
                        pointer-events: none;
                        flex: 0 0 auto;
                        width: 70%;
                        @include d-flex(column,center,center);
                        .cards{
                            padding: 10px;
                            width: 100%;
                            @include d-flex(row,space-around,center);
                            border-bottom: 1px solid #3EB9FC;
                            .card-item{
                                width: 55px;
                            }
                        }
                        .iyzico{
                            margin: 10px;
                            width: 100px;
                        }
                    }
                }
                .confirm-side{
                    @include d-flex-center;
                    flex: 1 0 1px;
                    height: 100%;
                    .payment-info{
                        padding: 20px;
                        @include d-flex(column,flex-start,flex-start);
                        gap: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        width: 70%;
                        height: 90%;
                        .package-name{
                            @include d-flex-center;
                            font-size: 2.2rem;
                            color: #454545;
                            flex: 0 0 auto;
                        }
                        .selected-number{
                            @extend .package-name;
                        }
                        .selected-option{
                            
                            @extend .package-name;
                        }
                        .number-country{
                            @extend .package-name;
                        }
                        .confirm-and-total{
                            width: 100%;
                            flex: 1 0 1px;
                            @include d-flex(column,center,center);
                            gap: 25px;
                            .total{
                                width: 100%;
                                @include d-flex-center;
                                font-size: 3rem;
                                .float-price{
                                    height: 100%;
                                    @include d-flex(column,center,center);
                                    font-weight:700;
                                    font-size:2.5rem;
                                }
                            }
                            .buttons{
                                width: 100%;
                                @include d-flex(column,center,stretch);
                                gap: 10px;
                                .confirm{
                                    width: 100%;
                                    padding: 4px;
                                    font-size: 2.5rem;
                                    border-radius: 8px;
                                    background: #35a0da;
                                    @include d-flex-center;
                                    color: #fff;
                                    transition: all .1s linear;
                                    cursor: pointer;
                                    &:hover{
                                        filter: brightness(110%);
                                    }
                                }
                                .cancel{
                                    @extend .confirm;
                                    background-color: #DB0000;
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    }
}
</style>