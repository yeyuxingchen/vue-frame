import request from "request";
import {XMQCrawler} from "@/utils/crawlar/xiaomiqiu";
import {json2form} from "@/utils/requestTools";
import { Message } from "element-ui";

export const xmqRequest = (url, body, cookie) => {
    return new Promise(resolve => {
        if (cookie) {
            XMQCrawler.headers.cookie = cookie
        }
        request.post(url, {
            headers: XMQCrawler.headers,
            body: json2form(body)
        }, (e,r,b) => {
            if (r.statusCode === 302) {
                Message.warning('cookie 失效，请重新获取cookie')
            } else if (r.statusCode === 200) {
                try {
                    resolve(JSON.parse(b))
                } catch (e) {
                    resolve(b)
                }
            }
        })
    })
}
