const _timestampToTime = (timestamp) =>{
    let today = new Date();
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
    if (date.getFullYear() != today.getFullYear()){
        return Y+M+D;
    }else{
        return M+D;
    }
}

const _timestampToTimeY = (timestamp) =>{
    let today = new Date();
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
    if (date.getFullYear() != today.getFullYear()){
        return Y+M+D;
    }else{
        return M+D;
    }
}

const _changeBillionToCN = (c) =>{
    if(typeof(c) != "string") {
        c = c.toString();
    }
    if(c.split(".")[0].length >= 5 && c.split(".")[0].length <= 8) {
        return parseFloat((c / 10000).toFixed(2)) + "万";
    } else if(c.split(".")[0].length > 8 && c.split(".")[0].length < 13) {
        return parseFloat((c / 100000000).toFixed(2)) + "亿";
    } else if(c.split(".")[0].length > 13) {
        return parseFloat((c / 1000000000000).toFixed(2)) + "兆";
    }
    return c;
}

const _isMobile = () => {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}

export default {
    _timestampToTime,
    _changeBillionToCN,
    _isMobile,
    _timestampToTimeY
}
