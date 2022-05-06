import { rest } from 'msw'
import * as axios from "axios"

export default [
  // rest.get('/token', async (req, res, ctx) => {
  //   const response = await axios.post(`https://test.whapi.chat/token`,{
  //     cookies: req.cookies || {},
  //   }).catch(err=>{
  //     console.log("err in token post")
  //     console.log(err)

  //     return {data: {}}
  //   })
  //   if (response.data.token) res(ctx.cookie('token', response.data.token))
  //   return res(
  //     ctx.json(response.data)
  //   )
  // }),
  rest.post(`/number/list`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
      cookies: req.cookies || {},
    }
    const response = await axios.post(`https://test.whapi.chat/number/list`,reqObj).catch(err=>{
      console.log("err in /number/list post")
      console.log(err)
      return {data: [
        {number:'905315677183'}
      ]}
    })
    return res(
      ctx.json(response.data)
    )
  }),

  rest.post(`/login/agent`, async (req, res, ctx) => {
    let reqObj = {
      ...req.body,
    }
    const response = await axios.post(`https://test.whapi.chat/login/agent`,reqObj).catch(err=>{
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
    const response = await axios.post(`https://test.whapi.chat/login/session`,reqObj).catch(err=>{
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
    const response = await axios.post(`https://test.whapi.chat/login/agent/${uid}`,reqObj).catch(err=>{
      console.log("err in /login/agent/:uid post")
      console.log(err)
      return {data: {}}
    })
    return res(
      ctx.json(response.data)
    )
  }),
]

