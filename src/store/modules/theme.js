import {appStore} from "@/utils/appStore";

const default_state = {
    bg: 'white',
    color: "#1e1e1e",
    menuBg: '#333333aa',
    menuColor: 'white',
    topBg: '#252526'
}

const theme = appStore.get('theme') || default_state

const state = {
    ...theme
}

export default {
    namespace: true,
    state
}
