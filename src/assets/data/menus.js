/**
 * 文件菜单
 */
const files = {
    label: '文件', value: 'file', children: [
        {
            label: '新建',
            value: 'file-create'
        },
        {
            label: '打开',
            value: 'file-open'
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
    themes,
    help
]
