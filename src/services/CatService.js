import axios from "axios";

export default {

    sendPostCatRequest(cat){
        let token = sessionStorage.getItem('token');
        return axios.post('/cat', cat, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}