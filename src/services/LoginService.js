import axios from "axios";

export default {

    sendGetLoginRequest(username, password) {

        return axios.get('/login', {
                username: username,
                password: password
        })

    }
}
