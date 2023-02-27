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
    themes,
    help
]
