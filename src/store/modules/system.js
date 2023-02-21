import {appStore} from "@/utils/appStore";

const state = {
    isMax: false,
    maxTimes: 0,
    draggable: true,
    menuIsOpen: appStore.get('system.menuIsOpen') || false,
}

export default {
    state
}
