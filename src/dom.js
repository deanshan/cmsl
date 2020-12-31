// Remove HTML tags
// export const removeHTMLTag = str => str.replace(/<[^>]+>/g, '')

// Get scrolling coordinates
// export const getScrollPosition = (el = window) => ({
//     x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
//     y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
// });

// Scroll to top
// export const scrollToTop = () => {
//     const c = document.documentElement.scrollTop || document.body.scrollTop;
//     if (c > 0) {
//         window.requestAnimationFrame(scrollToTop);
//         window.scrollTo(0, c - c / 8);
//     }
// }

/**
 * 关闭当前页面
 */
export const closeCurrentPage = () => {
    window.opener = null;
    window.open('','_self');
    window.close();
}

/**
 * 删除空格
 * @param {String} str
 * @param {String} type all：所有空格 | between：头尾空格 | left：头部空格 | right：尾部空格
 */
export const trim = (str, type = 'all') => {
    switch (type) {
        case 'all':
            return str.replace(/\s+/g, "");
        case 'between':
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 'left':
            return str.replace(/(^\s*)/g, "");
        case 'right':
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}