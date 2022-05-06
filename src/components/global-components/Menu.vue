<template>
    <div v-if="!getIsOpenSmalledMenu && !isSmalled" class="menu-main">
        <div class="menu-items-wrapper">
            <router-link tag="div" :to="item.api" v-for="(item,i) in menuItems" :key="'menuItems'+i" class="menu-items" active-class="active-menu-items">
                <div class="menu-items-icon">
                    <Icon
                        :icon="item.icon"
                        :width="{
                            default:'26',
                            lg:'23',
                            md:'21',
                            sm:'16',
                            xs:'14',
                        }"
                        iconColor="#585858"
                    />
                </div>
                <div class="menu-items-text">
                    {{item.title}}
                </div>
            </router-link>
        </div>
        <div @mouseenter="isOverLogout=true" @mouseleave="isOverLogout=false" class="logout-wrapper">
            <Icon 
                icon="logout.svg"
                :width="{
                    default:'30',
                    lg:'27',
                    md:'23',
                    sm:'19',
                    xs:'17',
                }"
                :iconColor="isOverLogout ? '#fff':'#585858'"
            />
            <div class="logout-text">
                Logout
            </div>
        </div>
    </div>
    <transition v-else-if="getIsOpenSmalledMenu && isSmalled" name="slide">
        <div key="smalledMenu" class="smalled-menu">
            <div class="smalled-menu-items-wrapper">
                <router-link tag="div" :to="`${item.api}`" v-for="(item,i) in menuItems" :key="'smalledMenuItems'+i" class="active-smalled-menu-items">
                    <div class="smalled-menu-items-icon">
                        <Icon
                            :icon="item.icon"
                            :width="{
                                default:'35',
                                lg:'33',
                                md:'30',
                                sm:'28',
                                xs:'26',
                            }"
                            iconColor="#585858"
                        />
                    </div>
                    <div class="smalled-menu-items-text">
                        {{item.title}}
                    </div>
                </router-link>
                <div @mouseenter="isOverLogout=true" @mouseleave="isOverLogout=false" class="smalled-logout-wrapper">
                    <Icon 
                        icon="logout.svg"
                        :width="{
                            default:'35',
                            lg:'33',
                            md:'30',
                            sm:'28',
                            xs:'26',
                        }"
                        :iconColor="isOverLogout ? '#fff':'#585858'"
                    />
                    <div class="smalled-logout-text">
                        Logout
                    </div>
                </div>
            </div>
            <div class="smalled-menu-up">
                <Icon 
                    @clickEvent="closeSmalledMenu"
                    icon="arrow-up.svg"
                    pointer
                    :width="{
                        default:'35',
                        lg:'33',
                        md:'30',
                        sm:'28',
                        xs:'26',
                    }"
                    iconColor="#585858"
                />
            </div>
        </div>
    </transition>
</template>

