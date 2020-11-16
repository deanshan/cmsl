const _toString = Object.prototype.toString;

// get data type
export const getDataType = target => _toString.call(target).slice(8, -1);

// match data type
export const matchDataType = (target, type) => Object.is(_toString.call(target).slice(8, -1), type);

// filter data type for example null/undefined/""/[]/{}
export const filterDataType = params =>
    matchDataType(params, "Null") ||
    matchDataType(params, "Undefined") ||
    (matchDataType(params, "String") && params.trim() === "") ||
    (matchDataType(params, "Array") && params.length === 0) ||
    (matchDataType(params, "Object") && Object.keys(params).length === 0);

// filter objects
export const filterObject = object => {
    let obj = {};
    Object.keys(object).map(key => !filterDataType(object[key]) && (obj[key] = object[key]));
    return obj;
}

/**
 * Get the target value or the key value of the target object
 * Default return "", You can set the default return value
 * @param {any} target 目标对象
 * @param {string} key 目标对象的key值
 * @param {string} value 默认返回值
 */
export const getTargetVal = ({target, key, value = ""}) => {
    return filterDataType(target)
        ? value
        : Object.is(key, undefined)
            ? target
            : filterDataType(target[key])
                ? value
                : target[key];
}

/**
 * Get value constant
 * @param {array} constant 目标常量集合
 * @param {string} value 传入的目标值
 * @param {string} key 目标常量的key
 */
export const getTargetConst = (constant, value, key) => {
    if (filterDataType(value)) return "--";

    if (getDataType(value, "String")) {
        let arr = constant.filter(v => v.value === value);
        return arr.length === 0 ? "--" : arr[0][key];
    }
}

// digitalFormat 2 decimal places reserved by default
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