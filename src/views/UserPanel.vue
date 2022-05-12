<template>
    <div class="user-panel-main">
        <button @click="getQr" class="get-qr">Get QR</button>
        <input v-model="token" class="input" type="text">
        {{res}}
        <div>
            socket : {{socketRes}}
        </div>
    </div>
</template>

<script>
import axios from "axios"
import {mapMutations} from "vuex"
import Vue from "vue";
import io from "socket.io-client"

export default {
    data(){
        return{
            res:null,
            token:"",
            socketRes:"",
        }
    },
    mounted(){
        
    },
    methods:{
        socketConnection(){
            console.log('Restart Socket')
            const socket = io(`https://test.whapi.chat`, {
                autoConnect: false,
                auth: {
                    token: '',
                }
            })
            console.log({socket})
            Vue.prototype.$socket = null;
            Vue.prototype.$socket = socket;
            socket.auth.token = this.token;
            socket.connect()
            this.$socket.on('/qr',resp=>{
                console.log({resp})
                this.socketRes = resp;
            })
        },
        ...mapMutations([
            'setAlert'
        ]),
        getQr(){
            this.socketConnection();
            axios.post('https://test.whapi.chat/qr',{
                token:this.token,
            }).then(response=>{
                console.log({response});
                this.res=response;
            }).catch(err=>{
                console.log('Error in /qr');
                console.log({err})
                this.setAlert({
                    title:'/qr Error',
                    type:'danger'
                })
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.user-panel-main{
    @include d-flex(column,center,center);
    width: 100%;
    height: 100%;
    gap: 50px;
    font-size: 2rem;
    .get-qr{
        padding: 5px 20px;
        border: 1px solid black;
        font-size: 2.5rem;
        border-radius: 10px;
        transition: all .1s linear;
        &:hover{
            background-color: #000;
            color: #fff;
        }
    }
    .input{
        border: 1px solid black;
        outline: none;
        padding: 4px;
        font-size: 2rem;
        border-radius: 4px;
    }
}

</style>