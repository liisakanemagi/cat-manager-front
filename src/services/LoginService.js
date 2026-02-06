import axios from "axios";

export default {

    sendPostLoginRequest(username, password) {

        return axios.post('/login', {
                username: username,
                password: password
        })

    }
}
