<template>
    <div class="payment-main-wrapper">
        <div class="payment-main">
          <div class="button-wrapper">
            <button @click="goBack" class="back-button">Back</button>
          </div>
            <div class="switch-wrapper">
                <div class="switch">
                    <transition name="slide-mounth">
                        <div v-if="selectedSwitch == 'mounth'" style="left:0" class="current-switch">
                        </div>
                    </transition>
                    <transition name="slide-annual">
                        <div v-if="selectedSwitch == 'annual'" style="right:0" class="current-switch">
                        </div>
                    </transition>
                    <div id="mounth" style="color:#fff" @click="changeSwitch('mounth')" class="mounth">
                        Mounthly
                    </div>
                    <div id="annual" @click="changeSwitch('annual')" class="annual">
                        Annual
                    </div>
                </div>
            </div>
            <div class="plans">
                <div v-for="(item,i) in paymentPlans" :key="'plan'+i" class="plan-card">
                    <div class="top-of-card">
                        <div class="plan-card-header">
                            <div class="plan-type">
                                {{item.title}}
                            </div>
                            <div class="per-account">
                                Per account
                            </div>
                        </div>
                        <div class="price">
                            <div class="dollar">
                                $
                            </div>
                            <div class="price-first">
                                <template v-if="selectedSwitch == 'mounth'">
                                    {{item.price1}}.
                                </template>
                                <template v-else>
                                    {{item.price2}}.
                                </template>
                            </div>
                            <div class="price-second">
                                {{item.secondPrice}}
                            </div>
                        </div>
                    </div>
                    <div class="plans-content">
                        <div v-for="(content,j) in item.content" :key="'content'+j" class="content-item">
                            <div class="check-icon">
                                <img class="icon" src="@/assets/icons/verified.svg" alt="">
                            </div>
                            <div class="content-text">
                                {{content}}
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-footer">
                        <div class="whatsapp-account">
                            <div class="text">
                                WhatsApp Account
                            </div>
                            <input v-model="item.priceHolder" placeholder="Num" class="accounts-input" spellcheck="none"
                                type="number">
                        </div>
                        <button @click="openPaymentModal(item)" class="confirm-button">Choose Plan</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                currentPrice: null,
                selectedSwitch: 'mounth',
                paymentPlans: [{
                        title: 'Standart / Only API',
                        value: 'standart-mounth',
                        priceHolder: "1",
                        price1: 8,
                        price2: 6,
                        secondPrice: 99,
                        content: [
                            "Link Creator",
                            "Base64 Converter",
                            "Access to WhatsApp Account ",
                            "Up to 100.000 messages / day",
                            "Quick Onboarding",
                        ]
                    },
                    {
                        title: 'Professional',
                        value: 'professional-mounth',
                        priceHolder: "1",
                        price1: 14,
                        price2: 11,
                        secondPrice: 99,
                        content: [
                            "Link Creator",
                            "Base64 Converter",
                            "Contact List Last Seen",
                            "Contact List Online Time Detail",
                            "Contact List Typing Details",
                            "Access to WhatsApp Account ",
                            "Up to 100.000 messages / day",
                            "Quick Onboarding",
                        ]
                    },
                ],
                isPlanSelected: false,
            }
        },
        methods: {
            goBack() {
                this.$store.state.routeInHomePage = false;
                this.$router.push('/');
            },
            changeSwitch(item) {
                this.selectedSwitch = item;
                if (item == 'mounth') {
                    setTimeout(() => {
                        document.getElementById('mounth').style.color = '#fff'
                        document.getElementById('annual').style.color = '#000'
                    }, 125)
                } else {
                    setTimeout(() => {
                        document.getElementById('mounth').style.color = '#000'
                        document.getElementById('annual').style.color = '#fff'
                    }, 125)
                }
            },
            openPaymentModal(item) {
                if (this.selectedSwitch == 'mounth') {
                    let x = `${item.price1}.${item.secondPrice}`
                    let selectedPrice = parseFloat(x);
                    this.currentPrice = selectedPrice * parseInt(item.priceHolder)
                    this.isPlanSelected = true;
                } else {
                    let x = `${item.price2}.${item.secondPrice}`
                    let selectedPrice = parseFloat(x);
                    this.currentPrice = selectedPrice * parseInt(item.priceHolder)
                    this.isPlanSelected = true;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '@/scss/mixins.scss';

    .payment-main-wrapper {
        height: 100%;
        width: 100%;
        overflow: auto;

        .payment-main {
            @include d-flex(column, flex-start, center);
            width: 100%;
            gap: 0.5vw;
            position: relative;

            @media screen and (max-width:1750px) {
                gap: 0.7vw;
            }

            @media screen and (max-width:1440px) {
                gap: 0.9vw;
            }

            @media screen and (max-width:1024px) {
                gap: 1.1vw;
            }

            @media screen and (max-width:768px) {
                gap: 1.5vw;
            }

            @media screen and (max-width:570px) {
                gap: 2vw;
            }
            .button-wrapper{
              width: 100%;
              @include d-flex(row,flex-start,center);
              padding: 10px;
              .back-button{
                padding: 6px 18px;
                border-radius: 8px;
                outline: none;
                background-color: rgb(77, 77, 77);
                color: #fff;
                cursor: pointer;
                font-size: 2rem;
              }
            }
            
            .switch-wrapper {
                flex: 0 0 auto;
                @include d-flex-center;

                @media screen and (max-width:570px) {
                    width: 90%;
                }

                @media screen and (max-width:425px) {
                    width: 98%;
                }

                .switch {
                    @include d-flex(row, space-around, center);
                    font-size: 1vw;
                    width: 100%;
                    border-radius: 999px;
                    background-color: #fff;
                    position: relative;
                    -webkit-box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.63);
                    -moz-box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.63);
                    box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.63);

                    @media screen and (max-width:1750px) {
                        font-size: 1.2vw;
                    }

                    @media screen and (max-width:1440px) {
                        font-size: 1.4vw;
                    }

                    @media screen and (max-width:1024px) {
                        font-size: 1.8vw;
                    }

                    @media screen and (max-width:768px) {
                        font-size: 2.4vw;
                    }

                    @media screen and (max-width:570px) {
                        font-size: 3vw;
                    }

                    @media screen and (max-width:425px) {
                        font-size: 5vw;
                    }

                    .current-switch {
                        height: 100%;
                        width: 50%;
                        border-radius: 999px;
                        z-index: 1;
                        background: linear-gradient(99.22deg, #4F83CE 7.27%, #87E8B6 100.65%);
                        position: absolute;
                        transition: all .3s ease-in;

                    }

                    .mounth {
                        z-index: 2;
                        padding: 0.8vw;
                        width: 10vw;
                        @include d-flex-center;
                        border-radius: 999px;
                        flex: 1 0 1px;
                        cursor: pointer;
                        user-select: none;

                        @media screen and (max-width:1750px) {
                            padding: 1vw;
                            width: 12vw;
                        }

                        @media screen and (max-width:1440px) {
                            padding: 1.2vw;
                            width: 14vw;
                        }

                        @media screen and (max-width:1024px) {
                            padding: 1.6vw;
                            width: 18vw;
                        }

                        @media screen and (max-width:768px) {
                            padding: 2vw;
                            width: 22vw;
                        }

                        @media screen and (max-width:570px) {
                            padding: 2.6vw;
                        }

                        @media screen and (max-width:425px) {
                            padding: 4vw;
                        }
                    }

                    .annual {
                        @extend .mounth;
                    }
                }
            }

            .plans {
                flex: 1 0 1px;
                width: 100%;
                @include d-flex(row, space-evenly, stretch);

                @media screen and (max-width:1750px) {}

                @media screen and (max-width:1440px) {}

                @media screen and (max-width:1024px) {
                    @include d-flex(column, flex-start, center);
                    gap: 2vw;
                }

                @media screen and (max-width:768px) {
                    gap: 2.5vw;
                }

                @media screen and (max-width:570px) {
                    padding: 0;
                    gap: 3vw;
                }

                .plan-card {
                    width: 30%;
                    background: rgba(250, 250, 250, 0.85);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding-bottom: 1.4vw;
                    @include d-flex(column, flex-start, center);

                    @media screen and (max-width:1750px) {
                        padding: 1.2vw;
                        width: 40%;
                    }

                    @media screen and (max-width:1440px) {
                        padding: 1.5vw;
                    }

                    @media screen and (max-width:1024px) {
                        padding: 2vw;
                        width: 98%;
                    }

                    @media screen and (max-width:768px) {
                        padding: 2.5vw;
                    }

                    @media screen and (max-width:570px) {
                        padding: 3vw;
                        width: 100%;
                        border-radius: 0;
                    }

                    .top-of-card {
                        width: 100%;
                        @include d-flex(column, flex-start, center);
                        margin-top: 1vw;

                        @media screen and (max-width:1750px) {
                            margin-top: 1.2vw;
                        }

                        @media screen and (max-width:1440px) {
                            margin-top: 1vw;
                        }

                        @media screen and (max-width:1024px) {}

                        @media screen and (max-width:768px) {
                            margin-top: 2vw;
                        }

                        @media screen and (max-width:570px) {
                            margin-top: 3vw;
                        }

                        .plan-card-header {
                            width: 100%;
                            background-color: #fff;
                            padding: 0.5vw;
                            gap: 0.2vw;
                            @include d-flex(column, flex-start, center);

                            @media screen and (max-width:1750px) {}

                            @media screen and (max-width:1440px) {
                                padding: 0.8vw;
                                gap: 0.3vw;
                            }

                            @media screen and (max-width:1024px) {}

                            @media screen and (max-width:768px) {
                                padding: 1vw;
                                gap: 0.4vw;
                            }

                            @media screen and (max-width:570px) {
                                padding: 1.2vw;
                                gap: 0.6vw;
                            }

                            .plan-type {
                                @include d-flex-center;
                                font-size: 1.3vw;
                                color: #454545;
                                font-weight: 500;

                                @media screen and (max-width:1750px) {}

                                @media screen and (max-width:1440px) {
                                    font-size: 1.6vw;
                                }

                                @media screen and (max-width:1024px) {
                                    font-size: 2.1vw;
                                }

                                @media screen and (max-width:768px) {
                                    font-size: 2.9vw;
                                }

                                @media screen and (max-width:570px) {
                                    font-size: 4vw;
                                }
                            }

                            .per-account {
                                font-size: 0.8vw;
                                color: #454545;
                                @include d-flex-center;
                                font-weight: 300;

                                @media screen and (max-width:1440px) {
                                    font-size: 1.1vw;
                                }

                                @media screen and (max-width:1024px) {
                                    font-size: 1.6vw;
                                }

                                @media screen and (max-width:768px) {
                                    font-size: 2.4vw;
                                }

                                @media screen and (max-width:570px) {
                                    font-size: 3.5vw;
                                }
                            }
                        }

                        .price {
                            border-bottom: 1px solid #E3E3E3;
                            color: #4F84CF;
                            @include d-flex(row, center, stretch);
                            width: 100%;
                            padding: 0.1vw;

                            @media screen and (max-width:1440px) {
                                padding: 0.2vw;
                            }

                            @media screen and (max-width:1024px) {
                                padding: 0.3vw;
                            }

                            @media screen and (max-width:768px) {
                                padding: 0.4vw;
                            }

                            @media screen and (max-width:570px) {
                                padding: 0.6vw;
                            }

                            .dollar {
                                @include d-flex(column, flex-start, center);
                                font-size: 1vw;

                                @media screen and (max-width:1750px) {
                                    font-size: 1.3vw;
                                }

                                @media screen and (max-width:1440px) {
                                    font-size: 1.6vw;
                                }

                                @media screen and (max-width:1024px) {
                                    font-size: 1.9vw;
                                }

                                @media screen and (max-width:768px) {
                                    font-size: 2.5vw;
                                }

                                @media screen and (max-width:570px) {
                                    font-size: 3vw;
                                }

                                @media screen and (max-width:425px) {
                                    font-size: 4vw;
                                }
                            }

                            .price-first {
                                font-size: 2.5vw;
                                @include d-flex(column, flex-end, center);

                                @media screen and (max-width:1750px) {
                                    font-size: 3.2vw;
                                }

                                @media screen and (max-width:1440px) {
                                    font-size: 3.9vw;
                                }

                                @media screen and (max-width:1024px) {
                                    font-size: 4.6vw;
                                }

                                @media screen and (max-width:768px) {
                                    font-size: 5.5vw;
                                }

                                @media screen and (max-width:570px) {
                                    font-size: 6.6vw;
                                }

                                @media screen and (max-width:425px) {
                                    font-size: 8vw;
                                }
                            }

                            .price-second {
                                @include d-flex(column, flex-end, center);
                                font-size: 1.5vw;
                                padding-bottom: 0.25vw;

                                @media screen and (max-width:1750px) {
                                    font-size: 2vw;
                                }

                                @media screen and (max-width:1440px) {
                                    font-size: 2.4vw;
                                }

                                @media screen and (max-width:1024px) {
                                    font-size: 2.8vw;
                                }

                                @media screen and (max-width:768px) {
                                    font-size: 3.7vw;
                                }

                                @media screen and (max-width:570px) {
                                    font-size: 4.5vw;
                                }

                                @media screen and (max-width:425px) {
                                    font-size: 6vw;
                                }
                            }
                        }
                    }

                    .plans-content {
                        @include d-flex(column, space-evenly, center);
                        flex: 1 0 1px;
                        width: 80%;
                        margin-bottom: 1.3vw;

                        @media screen and (max-width:1750px) {
                            margin-bottom: 1.5vw;
                        }

                        @media screen and (max-width:1440px) {
                            margin-bottom: 1.7vw;
                        }

                        @media screen and (max-width:1024px) {
                            margin-bottom: 2vw;
                        }

                        @media screen and (max-width:768px) {
                            margin-bottom: 2.4vw;
                        }

                        @media screen and (max-width:570px) {
                            margin-bottom: 2.8vw;
                        }

                        @media screen and (max-width:425px) {}

                        .content-item {
                            @include d-flex(row, flex-start, center);
                            width: 100%;

                            .check-icon {
                                @include d-flex-center;
                                padding: 0.3vw;

                                @media screen and (max-width:1440px) {}

                                @media screen and (max-width:1024px) {
                                    padding: 0.5vw;
                                }

                                @media screen and (max-width:768px) {
                                    padding: 0.8vw;
                                }

                                @media screen and (max-width:570px) {
                                    padding: 1vw;
                                }

                                @media screen and (max-width:425px) {}

                                .icon {
                                    width: 1.6vw;

                                    @media screen and (max-width:1440px) {
                                        width: 2vw;
                                    }

                                    @media screen and (max-width:1024px) {
                                        width: 2.7vw;
                                    }

                                    @media screen and (max-width:768px) {
                                        width: 3.7vw;
                                    }

                                    @media screen and (max-width:570px) {
                                        width: 5vw;
                                    }

                                    @media screen and (max-width:425px) {
                                        width: 7vw;
                                    }
                                }
                            }

                            .content-text {
                                padding: 0.3vw;
                                @include d-flex-center;
                                font-size: 1vw;
                                font-weight: normal;

                                @media screen and (max-width:1750px) {
                                    font-size: 1.1vw;
                                }

                                @media screen and (max-width:1440px) {
                                    font-size: 1.3vw;
                                }

                                @media screen and (max-width:1024px) {
                                    padding: 0.5vw;
                                    font-size: 1.9vw;
                                }

                                @media screen and (max-width:768px) {
                                    padding: 0.8vw;
                                    font-size: 2.5vw;
                                }

                                @media screen and (max-width:570px) {
                                    padding: 1vw;
                                    font-size: 3vw;
                                }

                                @media screen and (max-width:425px) {
                                    font-size: 4vw;
                                }
                            }
                        }
                    }

                    .card-footer {
                        @include d-flex(column, flex-start, center);
                        gap: 1vw;
                        width: 100%;

                        @media screen and (max-width:1750px) {
                            gap: 1.3vw;
                        }

                        @media screen and (max-width:1440px) {
                            gap: 1.6vw;
                        }

                        @media screen and (max-width:1024px) {
                            gap: 1.9vw;
                        }

                        @media screen and (max-width:768px) {
                            gap: 2.5vw;
                        }

                        @media screen and (max-width:570px) {
                            gap: 3vw;
                        }

                        @media screen and (max-width:425px) {
                            gap: 4vw;
                        }

                        .whatsapp-account {
                            width: 60%;
                            background-color: #4E83CD;
                            border-radius: 0.4vw;
                            color: #fff;
                            @include d-flex(row, space-around, center);

                            @media screen and (max-width:1750px) {}

                            @media screen and (max-width:1440px) {
                                width: 70%;
                            }

                            @media screen and (max-width:1024px) {
                                width: 50%;
                            }

                            @media screen and (max-width:768px) {
                                width: 70%;
                            }

                            @media screen and (max-width:570px) {
                                width: 90%;
                            }

                            @media screen and (max-width:425px) {}

                            .text {
                                font-size: 1vw;
                                @include d-flex-center;
                                padding: 0.5vw;

                                @media screen and (max-width:1750px) {
                                    font-size: 1.1vw;
                                }

                                @media screen and (max-width:1440px) {
                                    font-size: 1.3vw;
                                }

                                @media screen and (max-width:1024px) {
                                    padding: 0.5vw;
                                    font-size: 1.9vw;
                                }

                                @media screen and (max-width:768px) {
                                    padding: 0.8vw;
                                    font-size: 2.5vw;
                                }

                                @media screen and (max-width:570px) {
                                    padding: 1vw;
                                    font-size: 3vw;
                                }

                                @media screen and (max-width:425px) {
                                    font-size: 4vw;
                                }
                            }

                            .accounts-input {
                                width: 3vw;
                                padding: 0.3vw;
                                font-size: 0.8vw;
                                appearance: none;
                                outline: none;
                                border-radius: 5px;
                                -webkit-box-shadow: 0px 0px 18px -8px rgba(0, 0, 0, 0.63);
                                box-shadow: 0px 0px 18px -8px rgba(0, 0, 0, 0.63);
                                background-color: #fff;

                                @media screen and (max-width:1750px) {
                                    width: 4vw;
                                    font-size: 0.9vw;
                                    padding: 0.2vw;
                                }

                                @media screen and (max-width:1440px) {
                                    font-size: 1vw;
                                    width: 4.5vw;
                                }

                                @media screen and (max-width:1024px) {
                                    padding: 0.5vw;
                                    font-size: 1.2vw;
                                    width: 6vw;
                                }

                                @media screen and (max-width:768px) {
                                    font-size: 1.6vw;
                                    width: 7vw;
                                }

                                @media screen and (max-width:570px) {
                                    font-size: 2.4vw;
                                    width: 9vw;
                                }

                                @media screen and (max-width:425px) {
                                    font-size: 3.4vw;
                                    width: 12vw;
                                }
                            }
                        }

                        .confirm-button {
                            background-color: #87E8B6;
                            color: #487BC3;
                            border-radius: 0.4vw;
                            padding: 0.6vw 1.2vw;
                            font-size: 1vw;
                            transition: all .1s ease-in;

                            @media screen and (max-width:1750px) {
                                font-size: 1.1vw;
                            }

                            @media screen and (max-width:1440px) {
                                font-size: 1.3vw;
                                padding: 0.8vw 1.4vw;
                            }

                            @media screen and (max-width:1024px) {
                                font-size: 1.9vw;
                                padding: 1vw 1.6vw;
                            }

                            @media screen and (max-width:768px) {
                                font-size: 2.5vw;
                            }

                            @media screen and (max-width:570px) {
                                font-size: 3vw;
                                padding: 1.3vw 1.9vw;
                            }

                            @media screen and (max-width:425px) {
                                font-size: 4vw;
                            }

                            &:hover {
                                color: #fff;
                            }
                        }
                    }
                }
            }

            .header {
                @include d-flex(row, space-between, center);
                width: 100%;
                padding: 1vw 0.7vw;
                color: #4E83CE;
                font-size: 1.25vw;
                background: rgba(251, 251, 251, 0.8);
                box-shadow: 0px 4px 4px rgba(79, 131, 206, 0.13);
                -webkit-box-shadow: 0px 4px 4px rgba(79, 131, 206, 0.13);
                -moz-box-shadow: 0px 4px 4px rgba(79, 131, 206, 0.13);

                @media screen and (max-width:1440px) {
                    padding: 1.2vw 0.9vw;
                }

                @media screen and (max-width:1024px) {
                    padding: 1.4vw 1.1vw;
                }

                @media screen and (max-width:768px) {
                    padding: 1.8vw 1.5vw;
                }

                @media screen and (max-width:570px) {
                    padding: 2.2vw 1.9vw;
                }

                .title {
                    gap: .8vw;
                    @include d-flex(row, flex-start, center);

                    .header-title {
                        @include d-flex-center;
                        font-size: 1.3vw;
                        color: #4E83CE;

                        @media screen and (max-width:1440px) {
                            font-size: 1.6vw;
                        }

                        @media screen and (max-width:1024px) {
                            font-size: 2.4vw;
                        }

                        @media screen and (max-width:768px) {
                            font-size: 3vw;
                        }

                        @media screen and (max-width:570px) {
                            font-size: 4vw;
                        }

                        @media screen and (max-width:425px) {
                            font-size: 6vw;
                        }
                    }

                    .header-icon {
                        @extend .header-title;

                        .icon {
                            width: 1.8vw;

                            @media screen and (max-width:1440px) {
                                width: 2.1vw;
                            }

                            @media screen and (max-width:1024px) {
                                width: 3vw;
                            }

                            @media screen and (max-width:768px) {
                                width: 3.8vw;
                            }

                            @media screen and (max-width:570px) {
                                width: 5vw;
                            }

                            @media screen and (max-width:425px) {
                                width: 7vw;
                            }
                        }
                    }
                }

                .right-side {
                    @include d-flex(row, flex-start, center);
                    gap: 3vw;

                    @media screen and (max-width:570px) {
                        gap: 4vw;
                    }

                    @media screen and (max-width:425px) {
                        gap: 5vw;
                    }

                    .go-back {
                        @include d-flex-center;
                        text-align: center;
                        padding: .3vw;
                        cursor: pointer;
                        font-size: 1vw;
                        transition: all .1s ease-in;

                        &:hover {
                            color: #71acff;
                        }

                        @media screen and (max-width:1440px) {
                            font-size: 1.1vw;
                        }

                        @media screen and (max-width:1024px) {
                            font-size: 1.3vw;
                        }

                        @media screen and (max-width:768px) {
                            font-size: 1.8vw;
                        }

                        @media screen and (max-width:570px) {
                            font-size: 2.4vw;
                        }

                        @media screen and (max-width:425px) {
                            font-size: 3.4vw;
                        }
                    }
                }

            }
        }
    }


    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity .4s;
    }

    .fade-leave {}

    .fade-leave-active {
        transition: opacity .4s;
        opacity: 0;
    }

    .slide-mounth-enter-active {
        animation: slide-mounth-left .25s ease-out forwards;
    }

    .slide-mounth-leave {
        opacity: 0;
    }

    .slide-annual-enter-active {
        animation: slide-annual-right .25s ease-out forwards;
    }

    .slide-annual-leave {
        opacity: 0;
    }

    // .slide-annual-leave-active {
    //   animation: slide-annual-left .25s ease-in forwards;
    // }

    @keyframes slide-mounth-left {
        from {
            transform: translateX(100%);
        }

        to {
            transform: translateX(0px);
        }
    }

    @keyframes slide-annual-right {
        from {
            transform: translateX(-100%);
        }

        to {
            transform: translateX(0px);
        }
    }
</style>