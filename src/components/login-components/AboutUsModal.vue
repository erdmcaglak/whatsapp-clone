<template>
    <v-fade-transition>
        <div class="about-us-modal-main">
            <div class="about-us-modal-container">
                <div class="about-us-modal">
                    <div class="header">
                        <div class="title">About Us</div>
                        <div class="close-icon-placeholder">
                            <img @click="closeModal" class="close-icon" src="@/assets/icons/close-modal.svg" alt="">
                        </div>
                    </div>
                    <div class="text-area">
                        <div class="about-us" v-for="(item,i) in aboutUsItems" :key="'content' + i">
                            <div class="content">
                                {{getLang.login.aboutUsModal[item]}}
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div v-for="item in footerItem" :key="item.href" class="footer-items">
                            <div class="icon-placeholder">
                                <img class="footer-icon" :src="require('@/assets/icons/'+item.src)" alt="">
                            </div>
                            <div class="footer-item">
                                <a target="_blank" :href="item.href">{{getLang.login.aboutUsModal.footerItem[item.title]}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-fade-transition>
</template>

<script>
import {mapMutations,mapGetters} from "vuex"
    export default {
        props:{
            openModal:{type:Boolean}
        },
        computed:{
            ...mapGetters([
                "getLang"
            ])
        },
        methods:{
            closeModal(){
                this.$emit('update:openModal',false);
            }
        },
        data() {
            return {
                aboutUsItems: [
                    "item1",
                    "item2",
                    "item3",
                    "item4",
                    "item5"
                ],
                footerItem: [{
                    title: 'numTitle',
                    src: 'telephone-icon.svg',
                    href: 'tel:+90 850 885 2008'
                }, {
                    title: 'locationTitle',
                    src: 'location-icon.svg',
                    href: 'https://www.google.com/maps/place/KONNEKA+Bilgi+ve+%C4%B0leti%C5%9Fim+Teknolojileri/@39.8770152,32.7446046,17z/data=!3m1!4b1!4m5!3m4!1s0x14d3470ea5798add:0x13ee112412e22f1a!8m2!3d39.8769727!4d32.7469671'
                }, {
                    title: 'mailtitle',
                    src: 'mail-icon.svg',
                    href: 'mailto:info@konneka.com'
                }]
            }
        },
    }
</script>

<style lang="scss">
    @import '@/scss/mixins.scss';
    .about-us-modal-main {
        @include d-flex(column, flex-start, stretch);
        flex: 1 0 1px;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        backdrop-filter: blur(4px);
        z-index: 99999;
        background: rgba(251, 251, 251, 0.6);

        .about-us-modal-container {
            width: 100%;
            height: 100%;
            @include d-flex(column, center, center);
            flex: 1 0 1px;
            position: relative;
            padding: 10vw;

            .about-us-modal {
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
                        font-weight: bold;
                        color: #2D4C8B;
                        height: 100%;

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

                    .about-us {
                        @include d-flex(column, flex-start, stretch);
                        width: 100%;

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
                    }

                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: #C4C4C4;
                    }

                    @media screen and (max-width:1440px) {
                        padding: 1.2vw;
                        gap: 1.2vw;
                    }

                    @media screen and (max-width:1024px) {
                        padding: 1.5vw;
                        gap: 1.5vw;
                    }

                    @media screen and (max-width:768px) {
                        padding: 2vw;
                        gap: 2vw;
                    }

                    @media screen and (max-width:480px) {
                        padding: 2.5vw;
                        gap: 2.5vw;
                    }
                }

                .footer {
                    @include d-flex(row, space-between, center);
                    flex: 0 0 auto;
                    padding: 1vw 4vw;
                    background-color: #5A87C5;
                    border-bottom-left-radius: .5vw;
                    border-bottom-right-radius: .5vw;

                    .footer-items {
                        @include d-flex(row, space-around, center);
                        gap: .5vw;
                        flex: 0 0 auto;

                        .icon-placeholder {
                            @include d-flex(column, center, center);
                            padding: .5vw;
                            background-color: #fff;
                            border-radius: 999px;

                            .footer-icon {
                                width: 1vw;
                                height: 1vw;

                                @media screen and (max-width: 1440px) {
                                    width: 1.2vw;
                                    height: 1.2vw;
                                }

                                @media screen and (max-width: 1024px) {
                                    width: 1.5vw;
                                    height: 1.5vw;
                                }

                                @media screen and (max-width: 768px) {
                                    width: 2vw;
                                    height: 2vw;
                                }

                                @media screen and (max-width: 480px) {
                                    width: 2.5vw;
                                    height: 2.5vw;
                                }
                            }

                            @media screen and (max-width: 1440px) {
                                padding: .8vw;
                            }

                            @media screen and (max-width: 1024px) {
                                padding: 1vw;
                            }

                            @media screen and (max-width: 768px) {
                                padding: 1.2vw;
                            }

                            @media screen and (max-width: 480px) {
                                padding: 1.5vw;
                            }
                        }

                        .footer-item {
                            font-size: .8vw;
                            color: #fff;
                            @include d-flex(row, center, center);
                            flex: 1 0 1px;
                            word-break: break-word;

                            a {
                                color: #fff;
                                text-decoration: none;
                            }

                            @media screen and (max-width: 1440px) {
                                font-size: .9vw;
                            }

                            @media screen and (max-width: 1024px) {
                                font-size: 1.2vw;
                            }

                            @media screen and (max-width: 768px) {
                                font-size: 1.8vw;
                            }

                            @media screen and (max-width: 480px) {
                                font-size: 2.4vw;
                            }
                        }
                    }

                    @media screen and (max-width: 1440px) {
                        padding: 1.7vw 4vw;
                    }

                    @media screen and (max-width: 1024px) {
                        padding: 2vw 4vw;
                    }

                    @media screen and (max-width: 768px) {
                        padding: 2.5vw 4vw;
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                        gap: 1.5vw;
                        @include d-flex(column, flex-start, stretch);
                    }

                    @media screen and (max-width: 480px) {
                        gap: 2vw;
                        padding: 3vw 4vw;
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