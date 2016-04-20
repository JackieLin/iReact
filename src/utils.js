/**
 * 工具类
 * @author jackie Lin <dashi_lin@163.com>
 */

'use strict';

/**
 * 元素是否可见
 */
exports.isVisiable = (elem) => {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

exports.clone = (data) => {
    return JSON.parse(JSON.stringify(data));
};
