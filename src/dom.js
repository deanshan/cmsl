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

// Remove space, type: a-all spaces b-space before and after l-space before and r-space after
export const trim = (str, type = 'a') => {
    switch (type) {
        case 'a':
            return str.replace(/\s+/g, "");
        case 'b':
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 'l':
            return str.replace(/(^\s*)/g, "");
        case 'r':
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}