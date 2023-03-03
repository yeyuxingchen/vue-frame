import request from "request";
import {Message} from "element-ui";
import {FGCrawler} from "@/utils/crawlar/feige";

export const fgRequest = (url, body, cookie, method) => {
    return new Promise(resolve => {
        if (cookie) {
            FGCrawler.headers.cookie = cookie
        }
        const options = {
            headers: FGCrawler.headers
        }
        options.qs = body;
        (method === 'get' ? request.get : request.post) (url, options,
            (e,r,b) => {
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
