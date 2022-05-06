import * as axios from "axios"
import { SERVER_URL } from "@/control.js";

const AXIOS = axios.create({
    baseURL: `${SERVER_URL}`,
    timeout: 20000,
});

export function genericGetRequests(url){
    return new Promise((resolve, reject)=>{
        AXIOS.get(`${url}`)
        .then(res=>resolve(res.data))
        .catch(reject)
    })
}

export function genericPostRequests(url,data){
    return AXIOS.post(`${url}`,data)
}