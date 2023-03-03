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
        "cookie": "Hm_lvt_3d235905d4eee5181db4512032726ce6=1677746351; Hm_lpvt_3d235905d4eee5181db4512032726ce6=1677746958; XSRF-TOKEN=eyJpdiI6IlFlZ3NCMWV0QlBJUkZEcVNjdlJcL3l3PT0iLCJ2YWx1ZSI6IndhdzZlN0RkOTE4Rzl6ZElEWnErQ1VPc001QXEyZmVQOTg3eTFWTkQrQTkrZlhjV1ZWK3ZyVzFiTmQ4QW53NjMiLCJtYWMiOiJiZDYxZjhhZDA3NDg5OGFjNWI5MmRmZWQ5NGNhNmQzMDBjZWUyNTEyYTVjM2I3MGE4M2ZmYzA4MzNhMWMzMmZkIn0%3D; laravel_session=eyJpdiI6InZQZXg1MVlWOHhna25rVnAzREpJc1E9PSIsInZhbHVlIjoiMFRmaXJrXC9SdTk3NTM2R2s0dlVUNWVHUlo5YUdTNXdsdnh1bWptUjNud0dKZ3FaUkxFNHhUbm5nalA3WndOMEhpUE55QUh2T1BqRjYyb1JHakhGVm9Sdms0dzY0OGJBWHpzd3ZsQ21RWkFEU0lrSCtqbGxPNU03WXphZFRPRXQ5IiwibWFjIjoiYTBhYTkyMDI3ZDRjMjcyODhlNzgyMzgyODFjZmUzNjMyOWViYjliMTI5NmI3NjI5ZDNiYjYzOGU4MWVmMWIzZSJ9",
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
