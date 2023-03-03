import router from "@/router";

/**
 * 文件菜单
 */
const files = {
    label: '功能', value: 'func', children: [
        {
            label: '打印预览',
            value: 'printer-preview'
        }
    ]
}

const utils = {
    label: '工具', value: 'tools', children: [
        {
            label: 'python版本管理',
            value: 'tools-python-config-version',
            func: () => {
                router.push({name: 'tools-python-config-version'})
            }
        },
        {
            label: 'node版本管理',
            value: 'tools-node-config-version',
            func: () => {
                router.push({name: 'tools-node-config-version'})
            }
        },
        {
            label: '请求相关',
            value: 'tools-request-utils-about',
            func: () => {
                router.push({name: 'tools-request-utils-about'})
            }
        }
    ]
}

const develop = {
    label: '开发', value: 'develop', children: [
        {
            label: '飞鸽内网穿透',
            value: 'develop-feige-chuantou',
            func: () => {
                router.push({name: 'develop-feige-chuantou'})
            }
        },
        {
            label: '小米球穿透',
            value: 'develop-xiaomiqiu-chuantou',
            func: () => {
                router.push({name: 'develop-xiaomiqiu-chuantou'})
            }
        },
        {
            label: 'NATAPP穿透',
            value: 'develop-natapp-chuantou',
            func: () => {
                router.push({name: 'develop-natapp-chuantou'})
            }
        }
    ]
}

const themes = {
    value: 'theme',
    label: "主题",
    children: [
        {
            label: '黑色',
            value: 'theme-black'},
        {
            label: '白色',
            value: 'theme-white'
        },
        // {
        //     label: '自定义主题',
        //     value: 'custom-theme'
        // }
    ]
}

const help = {
    value: 'help',
    label: '帮助',
    children: [
        {
            label: '注册',
            value: 'help-register'
        },
        {
            label: '关于',
            value: 'help-about'
        }
    ]
}


export const menusDate = [
    files,
    utils,
    develop,
    themes,
    help
]
