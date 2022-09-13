import apiInstance from './apiInstance';

export default {
    name: 'apiConfig',
    methods: {
        createInterceptors() {
            apiInstance.interceptors.request.use((config) => {
                const newConfig = config;
                newConfig.headers['x-access-token']=this.$store.state.authToken;
                newConfig.headers.idUser=this.$store.state.userId;
                newConfig.headers.perfil=this.$store.state.perfil;
                return newConfig;
            }, () => {
                this.$store.commit('showErrorMessage', 'Ops! Houve um problema ao enviar a requisição');
            });

            apiInstance.interceptors.response.use(response => response, () => {
                this.$store.commit('showErrorMessage', 'Ops! Houve um problema com a sua requisição.');
            });
        },
    },
};
