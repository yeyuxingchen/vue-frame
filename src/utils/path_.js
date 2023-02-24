import path from "path";

const os = require('os')
const fs = require('fs')
const path_ = require('path')

const home = os.homedir()

const appData = `${home}\\AppData`

const cachePath = `${appData}\\Local\\VFrame\\save`

const getParentPath = (path) => {
    return path_.dirname(path)
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

const getCachePath = () => {
    return new Promise(resolve => {
        fs.stat(cachePath, (e, s) => {
            if (e) {
                fs.mkdir(cachePath, () => {})
            }
            resolve(cachePath)
        })
    })
}

export default {
    appData,
    cachePath,
    getCachePath,
    createPath
}
