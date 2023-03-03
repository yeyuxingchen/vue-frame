export const json2form = (json) => {
    const list = []
    Object.keys(json).forEach(key => {
        list.push(key + '=' + json[key])
    })
    return list.join('&')
}

