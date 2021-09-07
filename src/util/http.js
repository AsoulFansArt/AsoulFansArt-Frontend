import Axios from "axios";

const hosts = 'https://asoulfansart-1209144-1306812141.ap-shanghai.run.tcloudbase.com'

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

export default {
    _getBV,
    _getVideoPart,
    _submitBV,
    _getDynamicDetail,
    _getPic,
    _getPicTags,
    _getNotification,
    _submit
}


