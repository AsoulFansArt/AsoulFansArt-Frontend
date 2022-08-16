import Axios from "axios";

let hosts = 'https://api.asoulfanart.com:9000'
//hosts = 'http://192.168.1.10:8000'
Axios.defaults.withCredentials = true

Axios.interceptors.request.use(
    config =>{
        const token = localStorage.getItem('token')
        if (token)
            config.headers.Authorization = "Token " + token;
        return config
    }, error => {
        return Promise.reject(error);
    }
)

const _getBV = (params) =>{
    params.tag_id = params.tag_id || 0
    if (params.tag_id == 0 || params.rank == 4){
        params.type = 1
    }else{
        params.type = 2
    }

    return Axios({
        url:hosts + "/getBV" + '?nocache=' + new Date().getTime(),
        method:"get",
        params: params
    })
}

const _getVideoPart = () =>{
    return Axios({
        url:hosts + "/getVideoPart",
        method:"get"
    })
}

const _getPicTags = () =>{
    return Axios({
        url:hosts +"/getPicTags",
        method:"get"
    })
}

const _submitBV = (params) =>{
    return Axios({
        url:hosts +"/submitBV",
        method:"get",
        params:params
    })
}

const _getDynamicDetail = (params) =>{
    return Axios({
        url:hosts +"/getDynamicDetail",
        method: "get",
        params:params
    })
}

const _getPic = (params) =>{
    params.tag_id = params.tag_id || 0
    if (params.tag_id == 0 || params.rank == 4){
        params.type = 1
    }else{
        params.type = 2
    }
    return Axios({
        url:hosts +"/getPic" + '?nocache=' + new Date().getTime(),
        method: "get",
        params:params
    })
}

const _getNotification = (params) =>{
    return Axios({
        url:hosts +"/getNotification",
        method: "get",
        params:params
    })
}

const _submit = (params) =>{
    return Axios({
        url:hosts +"/submit",
        method: "get",
        params:params
    })
}

const _getOfficialQA = (params) =>{
    return Axios({
        url:hosts +"/getOfficialQA",
        method: "get",
        params:params
    })
}

const _getOfficialQADetail = (params) =>{
    return Axios({
        url:hosts +"/getOfficialQADetail",
        method: "get",
        params:params
    })
}

const _searchOfficialQA = (params) =>{
    return Axios({
        url:hosts +"/searchOfficialQA",
        method: "get",
        params:params
    })
}

const _sortGetOfficialQA = (params) =>{
    return Axios({
        url:hosts +"/sortGetOfficialQA",
        method: "get",
        params:params
    })
}

const _getArticleSorts = (params) =>{
    return Axios({
        url:hosts +"/getArticleSorts",
        method: "get",
        params:params
    })
}

const _submitArticle = (params) =>{
    return Axios({
        url:hosts +"/submitArticle",
        method: "get",
        params:params
    })
}

const _getMeme = (params) =>{
    params.tag_id = params.tag_id || 0
    if (params.tag_id == 0 || params.rank == 4){
        params.type = 1
    }else{
        params.type = 2
    }
    return Axios({
        url:hosts +"/getMeme" + '?nocache=' + new Date().getTime(),
        method: "get",
        params:params
    })
}

const _getArticleList = (params) =>{
    return Axios({
        url:hosts +"/getArticleList" + '?nocache=' + new Date().getTime(),
        method: "get",
        params:params
    })
}

const _getAccountInfo = (params) => {
    return Axios({
        url:hosts +"/account/info",
        method: "get",
        params:params
    })
}

const _tempLogin = (params) => {
    return Axios({
        url:hosts +"/account/temp/login",
        method: "get",
        params:params
    })
}

const _tempView = (params) => {
    return Axios({
        url:hosts +"/account/temp/view",
        method: "post",
        data:params
    })
}

const _getRank = (params) => {
    return Axios({
        url:hosts +"/pic/getRank",
        method: "get",
        params:params
    })
}

const _regAccount = (params) => {
    return Axios({
        url:hosts +"/account/register",
        method: "post",
        data:params
    })
}

const _accountLogin = (params) => {
    return Axios({
        url:hosts +"/account/login",
        method: "post",
        data:params
    })
}

const _getAccountProfile = () => {
    return Axios({
        url:hosts +"/account",
        method: "get",
    })
}

const _addFavorites = (params) => {
    return Axios({
        url:hosts +"/account/favorites/add",
        method: "post",
        data:params,
    })
}

const _addView = (params) => {
    return Axios({
        url:hosts +"/account/view/add",
        method: "post",
        data:params,
    })
}

const _getFavorites = (params) => {
    return Axios({
        url:hosts +"/account/favorites",
        method: "get",
        params:params
    })
}

const _getViewHistory = (params) => {
    return Axios({
        url:hosts +"/account/view/history",
        method: "get",
        params:params
    })
}

const _getPicDetail = (id) =>{
    return Axios({
        url:hosts +"/getPicDetail" + '?nocache=' + new Date().getTime(),
        method: "get",
        params: {id}
    })
}

const _getFansMedalLog = (params) =>{
    return Axios({
        url:hosts +"/fans/medal/log",
        method: "get",
        params: params
    })
}

const _getHomeInfo = (params) =>{
    return Axios({
        url:hosts +"/home",
        method: "get",
        params: params
    })
}


export default {
    _regAccount,
    _accountLogin,
    _getAccountProfile,
    _addFavorites,
    _addView,
    _getFavorites,
    _getViewHistory,
    _getHomeInfo,

    _getBV,
    _getVideoPart,
    _submitBV,
    _getDynamicDetail,
    _getPic,
    _getPicDetail,
    _getPicTags,
    _getNotification,
    _submit,
    _getOfficialQA,
    _getOfficialQADetail,
    _sortGetOfficialQA,
    _searchOfficialQA,
    _getArticleSorts,
    _submitArticle,
    _getMeme,
    _getArticleList,
    _getAccountInfo,
    _tempLogin,
    _tempView,
    _getRank,


    _getFansMedalLog
}


