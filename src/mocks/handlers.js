import { rest } from 'msw'
import * as axios from "axios"

export default [
  rest.get('/send/:fromNumber/:toNumber/:message/:token', async (req, res, ctx) => {
    const {fromNumber,toNumber,message,token} = req.params
    console.log({fromNumber,toNumber,message,token})
    const response = await axios.get(`https://localhost:8081/send/${fromNumber}/${toNumber}/${message}/${token}`,).catch(err=>{
      console.log("err in send get")
      console.log(err)

      return {data:{success:true}}
    })
    if (response.data.token) res(ctx.cookie('token', response.data.token))
    return res(
      ctx.json(response.data)
    )
  }),
  rest.get('/account/selected/:token', async (req, res, ctx) => {
    console.log('-----------selected--------')
    const {token} = req.params
    console.log({token})
    const response = await axios.get(`https://localhost:8081/account/selected/${token}`,).catch(err=>{
      console.log("err in send get")
      console.log(err)

      return {data: "05315677183"}
    })
    console.log({response})
    if (response.data?.token) res(ctx.cookie('token', response.data.token))
    return res(
      ctx.json(response.data)
    )
  }),


  rest.post(`/payment/info`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/payment/info`,reqObj).catch(err=>{
      
      console.log("err in /payment/info post")
      console.log({err})
      return {
        data:{
          cards:[
            {
              cardType:"mastercard",
              cardNumber:"1234 **** **** 4587",
              paymentDate:Date.now(),
            },
            {
              cardType:"visa",
              cardNumber:"1234 **** **** 6985",
              paymentDate:Date.now(),
            }
          ],
          billingEmail:"erdem.caglak@gmail.com"
        }
      }
    })
    return res(
      ctx.json(response.data)
    )
  }),
  
  rest.post(`/payment/pay`, async (req, res, ctx) => {
    console.log({i:req.body})
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/payment/pay`,reqObj).catch(err=>{
      
      console.log("err in /payment/pay post")
      console.log({err})
      return {data:{
        success:true
      }}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/account/selected`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/account/selected`,reqObj).catch(err=>{
      
      console.log("err in /payment/pay post")
      console.log({err})
      return {data:{
        success:true
      }}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/account/packages`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/account/packages`,reqObj).catch(err=>{
      
      console.log("err in /account/packages post")
      console.log({err})
      return {}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/logout/expire`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/number/list`,reqObj).catch(err=>{
      console.log(err)
      return {data:{
        success:true,
      }}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/account/accounts`, async (req, res, ctx) => {
    console.log('Mock accounts Post')
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/account/accounts`,reqObj).catch(err=>{
      
      console.log("err in /account/accounts post")
      console.log({err})
      return {}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/account/info`, async (req, res, ctx) => {
    console.log('Mock accounts/info Post')
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://localhost:8081/account/info`,reqObj).catch(err=>{
      
      console.log("err in /account/info post")
      console.log({err})
      return {data: {
        success:false,
      }}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/login/agent`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
    }
    const response = await axios.post(`https://localhost:8081/login/agent`,reqObj).catch(err=>{
      console.log("err in /login/agent post")
      console.log(err)
      return {data: {}}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/login/session`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
    }
    const response = await axios.post(`https://localhost:8081/login/session`,reqObj).catch(err=>{
      console.log("err in /login/session post")
      console.log(err)
      return {data: {}}
    })
    return res(
      ctx.json(response.data)
    )
  }),
  rest.post(`/login/agent/:uid`, async (req, res, ctx) => {
    const {uid} = req.params
    let reqObj = {
      ...req.body,
    }
    const response = await axios.post(`https://localhost:8081/login/agent/${uid}`,reqObj).catch(err=>{
      console.log("err in /login/agent/:uid post")
      console.log({err})
      return {data: {}}
    })
    return res(
      ctx.json(response.data)
    )
  }),
]

