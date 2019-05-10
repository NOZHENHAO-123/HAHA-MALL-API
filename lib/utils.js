// --------- 工具函数 ---------
const jwt = require('jsonwebtoken')
const DEV = require('../config/dev')
/**
 * 失败
 *@param {Object} -data 返回数据 
 *@returns {Object} 
 */
exports.fillErrData = (code,mess) => {
    return {
        code: code,
        message: mess
    }
}

/**
 * 成功
 *@param {Object} -data 返回数据 
 *@returns {Object} 
 */
exports.fillSucessData = (data) => {
    return {
        code: 200,
        message: '操作成功',
        data: data || null
    }
}

/**
 * 设置token
 *@param {Object} -data 加密数据
 *@returns {String} -toekn
 */
exports.getToken = (data) => {
    return jwt.sign(data, DEV.PRIVATE_KEY, {expiresIn: 60*60*24});
}