<script>
import Icon from "@/generic_components/icons/Icons.vue"
import {menuItems} from "@/enum/enum.js"
import {mapGetters,mapMutations} from "vuex"
export default {
    data(){
        return{
            menuItems,
            isOverLogout:false,
            isSmalled:false,
        }
    },
    components:{
        Icon
    },
    mounted(){
        if(window.innerWidth <= 768 && !this.isSmalled)
            this.isSmalled = true
        else if(window.innerWidth > 768 && this.isSmalled)
            this.isSmalled = false
        
        window.addEventListener('resize',e=>{
            if(window.innerWidth <= 768 && !this.isSmalled)
                this.isSmalled = true
            else if(window.innerWidth > 768 && this.isSmalled)
                this.isSmalled = false
        })
    },
    computed:{
        ...mapGetters([
            "getIsOpenSmalledMenu"
        ]),
    },
    methods:{
        ...mapMutations([
            "setIsOpenSmalledMenu"
        ]),
        closeSmalledMenu(){
            this.setIsOpenSmalledMenu(true);
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.menu-main{
    background-color: #EEEEEE;
    height: 100%;
    flex: 0 0 270px;
    @include d-flex(column,space-between,stretch);
    user-select: none;
    font-size: 1.8rem;
    @media screen and (min-width: 1025px) and (max-width: 1440px) {
        flex: 0 0 230px;
    }
    @media screen and (min-width: 769px) and (max-width: 1024px) {
        flex: 0 0 190px;
    }
    .menu-items-wrapper{
        @include d-flex(column,flex-start,stretch);
        gap: 5px;
        padding: 5px 0;
        .menu-items{
            color: #585858;
            cursor: pointer;
            padding: 10px 15px;
            @include d-flex(row,flex-start,center);
            gap: 15px;
            transition: all .1s linear;
            @media screen and (min-width: 1025px) and (max-width: 1440px) {
                padding: 9px 14px;
                gap: 14px;
            }
            @media screen and (min-width: 769px) and (max-width: 1024px) {
                padding: 7px 12px;
                gap: 12px;
            }
            .menu-items-icon{
                flex: 0 0 auto;
                @include d-flex-center;
                
            }
            .menu-items-text{
                flex: 1 0 1px;
                @include d-flex(row,flex-start,center);
            }
            &:hover{
                background-color: rgb(220, 220, 220);
            }
        }
        .active-menu-items{
            @extend .menu-items;
            background-color: rgb(220, 220, 220);
        }
    }
    .logout-wrapper{
        color: #585858;
        margin-bottom: 5px;
        cursor: pointer;
        @include d-flex-center;
        padding: 13px 9px;
        border-top: 1px solid #BBBBBB;
        border-bottom: 1px solid #BBBBBB;
        gap: 10px;
         @media screen and (min-width: 1025px) and (max-width: 1440px) {
            padding: 12px 8px;
            gap: 9px;
        }
        @media screen and (min-width: 769px) and (max-width: 1024px) {
            padding: 11px 7px;
            gap: 8px;
        }
        .logout-text{
            @include d-flex-center
        }
        &:hover{
            background-color: rgb(218, 53, 53);
            color: #fff;
            border: none;
        }
    }
}
.smalled-menu{
    z-index: 999;
    background-color: #EEEEEE;
    user-select: none;
    font-size: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include d-flex(column,space-between,stretch);
    .smalled-menu-items-wrapper{
        @include d-flex(column,flex-start,stretch);
        gap: 5px;
        padding: 15px 0;
        .smalled-menu-items{
            color: #585858;
            cursor: pointer;
            padding: 10px 15px;
            @include d-flex(row,flex-start,center);
            gap: 15px;
            transition: all .1s linear;
            &:hover{
                background-color: rgb(220, 220, 220);
            }
            .smalled-menu-items-icon{
                flex: 0 0 auto;
                @include d-flex-center;
            }
            .smalled-menu-items-text{
                flex: 1 0 1px;
                @include d-flex(row,flex-start,center);
            }
        }
        .active-smalled-menu-items{
            @extend .smalled-menu-items;
            background-color: rgb(220, 220, 220)!important;
            
            
        }
        .smalled-logout-wrapper{
            color: #585858;
            cursor: pointer;
            @include d-flex(row,flex-start,center);
            padding: 10px 15px;
            border-top: 1px solid #BBBBBB;
            border-bottom: 1px solid #BBBBBB;
            gap: 10px;
            &:hover{
                background-color: rgb(218, 53, 53);
                color: #fff;
                border: none;
            }
            .smalled-logout-text{
                @include d-flex-center;
            }
        }
    }
    .smalled-menu-up{
        cursor: pointer;
        @include d-flex-center;
        padding: 20px 15px;
        margin-bottom: 10px;
    }
}
.slide-enter-active{
    animation: slide-down .3s linear forwards;
}
.slide-leave-active{
    animation: slide-up .3s linear forwards;
}
@keyframes slide-down {
    from{
        transform: translateY(-100%);
    }
    to{
        transform: translateY(0);
    }
}
@keyframes slide-up {
    from{
        transform: translateY(0);
    }
    to{
        transform: translateY(-100%);
    }
}
</style>