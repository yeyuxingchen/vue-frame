import store from "@/store";

export const NATCrawler = {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": store.state.nwct.natapp.cookie,
        "Referer": "https://natapp.cn/tunnel/edit/x16wonqzpl",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    // 获取列表
    "getMyList": "https://natapp.cn/tunnel/lists",
    // 修改地址
    "editAddress": "https://natapp.cn/tunnel/edit/x16wonqzpl",
    "editAddressBody" : {
        "_token": "L2B3ywVYdoWgmmoU5ssfXJmQFJkgiViReLbv1D7L",
        "name": "我的免费隧道",
        "local_ip": "127.0.0.1",
        "local_port": "8080",
        "inspect_port": "4040",
        "auth_user": "",
        "auth_pass": "",
        "oldSubdomainId": "0"
    }
}
