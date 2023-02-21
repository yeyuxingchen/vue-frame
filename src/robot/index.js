// @ts-ignore

const { createClient, GroupMessage, PrivateMessage } = require("oicq")
const account = 2819711587
const client = createClient(account)

// const { online_ } = require('./src/func/online')
// const { message_ } = require('./src/func/message')

client.on("system.online", () => {
    console.log('system.online')
})

client.on("message", e => {
    console.log('message', e.toString())
})

export const robotOn = () => {
    client.on("system.login.qrcode", function (e) {
        //扫码后按回车登录
        process.stdin.once("data", () => {
            this.login().then(r => {
            })
        })
    }).login(). then(r => {})
}
