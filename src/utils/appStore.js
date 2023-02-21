// --------------------------------
// 数据存储（持久化）
// 会话存储的数据：登录信息（token、用户信息等）
// 本地存储的数据：授权码、设置、下次会话仍需要展示的数据等
// --------------------------------

import Store from 'electron-store'

// 应用级别数据存储
export const appStore = new Store({
    name: 'v-f-config'
})

// 用户级别数据存储（登录后使用）
export const userStore = new Store({
    name: 'v-f-user'
})
