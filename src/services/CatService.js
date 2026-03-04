import axios from "axios";

export default {

    sendPostCatRequest(cat) {
        let token = sessionStorage.getItem('token');
        return axios.post('/cat', cat, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    },

    sendGetCatsRequest() {
        let token = sessionStorage.getItem('token');
        return axios.get('/cats',
        {
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
    },

    sendGetCatRequest(catId){
        let token = sessionStorage.getItem('token');
        return axios.get('/cat',
            {
                headers:{
                    Authorization: 'Bearer' + token
                }
            })
    }
}