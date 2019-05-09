// --------- 工具函数 ---------

/**
 * 失败
 *@param {Object} -data 返回数据 
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
 */
exports.fillSucessData = (data) => {
    return {
        code: 200,
        message: '操作成功',
        data: data || null
    }
}
  