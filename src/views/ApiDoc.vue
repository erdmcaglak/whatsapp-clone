<template>
    <div class="docs-wrapper">
        <div v-if="isDesktop" class="docs-main">
            <div class="methods-container">
                <div class="methods-card">
                    <div class="card-title">METHODS</div>
                    <div @click="setSelectedMethod(api,index),jsonBeautify(api.isSelected,api.response,index)"
                        class="method-row" v-for="(api,index) in apiList" :key="api.url"
                        :style="api.isSelected ? 'background-color:#E6EEF6;' : 'background-color:#F4F5F7;' ">
                        <div class="method-box"
                            :style="api.type === 'GET' ? 'background-color:#3C6DB2;' : 'background-color:#02AF02;' ">
                            {{api.type}}</div>
                        <div class="method-url">{{api.url}}</div>
                        <div v-if="!api.isSelected" class="row-icon"><img style="width:2.2vmin;"
                                src="@/assets/icons/chevron-down.svg" alt=""></div>
                        <div v-else class="row-icon"><img style="width:2.2vmin;" src="@/assets/icons/chevron-right.svg"
                                alt=""></div>
                    </div>
                </div>
                <v-fade-transition>
                    <div v-if="selectedMethod.isSelected" class="selected-method-card">
                        <div
                            :class="selectedMethod.type === 'GET' ? 'card-container custom-scrollbar-blue' : 'card-container custom-scrollbar-green' ">
                            <div class="card-title"
                                :style="selectedMethod.type === 'GET' ? 'background-color:#3C6DB2;' : 'background-color:#02AF02;' ">
                                {{selectedMethod.type}}
                            </div>
                            <div class="api-url">{{selectedMethod.url}}</div>
                            <div class="api-about">{{selectedMethod.apiAbout}}</div>
                            <template v-if="selectedMethod.parameters">
                                <div class="parameters-title"
                                    :style="selectedMethod.type === 'GET' ? 'color:#3C6DB2;' : 'color:#02AF02;' ">
                                    Parameters
                                </div>
                                <div class="api-usage-table">
                                    <div class="table-header">
                                        <div class="header-title">Paramater</div>
                                        <div class="header-title">Description</div>
                                        <div class="header-title">Data type</div>
                                    </div>
                                    <div class="table-content" v-for="parameter in selectedMethod.parameters"
                                        :key="parameter.title">
                                        <div class="content" style="flex:1 0 1vw;">{{parameter.title}}
                                        </div>
                                        <div class="content" style="flex:2 0 2vw;">
                                            {{parameter.description}}
                                        </div>
                                        <div class="content" style="flex:1 0 1vw; justify-content:flex-end;">
                                            {{parameter.dataType}}
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="selectedMethod.response">
                                <div class="response-title"
                                    :style="selectedMethod.type === 'GET' ? 'color:#3C6DB2;' : 'color:#02AF02;' ">
                                    Example
                                    response</div>
                                <div :id="'api-response' + selectedMethod.index"
                                    :class="selectedMethod.type === 'POST' ? 'example-response response-box-green' : 'example-response response-box-blue' ">
                                </div>
                            </template>
                        </div>
                    </div>
                </v-fade-transition>
            </div>
        </div>
        <div v-if="isTablet" class="docs-main-tablet">
            <div class="methods-container-tablet">
                <div class="methods-card-tablet">
                    <div class="method-column-tablet" v-for="(api,index) in apiList" :key="api.url"
                        @click="jsonBeautify(api.isSelected,api.response,index)"
                        :style="(api.isSelected && api.type === 'POST') ? 'background-color:#c1fec1;' : (api.isSelected && api.type === 'GET') ? 'background-color:#dfe8f4;' : 'background-color:#F4F5F7;' ">
                        <div class="methods-row-tablet" @click="api.isSelected = !api.isSelected"
                            :style="(api.isSelected && api.type === 'POST') ? 'background-color:#c1fec1;' : (api.isSelected && api.type === 'GET') ? 'background-color:#dfe8f4;' : 'background-color:#F4F5F7;' ">
                            <div class="method-box-tablet"
                                :style="(api.isSelected && api.type === 'POST') ? 'color:#02AF02; background-color:#fff;' : (api.isSelected && api.type === 'GET') ? 'color:#3C6DB2; background-color:#fff;' : (!api.isSelected && api.type === 'GET') ? 'background-color:#3C6DB2;' : 'background-color:#02AF02;' ">
                                {{api.type}}
                            </div>
                            <div class="method-url-tablet">
                                {{api.url}}
                            </div>
                            <div @click.self="api.isSelected = !api.isSelected" class="row-icon-tablet">
                                <img v-if="!api.isSelected" 
                                    src="@/assets/icons/chevron-down.svg" alt="" class="down-icon-tablet">
                                <img v-else src="@/assets/icons/chevron-up.svg" alt=""
                                    class="up-icon-tablet">
                            </div>
                        </div>
                        <div v-if="api.isSelected" class="api-about-container-tablet">
                            <div class="api-about-row">{{api.apiAbout}}</div>
                            <template v-if="api.parameters">
                                <div class="parameters-title"
                                    :style="api.type === 'GET' ? 'color:#3C6DB2;' : 'color:#02AF02;' ">
                                    Parameters
                                </div>
                                <div class="api-usage-table">
                                    <div class="table-header">
                                        <div class="header-title">Paramater</div>
                                        <div class="header-title">Description</div>
                                        <div class="header-title">Data type</div>
                                    </div>
                                    <div class="table-content" v-for="parameter in api.parameters"
                                        :key="parameter.title">
                                        <div class="content" style="flex:1 0 1vw;">{{parameter.title}}
                                        </div>
                                        <div class="content" style="flex:2 0 2vw;">
                                            {{parameter.description}}
                                        </div>
                                        <div class="content" style="flex:1 0 1vw; justify-content:flex-end;">
                                            {{parameter.dataType}}
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="api.response">
                                <div class="response-title"
                                    :style="api.type === 'GET' ? 'color:#3C6DB2;' : 'color:#02AF02;' ">
                                    Example
                                    response</div>
                                <div :id="'api-response' + index" class="example-response"></div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isMobile" class="docs-main-mobile">
            <div class="methods-container-mobile" v-if="!selectedMethod.isSelected">
                <div v-for="(api,index) in apiList" :key="api.url" class="method-row-mobile"
                    @click="setSelectedMethod(api,index),jsonBeautify(api.isSelected,api.response,index)"
                    :style="api.type === 'GET' ? 'border:1px solid #3C6DB2;' : 'border:1px solid #02AF02;' ">
                    <div class="method-box-mobile"
                        :style="api.type === 'GET' ? 'background-color:#3C6DB2;' : 'background-color:#02AF02;' ">
                        {{api.type}}</div>
                    <div class="method-url-mobile">{{api.url}}</div>
                    <div class="row-icon-mobile"><img class="down-icon-mobile" src="@/assets/icons/chevron-down.svg"
                            alt=""></div>
                </div>
            </div>
            <div class="selected-method-card-mobile fade-in" v-else>
                <div class="all-methods-row">
                    <div class="test-div">
                        <div :class="(api.isSelected && selectedMethod.type === 'POST') ? 'box-green big-scale' : (api.isSelected && selectedMethod.type === 'GET') ? 'box-blue big-scale' : 'method-column-mobile' "
                            :style="api.type === 'GET' ? 'border:1px solid #3C6DB2;' : 'border:1px solid #02AF02;' "
                            v-for="(api,index) in apiList" :key="api.url"
                            @click="setSelectedMethod(api,index),jsonBeautify(api.isSelected,api.response,index)">
                            <div :style="(!api.isSelected && api.type === 'GET') ? 'color: #3C6DB2;' : (!api.isSelected && api.type === 'POST') ? 'color: #02AF02;' : (api.isSelected && selectedMethod.type === 'GET') ? 'color: #fff;' : (api.isSelected && selectedMethod.type === 'POST') ? 'color: #fff;' : 'color: #000;' "
                                class="method-title">
                                {{api.type}}</div>
                            <div class="method-url">{{api.url}}</div>
                        </div>
                    </div>
                </div>
                <div
                    :class="selectedMethod.type === 'POST' ? 'method-about-container response-box-green' : 'method-about-container response-box-blue' ">
                    <div class="api-about-row">
                        <div class="api-about">{{selectedMethod.apiAbout}}</div>
                        <div class="up-icon" @click="rewriteSelectedMethod(), backToMethods = true"><img class="icon"
                                src="@/assets/icons/chevron-up.svg" alt=""></div>
                    </div>
                    <template v-if="selectedMethod.parameters">
                        <div class="parameters-title"
                            :style="selectedMethod.type === 'GET' ? 'color:#3C6DB2;' : 'color:#02AF02;' ">
                            Parameters
                        </div>
                        <div class="api-usage-table">
                            <div class="table-header">
                                <div class="header-title">Paramater</div>
                                <div class="header-title">Description</div>
                                <div class="header-title">Data type</div>
                            </div>
                            <div class="table-content" v-for="parameter in selectedMethod.parameters"
                                :key="parameter.title">
                                <div class="content" style="flex:1 0 1vw;">{{parameter.title}}
                                </div>
                                <div class="content" style="flex:2 0 2vw;">
                                    {{parameter.description}}
                                </div>
                                <div class="content" style="flex:1 0 1vw; justify-content:flex-end;">
                                    {{parameter.dataType}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="selectedMethod.response">
                        <div class="response-title"
                            :style="selectedMethod.type === 'GET' ? 'color:#3C6DB2;' : 'color:#02AF02;' ">
                            Example
                            response</div>
                        <div :id="'api-response' + selectedMethod.index"
                            :class="selectedMethod.type === 'POST' ? 'example-response response-box-green' : 'example-response response-box-blue' ">
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {apiList} from '@/enum/enum.js' 
    import Vue from "vue"
    import _ from "lodash"
    import {utilityMixin} from "@/helpers/mixins.js"
    export default {
        mixins: [utilityMixin],
        data() {
            return {
                apiList,
                isMobile: false,
                isTablet: false,
                isDesktop: true,
                windowWidth: 0,
                selectedMethod: {},
                
            }
        },
        methods: {
            jsonBeautify(controller, object, index) {
                if (controller) {
                    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
                    var replacer = function (match, pIndent, pKey, pVal, pEnd) {
                        var key = '<span style="color: brown">',
                            val = '<span style="color: navy">',
                            str = '<span style="color: olive">',
                            r = pIndent || '';
                        if (pKey)
                            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
                        if (pVal)
                            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
                        return r + (pEnd || '');
                    };

                    let test = JSON.stringify(object, null, 3)
                        .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        .replace(jsonLine, replacer);

                    Vue.nextTick(() => {
                        document.getElementById(`api-response${index}`).innerHTML = test;
                    })
                }
            },
            setSelectedMethod(api, index) {
                api.isSelected = !api.isSelected;
                this.selectedMethod = _.cloneDeep(api);
                Vue.set(this.selectedMethod, 'index', index);
            },
            rewriteSelectedMethod() {
                Vue.set(this.selectedMethod, 'isSelected', false)
            }
        },
        watch: {
            selectedMethod(newVal, oldVal) {
                if (newVal.index != oldVal.index) {
                    this.apiList.forEach((api, index) => {
                        if (index == newVal.index) {
                            api.isSelected = true;
                        } else {
                            api.isSelected = false;
                        }
                    })
                }
            },
        },
        mounted() {
            if (window.innerWidth < 481) {
                this.isMobile = true;
                this.isTablet = false;
                this.isDesktop = false;
            } else if (window.innerWidth > 480 && window.innerWidth < 1024) {
                this.isMobile = false;
                this.isTablet = true;
                this.isDesktop = false;
            } else if (window.innerWidth >= 1024) {
                this.isMobile = false;
                this.isTablet = false;
                this.isDesktop = true;
            }
            window.addEventListener('resize', () => {
                if (window.innerWidth < 481) {
                    this.isMobile = true;
                    this.isTablet = false;
                    this.isDesktop = false;
                } else if (window.innerWidth > 480 && window.innerWidth < 1024) {
                    this.isMobile = false;
                    this.isTablet = true;
                    this.isDesktop = false;
                } else if (window.innerWidth >= 1024) {
                    this.isMobile = false;
                    this.isTablet = false;
                    this.isDesktop = true;
                }
                
            },);
        },
    }
</script>

<style lang="scss">
    @import "@/scss/mixins.scss";

    .response-box-green {
        background-color: lighten($color: #02AF02, $amount: 53);
    }

    .response-box-blue {
        background-color: lighten($color: #3C6DB2, $amount: 45);
    }

    .docs-wrapper {
        width: 100%;
        height: 100%;
        @include d-flex(column, flex-start, stretch);

        .docs-main {
            width: 100%;
            height: 100%;
            flex: 1 0 1px;
            padding: 1vw;
            @include d-flex(column, center, center);

            .methods-container {
                @include d-flex(row, space-around, center);
                width: 100%;
                height: 100%;
                flex: 1 0 1px;
                border-radius: 5px;
                background-color: rgba(251, 251, 251, .5);
                gap: 4vw;
                padding: 0 4vw;

                .methods-card {
                    @include d-flex(column, flex-start, center);
                    position: relative;
                    flex: 1 0 1px;
                    min-width: 45%;
                    height: 90%;
                    max-height: 85vmin;
                    background-color: #fff;
                    border-radius: .75vw;
                    padding: 3vw 1vw;
                    gap: 1vw;
                    @include transition(all .3s ease-in-out);

                    .card-title {
                        position: absolute;
                        background-color: #fff;
                        @include d-flex(row, center, center);
                        color: #4E83CE;
                        border-radius: .25vw;
                        padding: .5vw 1.5vw;
                        margin-top: -1vw;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 1vw;
                        width: 8vw;

                        @media screen and(max-width:1440px) {
                            font-size: 1.2vw;
                            width: 9vw;
                            border-radius: .3vw;
                            padding: .6vw 1.7vw;
                            margin-top: -1.3vw;
                        }

                        @media screen and(max-width:1024px) {
                            font-size: 1.4vw;
                            width: 10vw;
                            border-radius: .35vw;
                            padding: .7vw 1.9vw;
                            margin-top: -1.6vw;
                        }
                    }

                    .method-row {
                        @include d-flex(row, space-evenly, center);
                        background-color: #F4F5F7;
                        width: 100%;
                        padding: .5vw 1vw;
                        border-radius: 5px;
                        cursor: pointer;

                        .row-icon {
                            @include d-flex(row, center, center);
                            flex: 0 0 auto;
                        }

                        .method-box {
                            @include d-flex(row, center, center);
                            color: #fff;
                            padding: .2vw .5vw;
                            border-radius: 5px;
                            font-size: 1vw;
                            width: 5vw;
                            flex: 0 0 auto;

                            @media screen and(max-width:1440px) {
                                padding: .3vw .6vw;
                                border-radius: 6px;
                                font-size: 1.2vw;
                                width: 6vw;
                            }

                            @media screen and(max-width:1024px) {
                                padding: .4vw .7vw;
                                border-radius: 7px;
                                font-size: 1.4vw;
                                width: 7vw;
                            }
                        }

                        .method-url {
                            @include d-flex(row, flex-start, center);
                            padding: 0 1vw;
                            font-size: 1vw;
                            width: 100%;
                            flex: 1 0 1px;

                            @media screen and(max-width:1440px) {
                                padding: 0 1.4vw;
                                font-size: 1.2vw;
                            }

                            @media screen and(max-width:1024px) {
                                padding: 0 1.8vw;
                                font-size: 1.4vw;
                            }
                        }

                        @media screen and(max-width:1440px) {
                            padding: .6vw 1.2vw;
                            border-radius: 6px;
                        }

                        @media screen and(max-width:1024px) {
                            padding: .7vw 1.4vw;
                            border-radius: 7px;
                        }
                    }

                    @media screen and(max-width:1440px) {
                        padding: 3vw 1.4vw;
                        gap: 1.4vw;
                    }

                    @media screen and(max-width:1024px) {
                        padding: 3.4vw 1.8vw;
                        gap: 1.8vw;
                    }
                }

                .selected-method-card {
                    @extend .methods-card;
                    flex: 0 0 45%;
                    padding: 0;


                    .card-title {
                        color: #fff;
                    }

                    .card-container {
                        @include d-flex(column, flex-start, center);
                        gap: .8vw;
                        width: 100%;
                        flex: 1 0 100%;
                        overflow: auto;
                        padding: 3vw 1vw;

                        .api-url {
                            @include d-flex(row, flex-start, center);
                            width: 100%;
                            font-weight: bold;
                            font-size: 1vw;

                            @media screen and(max-width:1440px) {
                                font-size: 1.2vw;
                            }

                            @media screen and(max-width:1024px) {
                                font-size: 1.4vw;
                            }
                        }

                        .api-about {
                            @extend .api-url;
                            font-weight: lighter;
                        }

                        .parameters-title {
                            @extend .api-url;
                        }

                        .api-usage-table {
                            @include d-flex(column, flex-start, center);
                            width: 100%;

                            .table-header {
                                @include d-flex(row, space-between, center);
                                width: 100%;
                                color: #454545;
                                border-bottom: 1px solid #E9E9E9;

                                .header-title {
                                    @include d-flex(row, flex-start, center);
                                    font-size: 1vw;
                                    padding: 1vw 0;

                                    @media screen and(max-width:1440px) {
                                        font-size: 1.2vw;
                                    }

                                    @media screen and(max-width:1024px) {
                                        font-size: 1.4vw;
                                    }
                                }
                            }

                            .table-content {
                                @include d-flex(row, space-between, center);
                                width: 100%;
                                border-bottom: 1px solid #E9E9E9;

                                .content {
                                    @include d-flex(row, flex-start, center);
                                    flex-wrap: wrap;
                                    font-size: .8vw;
                                    padding: 1vw 0;

                                    @media screen and(max-width:1440px) {
                                        font-size: 1vw;
                                    }

                                    @media screen and(max-width:1024px) {
                                        font-size: 1.2vw;
                                    }
                                }
                            }
                        }

                        .response-title {
                            @extend .api-url;
                        }

                        .example-response {
                            width: 100%;
                            flex: 1 0 1px;
                            padding: 1vh 1vw;
                            border-radius: .1vw;
                            font-size: .8vw;
                            @include box-shadow(1px,0px,10px,-2px,rgba(0, 0, 0, 0.46));
                            user-select: none;
                            word-break: break-all;
                            word-wrap: break-word;
                            overflow-wrap: break-word;
                            white-space: pre-wrap;
                            white-space: -moz-pre-wrap;

                            @media screen and(max-width:1440px) {
                                padding: 1.1vh 1.2vw;
                                border-radius: .2vw;
                                font-size: 1vw;
                            }

                            @media screen and(max-width:1024px) {
                                padding: 1.2vh 1.4vw;
                                border-radius: .3vw;
                                font-size: 1.2vw;
                            }
                        }

                        @media screen and(max-width:1440px) {
                            gap: 1vw;
                            padding: 3.5vw 1.2vw;
                        }

                        @media screen and(max-width:1024px) {
                            gap: 1.2vw;
                            padding: 4vw 1.4vw;
                        }


                    }

                }

                @media screen and(max-width:1440px) {
                    padding: 0 2vw;
                    gap: 3vw;
                }

                @media screen and(max-width:1024px) {
                    padding: 0 1vw;
                    gap: 2vw;
                }
            }
        }

        .docs-main-tablet {
            @include d-flex(column, center, center);
            width: 100%;
            height: 100%;
            flex: 1 0 1px;
            padding: 2vw;

            .methods-container-tablet {
                @include d-flex(column, flex-start, center);
                width: 100%;
                height: 100%;
                padding: 2vw;
                background-color: rgba(251, 251, 251, .5);
                flex: 1 0 1px;
                border-radius: 5px;

                .methods-card-tablet {
                    @include d-flex(column, flex-start, center);
                    background-color: #fff;
                    gap: 4vw;
                    width: 100%;
                    height: 100%;
                    flex: 1 0 1px;
                    padding: 2vw;
                    border-radius: 1vw;
                    overflow: auto;

                    .method-column-tablet {
                        @include d-flex(column, flex-start, center);
                        width: 100%;
                        @include transition(all linear .3s);
                        border-radius: .5vw;


                        .methods-row-tablet {
                            @include d-flex(row, space-between, center);
                            width: 100%;
                            padding: 1vw 2vw;
                            @include transition(all linear .3s);

                            .method-box-tablet {
                                @include d-flex(row, center, center);
                                color: #fff;
                                padding: .4vw .8vw;
                                border-radius: 5px;
                                font-size: 2vw;
                                width: 8vw;
                                flex: 0 0 auto;
                            }

                            .method-url-tablet {
                                @include d-flex(row, flex-start, center);
                                padding: 0 2vw;
                                font-size: 2vw;
                                width: 100%;
                                flex: 1 0 1px;
                            }

                            .row-icon-tablet {
                                @include d-flex(row, center, center);
                                flex: 0 0 auto;

                                .down-icon-tablet {
                                    width: 3vw;
                                }

                                .up-icon-tablet {
                                    @extend .down-icon-tablet;
                                }
                            }
                        }

                        .api-about-container-tablet {
                            @include d-flex(column, flex-start, center);
                            flex: 1 0 1px;
                            width: 100%;
                            padding: 0vw 2vw;
                            gap: 1vw;

                            .api-about-row {
                                @include d-flex(row, flex-start, center);
                                width: 100%;
                                font-size: 2vw;
                                font-weight: lighter;
                                flex: 0 0 auto;
                            }

                            .parameters-title {
                                @extend .api-about-row;
                                font-weight: 700;
                                flex: 0 0 auto;
                            }

                            .api-usage-table {
                                @include d-flex(column, flex-start, center);
                                width: 100%;
                                flex: 0 0 auto;

                                .table-header {
                                    @include d-flex(row, space-between, center);
                                    width: 100%;
                                    color: #454545;
                                    border-bottom: 1px solid #E9E9E9;

                                    .header-title {
                                        @include d-flex(row, flex-start, center);
                                        font-size: 2vw;
                                        padding: 1vw 0;
                                    }
                                }

                                .table-content {
                                    @include d-flex(row, space-between, center);
                                    width: 100%;
                                    border-bottom: 1px solid #E9E9E9;

                                    .content {
                                        @include d-flex(row, flex-start, center);
                                        flex-wrap: wrap;
                                        font-size: 2vw;
                                        padding: 1vw 0;
                                    }
                                }
                            }

                            .response-title {
                                @extend .api-about-row;
                                font-weight: 700;
                                flex: 0 0 auto;
                            }

                            .example-response {
                                width: 100%;
                                flex: 1 0 1px;
                                padding: .5vw 1vw;
                                font-size: 2vw;
                                user-select: none;
                                word-break: break-all;
                                word-wrap: break-word;
                                overflow-wrap: break-word;
                                white-space: pre-wrap;
                                white-space: -moz-pre-wrap;
                            }
                        }
                    }

                }
            }
        }

        .docs-main-mobile {
            width: 100%;
            height: 100%;
            @include d-flex(column, flex-start, stretch);

            .methods-container-mobile {
                @extend .docs-main-mobile;
                gap: 5vw;
                padding: 3vw 2vw;
                background-color: rgba(251, 251, 251, .5);

                .method-row-mobile {
                    @include d-flex(row, space-between, center);
                    background-color: #fff;
                    padding: 3vw 2vw;
                    font-size: 3vw;
                    border-radius: 1vw;

                    .method-box-mobile {
                        @include d-flex(row, center, center);
                        color: #fff;
                        padding: .4vw 1vw;
                        border-radius: 1vw;
                        width: 9vw;
                        flex: 0 0 auto;
                    }

                    .method-url-mobile {
                        @include d-flex(row, flex-start, center);
                        width: 100%;
                        flex: 1 0 1px;
                        padding: 0 4vw;
                    }

                    .row-icon-mobile {
                        @include d-flex(row, center, center);

                        .down-icon-mobile {
                            width: 5vw;
                        }
                    }

                }
            }

            .selected-method-card-mobile {
                width: 100%;
                height: 100%;
                @include d-flex(column, flex-start, stretch);
                gap: 4vw;

                .all-methods-row {
                    @include d-flex(column, flex-start, stretch);
                    background-color: rgba(251, 251, 251, .5);
                    width: 100%;
                    overflow: hidden;
                    flex: 0 0 auto;
                    height: 30vw;
                    margin-top: 3vw;

                    .test-div {
                        overflow-x: auto;
                        @include d-flex(row, space-between, center);
                        width: 100%;
                        padding: 0 5vw;
                        gap: 5vw;
                        flex: 1 0 100%;

                        .method-column-mobile {
                            @include d-flex(column, flex-start, center);
                            position: relative;
                            padding: 0 10vw;
                            width: 25vw;
                            height: 25vw;
                            flex: 1 0 1px;
                            border-radius: 2vw;
                            background-color: #fff;
                            @include transition(all ease-in-out .2s);

                            .method-title {
                                @include d-flex(row, center, center);
                                font-weight: bold;
                                width: 100%;
                                flex: 0 0 auto;
                                font-size: 3.5vw;
                            }

                            .method-url {
                                width: 25vw;
                                border-radius: 2vw;
                                font-size: 3vw;
                                @include d-flex(column, flex-start, center);
                                word-break: break-word;
                                padding: 4vw 2vw;
                                text-align: center;
                                flex: 1 0 1px;
                            }
                        }

                        .box-green {
                            @extend .method-column-mobile;
                            background-color: #02AF02;

                            .method-title {
                                color: #fff
                            }
                        }

                        .box-blue {
                            @extend .method-column-mobile;
                            background-color: #3C6DB2;

                            .method-title {
                                color: #fff
                            }
                        }

                        .big-scale{
                            transform: scale(1.1);
                        }
                    }


                }

                .method-about-container {
                    @include d-flex(column, flex-start, stretch);
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    flex: 1 0 1px;
                    padding: 3vw;
                    @include transition(all ease-in-out .1s);
                    gap: 1vw;

                    .api-about-row {
                        @include d-flex(row, space-between, center);
                        width: 100%;
                        flex: 0 0 auto;
                        font-size: 4vw;

                        .api-about {
                            @include d-flex(row, flex-start, center);
                            flex: 1 0 1px;
                            font-weight: normal;
                        }

                        .up-icon {
                            @include d-flex(row, center, center);
                            flex: 0 0 auto;

                            .icon {
                                width: 5vw;
                            }
                        }
                    }

                    .parameters-title {
                        @include d-flex(row, flex-start, center);
                        width: 100%;
                        font-weight: bold;
                        font-size: 4vw;
                    }

                    .api-usage-table {
                        @include d-flex(column, flex-start, center);
                        width: 100%;

                        .table-header {
                            @include d-flex(row, space-between, center);
                            width: 100%;
                            color: #454545;
                            border-bottom: 1px solid #E9E9E9;

                            .header-title {
                                @include d-flex(row, flex-start, center);
                                font-size: 4vw;
                                padding: 3vw 0;
                            }
                        }

                        .table-content {
                            @include d-flex(row, space-between, center);
                            width: 100%;
                            border-bottom: 1px solid #E9E9E9;

                            .content {
                                @include d-flex(row, flex-start, center);
                                flex-wrap: wrap;
                                font-size: 4vw;
                                padding: 3vw 0;
                            }
                        }
                    }

                    .response-title {
                        @extend .parameters-title;
                    }

                    .example-response {
                        width: 100%;
                        flex: 1 0 1px;
                        border-radius: .1vw;
                        font-size: 4vw;
                        user-select: none;
                        word-break: break-all;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                        white-space: pre-wrap;
                        white-space: -moz-pre-wrap;
                    }
                }
            }
        }


    }

    .fade-in {
        -webkit-animation: fade-in .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    @-webkit-keyframes fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .custom-scrollbar-blue {
        scrollbar-color: #3C6DB2 transparent;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background: #3C6DB2;
        }
    }

    .custom-scrollbar-green {
        @extend .custom-scrollbar-blue;

        scrollbar-color: #02AF02 transparent;

        &::-webkit-scrollbar-thumb {
            background: #02AF02;
        }
    }
</style>