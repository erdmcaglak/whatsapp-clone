<template>
    <div class="buy-pack-main">
        <div class="buy-pack-wrapper">
            <div class="main-wrapper">
                <!-- <div class="buy-text">
                    Buy The Pack and Start Using
                    <span style="font-size:3rem;font-weight:500">Follow the movements of your contact list</span>
                </div>
                <div @click="routeNumbers" class="buy-now">
                    BUY NOW
                </div> -->
                COMING SOON
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        routeNumbers(){
            this.$router.push(this.$route.query.redirect || `/whatsapp-numbers`);
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.buy-pack-main{
    width: 100%;
    height: 100%;
    @include d-flex-center;
    .buy-pack-wrapper{
        @include d-flex(column,center,center);
        width: 90%;
        height: 90%;
        background: rgba(245, 249, 255, 0.5);
        border-radius: 10px;
        @include box-shadow(0,4px,8px,2px,rgba(183, 207, 243, 0.25));
        .main-wrapper{
            font-size: 4rem;
            color: #3EB9FC;
            font-weight: 700;
            @include d-flex(column,space-evenly,center);
            width: 100%;
            height: 100%;
            background-image: url('../../assets/icons/blurred-whatsapp-icon.svg');
            background-repeat: no-repeat;
            background-attachment: absolute;
            background-position: right bottom;
            gap: 20px;
            .buy-text{
                @include d-flex(column,center,center);
                gap: 10px;
                font-size: 4rem;
                color: #3EB9FC;
                font-weight: 700;
            }
            .buy-now{
                @include d-flex-center;
                color: #fff;
                background-color: #3EB9FC;
                border-radius: 10px;
                padding: 10px 30px;
                font-size: 3rem;
                font-weight: 700;
                user-select: none;
                cursor: pointer;
                transition: all .1s linear;
                &:hover{
                    filter: brightness(110%);
                }
            }
        }
        
    }
}
</style>