<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col
                cols="12"
                md="4"
                lg="3"
                class="text-center"
            >
                <h6 class="display-1 text-uppercase">Login</h6>
                <v-text-field
                    v-model="email"
                    label="E-mail"
                />
                <v-text-field
                    v-model="senha"
                    label="Senha"
                    type="password"
                />
                <v-btn
                    depressed
                    dark
                    block
                    color="primary"
                    class="mb-2"
                    @click="login"
                >
                    Login
                </v-btn>
                
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
    const md5 = require("md5");
    export default {
        name: 'LoginPage',
        components: { Loading},
        mixins: [api],
        data() {
            return {
                email: window.localStorage.userEmail,
                senha:'info1234',
                //senha: '45b45c21a0cdd1479235e69c936a09e6',
            };
        },
        methods: {
            login(){
                if (this.email && this.senha) {
                    this.post(`/user/login`,{email:this.email, senha:md5(this.senha)}).then((response) => {
                        this.$store.commit('setAuthToken', response.data.token);
                        this.$store.commit('setUserId', response.data.user.id);
                        this.$store.commit('setUserNome', response.data.user.nome);
                        this.$store.commit('setUserEmail', response.data.user.email);
                        this.$store.commit('setUserPerfils', response.data.user.perfil);
                        this.$store.commit('setLogged', true);
                        if(response.data.user.perfil.length > 0){
                            if(response.data.user.perfil.length == 1){
                                this.$store.commit('perfil', response.data.user.perfil[0]);
                            }else{
                                this.$router.push('/setperfil');
                            }
                        }
                        this.$router.push('/setperfil');
                    }).catch(() => {
                        this.searchOnGoing = false;
                    });
                    
                } else {
                    this.$store.commit('showErrorMessage', 'Você deve informar um e-mail de Usuário e uma senha');
                }
            },
            loginAsGuest() {
                this.$store.commit('setLogged', true);
                this.$router.push('/');
            },
        },
    };
</script>

<style scoped>

</style>
