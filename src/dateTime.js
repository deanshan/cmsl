/**
 * For Safari / IE browser, Date "-" conversion "/"
 * @param {string} dateTime 标准日期
 * @param {boolean} isTime 是否删除时间，默认值 true
 */
export const DateTimeStandard = (dateTime, isTime = true) => {
    let t = dateTime.replace(/-/g, "/");
    if(isTime) t = t.replace(/\d\d:\d\d:\d\d/, "");
    return new Date(t).getTime();
}

/**
 * date time format default format: yy-mm-dd hh:mm:ss
 * dateTimeFormat({ts[,type,flag,isTime]})
 * @param {number} ts
 * @param {string} flag 默认值：'-'
 * @param {boolean} isTime 是否含有具体时间 默认值 ture
 * @param {string} type 可选值：'YM'、'MD'（不区分大小写） 默认值：'YMD'
 */
export const dateTimeFormat = ({ts, flag = '-', isTime = true, type = 'ymd'}) => {
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