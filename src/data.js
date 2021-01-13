const _toString = Object.prototype.toString;

/**
 * 获取数据类型
 * @param {any} target
 */
export const getDataType = target => _toString.call(target).slice(8, -1);

/**
 * 精准匹配数据类型
 * @param {any} target
 * @param {String} type 可选值 Null、Undefined、String、Array、Object、FormData...
 */
export const matchDataType = (target, type) => Object.is(_toString.call(target).slice(8, -1), type);

/**
 * 过滤指定数据类型 如[]、{}、""（包括去空格）、null、undefined
 * @param {any} params
 */
export const filterDataType = params =>
    matchDataType(params, "Null") ||
    matchDataType(params, "Undefined") ||
    (matchDataType(params, "String") && params.trim() === "") ||
    (matchDataType(params, "Array") && params.length === 0) ||
    (matchDataType(params, "Object") && Object.keys(params).length === 0);

/**
 * 过滤对象中的[]、{}、""（包括去空格）、null、undefined
 * @param {Object} object
 */
export const filterObject = object => {
    let obj = {};
    Object.keys(object).map(key => !filterDataType(object[key]) && (obj[key] = object[key]));
    return obj;
}

/**
 * 获取目标值或目标对象的key值
 * @param {any} target 目标对象
 * @param {string} key 目标对象的key值
 * @param {string} value 默认返回值
 */
export const getTargetVal = ({target, key, value = null}) => {
    return filterDataType(target)
        ? value
        : Object.is(key, undefined)
            ? target
            : filterDataType(target[key])
                ? value
                : target[key];
}

/**
 * 获取常量集合中的key值
 * @param {array} constant 目标常量集合
 * @param {string} value 传入的目标值
 * @param {string} key 目标常量的key
 * @param {string} flag 默认的返回值
 */
export const getTargetConst = (constant, value, key, flag = '--') => {
    if (filterDataType(value)) return flag;

    if (getDataType(value, "String")) {
        let arr = constant.filter(v => v.value === value);
        return arr.length === 0 ? flag : arr[0][key];
    }
}

// 计算2位（包括2位）以内的小数，主要用于金额的准确率（避免出现0.1+0.2,0.8*3误差)
export const digitalFormat = (type, number, other) => {
    let total = '0';
    switch(type) {
        case "+":
            total = (Number(number) * Math.pow(10, 2) + Number(other) * Math.pow(10, 2)) / Math.pow(10, 2);
            break;
        case "-":
            total = (Number(number) * Math.pow(10, 2) + Number(other) * Math.pow(10, 2)) / Math.pow(10, 2);
            break;
        case "*":
            total = (Number(number) * Math.pow(10, 2)) * (Number(other) * Math.pow(10, 2)) / Math.pow(10, 4);
            break;
        case "/":
            total = Object.is(Number(other), 0) ? '0' : Number(number) / Number(other);
            break;
    }
    return total.toFixed(2);
}

// 数字格式化为千分位
export const digitalToThousandth = params => {
    let pattern1 = /^[0-9]+$/;
    let pattern2 = /^[0-9]+(\.[0-9]{1})$/;
    params = Number(params).toString();
    // 没有小数
    if(pattern1.test(params)) {
        params += ".00";
    }
    // 一位小数
    if(pattern2.test(params)) {
        params += "0";
    }
    return filterDataType(params) ? null : params.replace(/\d{1,3}(?=(\d{3})+(?:$|\.))/g,s=> `${s},`);
}