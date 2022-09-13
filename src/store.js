import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authToken: '',
        userId: '',
        userNome:'',
        userEmail: '',
        userPerfils:'',
        perfil: '',
        logged: false,
        showNav:true,
        message: {
            text: '',
            type: '',
        },
    },
    mutations: {
        setAuthToken(state, payload) {
            window.localStorage.authToken = payload;
            state.authToken = payload;
            state.logged = Boolean(state.authToken);
        },
        setUserId(state, payload) {
            window.localStorage.userId = payload;
            state.userId = payload;
        },
        setUserNome(state, payload) {
            window.localStorage.userNome = payload;
            state.userNome = payload;
        },
        setUserEmail(state, payload) {
            window.localStorage.userEmail = payload;
            state.userEmail = payload;
        },
        setUserPerfils(state, payload) {
            window.localStorage.userPerfils = payload;
            state.userPerfils = payload;
        },
        setPerfil(state, payload) {
            window.localStorage.perfil = payload;
            state.perfil = payload;
        },
        setLogged(state, payload) {
            window.localStorage.logged = payload;
            state.logged = payload;
        },
        setShowNav(state, payload) {
            console.log(3);
            window.localStorage.showNav = payload;
            state.showNav = payload;
        },
        showErrorMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'ERROR',
            };
        },
        showSuccessMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'SUCCESS',
            };
        },
    },
});
