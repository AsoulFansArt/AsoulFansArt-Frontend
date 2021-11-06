import Axios from "axios";

let hosts = 'https://api.asoul.cloud:8000'

Axios.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};

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

export default {
    _getBV,
    _getVideoPart,
    _submitBV,
    _getDynamicDetail,
    _getPic,
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
    _getAccountInfo
}


