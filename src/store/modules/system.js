import {appStore} from "@/utils/appStore";

const state = {
    isMax: false,
    maxTimes: 0,
    draggable: true,
    menuIsOpen: appStore.get('system.menuIsOpen') || false,
    percentage: 0,
    registerKey: appStore.get('system.registerKey') || null
}

export default {
    state
}
