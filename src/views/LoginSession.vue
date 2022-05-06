<template>
  
</template>

<script>
import axios from "axios"
import {SERVER_URL} from "@/control.js"
import {mapMutations} from "vuex"
export default {
    methods:{
        ...mapMutations([
            "setAlert",
        ])
    },
    async mounted(){
        await axios.post(`${SERVER_URL}/login/session`,{
            token:this.$route.params.token
        }).then(response=>{
            if(response.data.token){
                
                this.setAlert({
                    title:'Login Succesful!',
                    type:'success',
                })
                document.cookie = `token=${response.data.token}`
                this.$router.push(this.$route.query.redirect || '/wui-account');
                
            }
            else{
                this.$router.push(this.$route.query.redirect || '/');
                this.setAlert({
                    title:'Login Failed!',
                    type:'danger',
                })
            }
        }).catch(err=>{
            console.log('Err in /login/session')
            console.log({err})
        })

        
    }
}
</script>

<style>

</style>