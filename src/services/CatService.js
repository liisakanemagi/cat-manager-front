import axios from "axios";

export default {

    sendPostCatRequest(cat){
        return axios.post('/cat', cat)
    }
}