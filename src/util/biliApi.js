import Axios from "axios";

const url = "https://api.bilibili.com/x/article/viewinfo";


const _getArticleInfo = (params) => {
    return Axios({
        url:url,
        method:"get",
        params:params
    })
}

export default {
    _getArticleInfo
}
