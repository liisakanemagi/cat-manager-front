import axios from "axios";

export default {

    sendPostLoginRequest(username, password) {

        return axios.get('/login', {
                username: username,
                password: password
        })

    }
}
