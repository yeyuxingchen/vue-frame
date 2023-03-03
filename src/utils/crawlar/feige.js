export const FGCrawler = {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "_ga=GA1.2.51994309.1677574659; Hm_lvt_e7a29f62e903f02ca46b3f22641eb1cd=1677574655,1677637429; ut=CzutsojmeLM3oWIucnZqWIZOO+Sc3iI6YZPHr0m52xs=; nodeType=F; JSESSIONID=368B5C9A58AC1154C243DF7B913DF638",
        "Referer": "https://www.fgnwct.com/tunnels.html",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    // 获取列表
    "getList": "https://www.fgnwct.com/queryTunnels",
    "getListBody": {
        "showAll": "false",
        "search": "",
        "sort": "",
        "order": "",
        "limit": "10",
        "page": "1",
        "offset": "0"
    },
    // 编辑
    "editAddress": "https://www.fgnwct.com/editTunnel",
    "editAddressBody": {
        "flag": "0",
        "vkey": "ed67ec7eee",
        "diff": "freehk",
        "protocol": "http(s)",
        "name": "测试使用",
        "domainType": "0",
        "domain": "xc",
        "customDomain": "",
        "target": "127.0.0.1:8086",
        "localIP": "127.0.0.1",
        "localPort": "",
        "pemText": "",
        "pemKey": ""
    }
}
