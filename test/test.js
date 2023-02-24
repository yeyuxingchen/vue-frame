const fs = require('fs')
const path = require('path')

const getParentPath = (path) => {
    const pathSplit = path.split(/\\/)
    pathSplit.splice(pathSplit.length - 1, 1)
    return pathSplit.join('\\')
}



const createPath = (p, callback) => {
    fs.stat(p, (e, s) => {
        if (e) {
            createPath(path.dirname(p), () => {
                fs.mkdir(p, callback)
            })
        } else {
            callback(p)
        }
    })
}
const res = getParentPath("E:\\1\\2\\3\\4\\5\\6\\7\\")

createPath(res, (e) => {
    console.log(e)
})
