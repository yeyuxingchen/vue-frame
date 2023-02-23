const { generateKeyPairSync, publicEncrypt, privateDecrypt, createHash, createCipheriv, createDecipheriv } = require('crypto')
const getMac = require('getmac')

export const key = 'o1VjsfSQrubKkJRMiyHobV04MrmjTlNU'
export const iv = 'eAg3ty1UXx9Vwi1V'
export const en = (key, value) => {
        const cipher = createCipheriv('aes-256-cbc', key, iv)
        let enc = cipher.update(value, 'utf-8', 'hex')
        enc += cipher.final('hex')
        return enc
}

export const de = (key, value) => {
    try {
        const cipher = createDecipheriv('aes-256-cbc', key, iv)
        let dec = cipher.update(value, 'hex', 'utf-8')
        dec += cipher.final('utf-8')
        return dec
    } catch (e) {
        return null
    }
}

export const deWithKey = (value) => {
    return de(key, value)
}

export const getMacString = () => {
    const md5 = createHash("md5");
    md5.update(getMac.default());
    const str = md5.digest('hex');
     //32位大写
    return str.toUpperCase()
}

export const registerCheck = (key) => {
    if(!key) {
        return false
    }
    return deWithKey(key) === getMacString()
}
