<template>
    <v-fade-transition>
        <div class="privacy-policy-modal-main">
            <div class="privacy-policy-modal-container">
                <div class="privacy-policy-modal">
                    <div class="header">
                        <div class="title">{{getLang.login.privacy}}</div>
                        <div class="close-icon-placeholder">
                            <img @click="closeModal" class="close-icon" src="@/assets/icons/close-modal.svg" alt="">
                        </div>
                    </div>
                    <div class="text-area">
                        <div class="privacy-policy" v-for="(item,i) in privacyPolicyItems" :key="'privacyPolicy'+i">
                            <div class="title">
                                {{getLang.login.privacyModal[item.title]}}
                            </div>
                            <div class="content">
                                {{getLang.login.privacyModal[item.content]}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-fade-transition>
</template>

<script>
import {mapGetters} from "vuex"
    export default {
        props:{
            openPrivacy:{type:Boolean},
        },
        methods:{
            closeModal(){
                this.$emit('update:openPrivacy',false);
            }
        },
        computed:{
            ...mapGetters([
                "getLang"
            ])
        },
        data() {
            return {
                privacyPolicyItems: [
                    {
                        title: "webSiteTitle",
                        content: "webSiteContent"
                    },
                    {
                        title: "scopeTitle",
                        content: "scopeContent"
                    },
                    {
                        title: "partyTitle",
                        content: "partyContent"
                    }
                ]
            }
        },
    }
</script>

<style lang="scss">
    @import '@/scss/mixins.scss';

    .privacy-policy-modal-main {
        @include d-flex(column, flex-start, stretch);
        flex: 1 0 1px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        backdrop-filter: blur(4px);
        z-index: 99999;
        background: rgba(251, 251, 251, 0.6);

        .privacy-policy-modal-container {
            width: 100%;
            height: 100%;
            @include d-flex(column, center, center);
            flex: 1 0 1px;
            position: relative;
            padding: 10vw;

            .privacy-policy-modal {
                @include d-flex(column, flex-start, stretch);
                flex: 1 0 1px;
                width: 80%;
                background: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: .5vw;

                .header {
                    @include d-flex(row, center, center);
                    flex: 0 0 auto;
                    width: 100%;
                    padding: .1vw;
                    border-bottom: .1vw solid #e0e0e0;

                    .title {
                        @include d-flex(row, center, center);
                        flex: 1 0 1px;
                        font-size: 1vw;
                        height: 100%;
                        font-weight: bold;
                        color: #2D4C8B;

                        @media screen and (max-width:1440px) {
                            font-size: 1.5vw;
                        }

                        @media screen and (max-width:1024px) {
                            font-size: 2vw;
                        }

                        @media screen and (max-width:768px) {
                            font-size: 3vw;
                        }

                        @media screen and (max-width:480px) {
                            font-size: 3.5vw;
                        }
                    }

                    .close-icon-placeholder {
                        @include d-flex(column, center, center);
                        flex: 0 0 auto;
                        color: #fff;
                        padding: 1vw;
                        height: 100%;

                        .close-icon {
                            width: 1.5vw;
                            height: 1.5vw;
                            cursor: pointer;

                            &:hover {
                                opacity: .8;
                            }

                            &:active {
                                opacity: 1;
                            }

                            @media screen and (max-width: 1440px) {
                                width: 1.8vw;
                                height: 1.8vw;
                            }

                            @media screen and (max-width: 1024px) {
                                width: 2vw;
                                height: 2vw;
                            }

                            @media screen and (max-width: 768px) {
                                width: 3vw;
                                height: 3vw;
                            }

                            @media screen and (max-width: 480px) {
                                width: 3.5vw;
                                height: 3.5vw;
                            }


                        }

                        @media screen and (max-width: 1440px) {
                            padding: 1.2vw;
                        }

                        @media screen and (max-width: 1024px) {
                            padding: 1.5vw;
                        }

                        @media screen and (max-width: 768px) {
                            padding: 2vw;
                        }

                        @media screen and (max-width: 480px) {
                            padding: 2.5vw;
                        }
                    }

                    @media screen and (max-width: 1440px) {
                        padding: .3vw;
                    }

                    @media screen and (max-width: 1024px) {
                        padding: .5vw;
                    }

                    @media screen and (max-width: 768px) {
                        padding: 1vw;
                    }

                    @media screen and (max-width: 480px) {
                        padding: 1.2vw;
                    }
                }

                .text-area {
                    @include d-flex(column, flex-start, stretch);
                    flex: 1 0 1px;
                    width: 100%;
                    padding: 1vw;
                    font-size: 1vw;
                    gap: 1vw;
                    color: #000;
                    overflow: auto;
                    scrollbar-color: #C4C4C4 transparent;
                    scrollbar-width: thin;

                    .privacy-policy {
                        @include d-flex(column, flex-start, stretch);
                        width: 100%;
                        gap: .4vw;

                        .title {
                            font-weight: bold;
                            color: #606060;
                            font-size: .9vw;
                            @include d-flex(row, flex-start, center);
                            flex: 0 0 auto;

                            @media screen and (max-width: 1440px) {
                                font-size: 1vw;
                            }

                            @media screen and (max-width: 1024px) {
                                font-size: 1.3vw;
                            }

                            @media screen and (max-width: 768px) {
                                font-size: 1.9vw;
                            }

                            @media screen and (max-width: 570px) {
                                font-size: 2.5vw;
                            }

                            @media screen and (max-width: 480px) {
                                font-size: 3.1vw;
                            }
                        }

                        .content {
                            font-weight: 400;
                            color: #000;
                            font-size: .8vw;
                            word-break: break-word;
                            @include d-flex(row, flex-start, center);
                            flex: 1 0 1px;

                            @media screen and (max-width: 1440px) {
                                font-size: .9vw;
                            }

                            @media screen and (max-width: 1024px) {
                                font-size: 1.2vw;
                            }

                            @media screen and (max-width: 768px) {
                                font-size: 1.8vw;
                            }

                            @media screen and (max-width: 570px) {
                                font-size: 2.4vw;
                            }

                            @media screen and (max-width: 480px) {
                                font-size: 3vw;
                            }
                        }

                        @media screen and (max-width: 1440px) {
                            gap: .6vw;
                        }

                        @media screen and (max-width: 1024px) {
                            gap: .8vw;
                        }

                        @media screen and (max-width: 768px) {
                            gap: 1.2vw;
                        }

                        @media screen and (max-width: 570px) {
                            gap: 1.4vw;
                        }

                        @media screen and (max-width: 480px) {
                            gap: 1.8vw;
                        }
                    }

                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: #C4C4C4;
                    }

                    @media screen and (max-width:1440px){
                        padding: 1.2vw;
                        gap: 1.2vw;
                    }

                    @media screen and (max-width:1024px){
                        padding: 1.5vw;
                        gap: 1.5vw;
                    }

                    @media screen and (max-width:768px){
                        padding: 2vw;
                        gap: 2vw;
                    }

                    @media screen and (max-width:480px){
                        padding: 2.5vw;
                        gap: 2.5vw;
                    }
                }

                @media screen and (max-width: 1440px) {
                    width: 85%;
                    border-radius: .6vw;
                }

                @media screen and (max-width: 1024px) {
                    width: 90%;
                    border-radius: .7vw;
                }

                @media screen and (max-width: 768px) {
                    width: 100%;
                }
            }

            @media screen and (max-width: 1024px) {
                padding: 12vw;
            }

            @media screen and (max-width: 768px) {
                padding: 0;
            }


        }
    }
</style>