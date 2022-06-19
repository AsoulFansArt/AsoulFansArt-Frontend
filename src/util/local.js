import Axios from "axios";




const _getLinks = (params) => {
    return Axios({
        url:"/links.json",
        method:"get",
        params:params
    })
}

const _getVersion = (params) => {
    return Axios({
        url:"/version.json",
        method:"get",
        params:params
    })
}

const _getTimeLine = (params) => {
    return Axios({
        url:"/timeline.json",
        method:"get",
        params:params
    })
}


export default {
    _getLinks,
    _getVersion,
    _getTimeLine
}
