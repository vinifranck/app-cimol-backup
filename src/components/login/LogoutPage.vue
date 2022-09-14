<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col
                cols="12"
                md="4"
                lg="3"
                class="text-center"
            >
                <v-btn
                    depressed
                    dark
                    block
                    color="primary"
                    class="mb-2"
                    @click="logout()"
                >
                    Logout
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
    
    export default {
        name: 'LogoutPage',
        components: {Loading},
        mixins: [api],
        methods: {
            logout(){
                this.$store.commit('setAuthToken', response.data.token);
                this.$store.commit('setUserId', '');
                this.$store.commit('setUserNome', '');
                 this.$store.commit('setUserPerfils', '');
                this.$store.commit('setLogged', true);
                this.$router.push('/');
            },
        }
    }