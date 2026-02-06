import router from "@/router";
import loginView from "@/views/LoginView.vue";

export default {

    navigateToLoginView(){
        router.push({name: 'loginRoute'})
    },

    navigateToHomeView(){
        router.push({name:'homeRoute'})
    },

    navigateToErrorView(){
        router.push({name:'errorRoute'})
    },

    navigateToRegisterView() {
        router.push(({name:'registerRoute'}))
    }

}