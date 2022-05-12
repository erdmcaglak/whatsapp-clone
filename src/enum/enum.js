export const menuItems=[
    {title:"nums",api:"whatsapp-numbers",icon:"whatsapp.svg"},
    {title:"dashboard",api:"dashboard",icon:"send-receive.svg"},
    {title:"wuiAccounts",api:"wui-account",icon:"whatsapp.svg"},
    {title:"statusTyping",api:"status-typing",icon:"status-typing.svg"},
    {title:"converter",api:"converter",icon:"base64-converter.svg"},
    {title:"linkCreator",api:"link-creator",icon:"link-creator.svg"},
    {title:"panel",api:"user-panel",icon:"user-panel.svg"},
    {title:"doc",api:"api-documentation",icon:"api-doc.svg"},
    {title:"settings",api:"settings",icon:"settings.svg"},
]

export const langOptions=[
    {title:'TR',value:'tr',icon:'tr.svg'},
    {title:'EN',value:'en',icon:'en.svg'},
]
export const animationPromo=[
    {title:'rmmTitle',header:"rmmHeader",content:"rmmContent",icon:"rmm.svg",value:"rmm"},
    {title:'statusTitle',header:"statusHeader",content:"statusContent",icon:"promo-status.svg",value:"status"},
    {title:'notificationTitle',header:"notificationHeader",content:"notificationContent",icon:"notification.svg",value:"notification"},
]

export const packageList={
    whapiDedicated:[
        {title:'Only Send',numberType:'whapi-dedicated',value:'onlySendDedicate',price:"59.99",packageItems:[
            "Only Send Api",
            "Link Creator",
            "Base64 Converter",
            "Access to Whatsapp Account",
            "Up to 100.000 messages/day",
            "Quick Onboarding",
        ]},
        {title:'Send/Receive',numberType:'whapi-dedicated',price:'69.99',value:'sendReceiveDedicate',packageItems:[
            "Send/Receive Api",
            "Link Creator",
            "Base64 Converter",
            "Account Control Panel",
            "Access to Whatsapp Account",
            "Up to 100.000 messages/day",
            "Quick Onboarding",
        ]},
    ],
    whapiShared:[
        {title:'Only Send',numberType:'whapi-shared',value:'onlySendShared',price:'39.99',packageItems:[
            "Only Send Api",
            "Link Creator",
            "Base64 Converter",
            "Access to Whatsapp Account",
            "Up to 1.000 messages/day",
            "Quick Onboarding",
        ]},
    ],
    self:[
        {title:'Only Send',numberType:'Qr',value:'onlySendSelf',price:"9.99",packageItems:[
            "Only Send Api",
            "Link Creator",
            "Base64 Converter",
            "Access to Whatsapp Account",
            "Up to 100.000 messages/day",
            "Quick Onboarding",
        ]},
        {title:'Send/Receive',numberType:'Qr',price:'19.99',value:'sendReceiveDedicate',packageItems:[
            "Send/Receive Api",
            "Link Creator",
            "Base64 Converter",
            "Account Control Panel",
            "Access to Whatsapp Account",
            "Up to 100.000 messages/day",
            "Quick Onboarding",
        ]},
        {title:'W-UI',numberType:'Qr',price:'~~~~',value:'WuiSelf',packageItems:[
            "W-UI",
            "Link Creator",
            "Base64 Converter",
            "Account Control Panel",
            "Access to Whatsapp Account",
            "Up to 100.000 messages/day",
            "Quick Onboarding",
        ]},
    ]
}

export const PackageList=[
    {title:'Only Send',numberType:'Qr',value:'onlySendQr',price:"9.99",packageItems:[
        "Only Send Api",
        "Link Creator",
        "Base64 Converter",
        "Access to Whatsapp Account",
        "Up to 100.000 messages/day",
        "Quick Onboarding",
    ]},
    {title:'Send/Receive',numberType:'Qr',price:'19.99',value:'sendReceiveQr',packageItems:[
        "Send/Receive Api",
        "Link Creator",
        "Base64 Converter",
        "Account Control Panel",
        "Access to Whatsapp Account",
        "Up to 100.000 messages/day",
        "Quick Onboarding",
    ]},
    {title:'W-UI',numberType:'Qr',price:'~~~~',value:'WuiQr',packageItems:[
        "W-UI",
        "Link Creator",
        "Base64 Converter",
        "Account Control Panel",
        "Access to Whatsapp Account",
        "Up to 100.000 messages/day",
        "Quick Onboarding",
    ]},
    {title:'Only Send',numberType:'whapi-shared',value:'onlySendShared',price:'39.99',packageItems:[
        "Only Send Api",
        "Link Creator",
        "Base64 Converter",
        "Access to Whatsapp Account",
        "Up to 1.000 messages/day",
        "Quick Onboarding",
    ]},
    {title:'Only Send',numberType:'whapi-dedicated',value:'onlySendDedicate',price:"59.99",packageItems:[
        "Only Send Api",
        "Link Creator",
        "Base64 Converter",
        "Access to Whatsapp Account",
        "Up to 100.000 messages/day",
        "Quick Onboarding",
    ]},
    {title:'Send/Receive',numberType:'whapi-dedicated',price:'69.99',value:'sendReceiveDedicate',packageItems:[
        "Send/Receive Api",
        "Link Creator",
        "Base64 Converter",
        "Account Control Panel",
        "Access to Whatsapp Account",
        "Up to 100.000 messages/day",
        "Quick Onboarding",
    ]},
]

