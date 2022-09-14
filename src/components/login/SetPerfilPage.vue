<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col
                cols="12"
                md="4"
                lg="3"
                class="text-center"
            >
                <h6 class="display-1 text-uppercase">Perfil</h6>

                <v-select
                    :items="items"
                    v-model="perfil"
                    label="Perfil"
                ></v-select>
                <v-btn
                    depressed
                    dark
                    block
                    color="primary"
                    class="mb-2"
                    @click="setPerfil"
                >
                    Definir perfil
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';

    export default {
        name: 'SetPerfilPage',
        components: { Loading},
        mixins: [api],
        data() {
            return {
                items: window.localStorage.userPerfils.split(","),
            }
        },
        methods: {
            setPerfil() {
                if (this.perfil) {
                    window.localStorage.perfil = this.perfil;
                    this.$store.commit('setPerfil', this.perfil);
                    this.$router.push('/');
                } else {
                    this.$store.commit('showErrorMessage', 'O perfil informado não é válido.');
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
