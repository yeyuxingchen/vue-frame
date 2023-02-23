import {appStore} from "@/utils/appStore";

const default_state = {
    bg: 'white',
    color: "#333",
    menuBg: '#333333aa',
    menuColor: 'white'
}

const theme = appStore.get('theme') || default_state

const state = {
    ...theme
}

export default {
    namespace: true,
    state
}