export const whapiNumberList=[
    {number:'123',country:{title:'Turkey',value:'turkey'}},
    {number:'124',country:{title:'England',value:'england'}},
    {number:'125',country:{title:'Germany',value:'germany'}},
    {number:'126',country:{title:'Turkey',value:'turkey'}},
    {number:'127',country:{title:'Turkey',value:'turkey'}},
    {number:'128',country:{title:'Germany',value:'germany'}},
    {number:'129',country:{title:'Germany',value:'germany'}},
    {number:'121',country:{title:'England',value:'england'}},
    {number:'133',country:{title:'France',value:'france'}},
    {number:'1243',country:{title:'France',value:'france'}},
    {number:'1235',country:{title:'Turkey',value:'turkey'}},
    {number:'1223',country:{title:'Turkey',value:'turkey'}},
    {number:'1123',country:{title:'Turkey',value:'turkey'}},
    {number:'1323',country:{title:'Germany',value:'germany'}},
    {number:'1263',country:{title:'France',value:'france'}},
    {number:'1273',country:{title:'France',value:'france'}},
    {number:'1293',country:{title:'England',value:'england'}},
]

export const curlType=[
    {title:'Curl',value:'curl'},
    {title:'Wget',value:'wget'},
    {title:'Whapi Terminal',value:'terminal'},
    {title:'Browser',value:'browser'},
]

export const apiList = [
    {
        type: "GET",
        url: '/send/:fromNumber/:toNumber/:message/:token',
        urlForTerminal:`/send/{Token}`,
        title:'Send Message',
        apiAbout: "Send a message to a new or existing chat.",
        value:"sendMessage",
        curl:"curl 'https://test.whapi.chat/send/{{fromNumber}}/{{Number}}/{{Message}}/{{Token}}'",
        wget:"wget 'https://test.whapi.chat/send/{{fromNumber}}/{{Number}}/{{Message}}/{{Token}}'",
        browser:"https://test.whapi.chat/send/{{fromNumber}}/{{Number}}/{{Message}}/{{Token}}",
        terminal:"/send/{{fromNumber}}/{{Number}}/{{Message}}/{{Token}}",
        parameters: [{
                title: "number",
                dataType: "string",
                placeHolder:"Type phone number",
                description: "A phone number starting with the country code. Example; 901234567890",
                inputHolder:"",
            },
            {
                title: "message",
                dataType: "string",
                placeHolder:"Type your message",
                description: "Message text.",
                inputHolder:"",
            }
        ],
        response: {
            "status": true,
            "response": {
                "id": {
                    "fromMe": true,
                    "remote": {
                        "server": "c.us",
                        "user": "90**********",
                        "_serialized": "90**********@c.us"
                    },
                    "id": "262***************************",
                    "_serialized": "true_90**********@c.us_262***************************"
                },
                "ack": 0,
                "hasMedia": false,
                "body": "Hello!!",
                "type": "chat",
                "timestamp": 1643800064,
                "from": "90**********@c.us",
                "to": "90**********@c.us",
                "deviceType": "android",
                "isForwarded": false,
                "forwardingScore": 0,
                "isStarred": false,
                "fromMe": true,
                "hasQuotedMsg": false,
                "vCards": [],
                "mentionedIds": [],
                "isGif": false,
                "links": []
            }
        }
    },
    {
        type: "GET",
        url: '/get_messages/:type/:limit/:token',
        urlForTerminal:`/get-messages/{Type}/{Limit}/{Token}`,
        apiAbout: "Get the message history",
        title:'Get Message',
        value:"getMessage",
        curl:"curl 'https://test.whapi.chat/get-messages/{{Type}}/{{Limit}}/{{Token}}'",
        wget:"wget 'https://test.whapi.chat/get-messages/{{Type}}/{{Limit}}/{{Token}}'",
        browser:"https://test.whapi.chat/get-messages/{{Type}}/{{Limit}}/{{Token}}",
        terminal:"/get-messages/{{Type}}/{{Limit}}/{{Token}}",
        response: {
            "id": {
                "fromMe": false,
                "remote": "90**********@c.us",
                "id": "3A******************",
                "_serialized": "false_90**********@c.us_3A******************"
            },
            "ack": 0,
            "hasMedia": false,
            "body": "Test",
            "type": "chat",
            "timestamp": 1642507257,
            "from": "90**********@c.us",
            "to": "90**********@c.us",
            "deviceType": "ios",
            "isForwarded": false,
            "forwardingScore": 0,
            "isStatus": false,
            "isStarred": false,
            "broadcast": false,
            "fromMe": false,
            "hasQuotedMsg": false,
            "vCards": [],
            "mentionedIds": [],
            "isGif": false,
            "links": []
        },
        parameters: [{
            title: "number",
            dataType: "string",
            placeHolder:"Type phone number",
            description: "A phone number starting with the country code. Example; 901234567890",
            inputHolder:"",
        },
        {
            title: "limit",
            dataType: "string",
            placeHolder:"Type message limit",
            description: "Message Limit",
            inputHolder:"",
        },
        {
            title: "type",
            dataType: "string",
            placeHolder:"Type option",
            description: "Unreaded messages or all messages",
            inputHolder:"",
        }
    ],
    },
]