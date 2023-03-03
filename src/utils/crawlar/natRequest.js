import request from "request";
import {NATCrawler} from "@/utils/crawlar/natapp";
import {json2form} from "@/utils/requestTools";

export const natRequest = (url, body, cookie, method) => {
    return new Promise(resolve => {
        if (cookie) {
            NATCrawler.headers.cookie = cookie
        }
        (method === 'get' ? request.get : request.post)(url, {
            headers: NATCrawler.headers,
            rejectUnauthorized: false,
            body: json2form(body)
        }, (e,r,b) => {
            resolve(b)
        })
    })
}
