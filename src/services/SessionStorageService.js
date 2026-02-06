export default {

    isAdmin(){
        return  sessionStorage.getItem('userRole')==='admin'
    },

    isLoggedIn(){
        return sessionStorage.getItem('userRole')!== null

    },

    getUserId(){
        return sessionStorage.getItem('userId')

    }
}