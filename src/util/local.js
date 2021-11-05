import Axios from "axios";




const _getLinks = (params) => {
    return Axios({
        url:"links.json",
        method:"get",
        params:params
    })
}

export default {
    _getLinks
}
