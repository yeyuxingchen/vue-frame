import request from "request";
import {NATCrawler} from "@/utils/crawlar/natapp";
import {json2form} from "@/utils/requestTools";
import CheerioAPI from 'cheerio'

export const natRequest = (url, body, cookie, method) => {
    return new Promise(resolve => {
        if (cookie) {
            NATCrawler.headers.cookie = cookie
        }
        console.log(NATCrawler.headers);
        (method === 'get' ? request.get : request.post)(url, {
            headers: NATCrawler.headers,
            rejectUnauthorized: false,
            body: json2form(body)
        }, (e,r,b) => {
            console.log(e,r,b)
            resolve(b)
        })
    })
}

export const natLogin = () => {
}
