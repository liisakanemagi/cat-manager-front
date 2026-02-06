import axios from "axios";

export default {

    sendPostRegisterRequest(userInfo){
        return axios.post('/register', userInfo)
    }
}