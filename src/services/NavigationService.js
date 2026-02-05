import router from "@/router";
import loginView from "@/views/LoginView.vue";

export default {

    navigateToLoginView(){
        router.push({name: 'loginRoute'})
    }

}