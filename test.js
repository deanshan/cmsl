const _toString = Object.prototype.toString;

const matchDataType = (target, type) => Object.is(_toString.call(target).slice(8, -1), type);

const filterDataType = params =>
    matchDataType(params, "Null") ||
    matchDataType(params, "Undefined") ||
    (matchDataType(params, "String") && params.trim() === "") ||
    (matchDataType(params, "Array") && params.length === 0) ||
    (matchDataType(params, "Object") && Object.keys(params).length === 0);

// 数字格式化为千分位
const digitalToThousandth = params => {
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


console.log(digitalToThousandth())
console.log(digitalToThousandth(null))
console.log(digitalToThousandth("0123123"))
console.log(digitalToThousandth('123ab123'))
console.log(digitalToThousandth('12312412'))
console.log(digitalToThousandth('12312412.1'))
console.log(digitalToThousandth('12312412.16'))

const dateTimeFormat = ({ts, flag = '-', isTime = true, type = 'ymd'}) => {

    if(!ts) return null;

    let year    = new Date(ts).getFullYear();
    let month   = new Date(ts).getMonth()+1 < 10 ? "0" + (new Date(ts).getMonth()+1) : new Date(ts).getMonth() + 1;
    let day     = new Date(ts).getDate()    < 10 ? "0" + new Date(ts).getDate()      : new Date(ts).getDate();
    let hours   = new Date(ts).getHours()   < 10 ? "0" + new Date(ts).getHours()     : new Date(ts).getHours();
    let minutes = new Date(ts).getMinutes() < 10 ? "0" + new Date(ts).getMinutes()   : new Date(ts).getMinutes();
    let seconds = new Date(ts).getSeconds() < 10 ? "0" + new Date(ts).getSeconds()   : new Date(ts).getSeconds();

    let result = null;
    type = type && type.toUpperCase();
    if(type === 'YM') {
        result = `${year}${flag}${month}`;
    } else if(type === 'MD') {
        result = `${month}${flag}${day}`;
    } else if(type === 'YMD') {
        result = `${year}${flag}${month}${flag}${day}`;
    }
    if(isTime)  result =`${result} ${hours}:${minutes}:${seconds}`;

    return result;
}
console.log(dateTimeFormat({ts: undefined}))