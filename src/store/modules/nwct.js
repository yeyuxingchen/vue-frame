import {appStore} from "@/utils/appStore";

const state = {
    feige: {
    },
    natapp: {
        cookie: appStore.get('nwct.natapp.cookie')
    }
}

export default {
    state
}
