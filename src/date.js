/**
 * Safari和IE与“-”和“.”不兼容，全部转换为“/”
 * @param {string} dateTime 标准日期, 格式为 yy-mm-dd hh:mm:ss 或 yy-mm-dd
 * @param {boolean} isTime 返回的时间戳是否包含具体时间，默认值 true 不包含
 */
export const dateFormatConversion = (dateTime, isTime = true) => {

    if(!dateTime) return null;

    let t = dateTime.replace(/-/g, "/").replace(/\./g,'/'); //  把日期中包含的'-','.'全部转换成'/'
    isTime && (t = t.replace(/\d\d:\d\d:\d\d/, ""));
    return new Date(t).getTime();
}

/**
 * 日期时间格式化 默认格式yy-mm-dd hh:mm:ss
 * @param {Date} ts 标准时间或时间戳
 * @param {string} flag 日期拼接符号 默认值：'-'
 * @param {boolean} isTime 是否含有时间 默认值 ture
 * @param {string} type 返回的日期格式 可选值：'YM'、'MD'（不区分大小写） 默认值：'YMD'
 */
export const dateTimeFormat = ({ts, flag = '-', isTime = true, type = 'ymd'}) => {

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