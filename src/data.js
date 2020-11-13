const _toString = Object.prototype.toString;

// get data type
export const GetDataType = target => _toString.call(target).slice(8, -1);

// match data type
export const MatchDataType = (target, type) => Object.is(_toString.call(target).slice(8, -1), type);

// filter data type for example null/undefined/""/[]/{}
export const FilterDataType = params =>
    MatchDataType(params, "Null") ||
    MatchDataType(params, "Undefined") ||
    (MatchDataType(params, "String") && params.trim() === "") ||
    (MatchDataType(params, "Array") && params.length === 0) ||
    (MatchDataType(params, "Object") && Object.keys(params).length === 0);

// filter objects
export const FilterObject = object => {
    let obj = {};
    Object.keys(object).map(key => !FilterDataType(object[key]) && (obj[key] = object[key]));
    return obj;
}

/**
 * Get the target value or the key value of the target object
 * Default return "", You can set the default return value
 * @param {any} target 目标对象
 * @param {string} key 目标对象的key值
 * @param {string} value 默认返回值
 */
export const GetTargetVal = ({target, key, value = ""}) => {
    return FilterDataType(target)
        ? value
        : Object.is(key, undefined)
            ? target
            : FilterDataType(target[key])
                ? value
                : target[key];
}

/**
 * Get value constant
 * @param {array} constant 目标常量集合
 * @param {string} value 传入的目标值
 * @param {string} key 目标常量的key
 */
export const GetTargetConst = (constant, value, key) => {
    if (FilterDataType(value)) return "--";

    if (GetDataType(value, "String")) {
        let arr = constant.filter(v => v.value === value);
        return arr.length === 0 ? "--" : arr[0][key];
    }
}

// DigitalFormat 2 decimal places reserved by default
export const DigitalFormat = (type, number, other) => {
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