import axios from "axios";

export default {
    sendGetCatStatusesRequest(){
        let token = sessionStorage.getItem('token');
        return axios.get('/cat/statuses', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}