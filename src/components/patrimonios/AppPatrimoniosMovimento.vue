<template>
    <v-container>
        <v-app class="mr-7 mb-0"  >
            <v-main class="container align-center mt-0">
                <v-toolbar flat>
                    <v-toolbar-title>Movimentações</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-row align="center">
                    </v-row>
                    <v-spacer />
                </v-toolbar>
                <v-card>
                    <v-data-table :headers="headers" :items="movimentos"
                        :footer-props="{ 'items-per-page-text': 'Itens por página' }" class="elevation-1">
                    </v-data-table>
                </v-card>
                <back-button />
            </v-main>
        </v-app>
    </v-container>
</template>
<script>
import BackButton from "../navigation/BackButton.vue";
import api from "../api/api";
import axiosInstance from "../api/apiInstance";

export default {
    name: "appMovimentos",
    mixins: [api],
    components: {
        BackButton,
    },
    data() {
        return {
            headers: [
                { text: "ID", value: "id_patrimonio_movimento" },
                { text: "Descrição", value: "descricao" },
                { text: "Data", value: "data" },
                { text: "Tipo Movimentação", value: "nome" },
            ],
            movimentos: [],
            tipoMov:[],

        };
    },
    mounted() {
        this.carregaMov();
    },
    methods: {
        carregaMov() {
            this.movimentos = [];
            axiosInstance.get("/curso/patrimonio/movimentacao")
                .then(response => {
                    this.movimentos = response.data.patrimonio;
                }).catch((error) => {
                    console.log(error);
                });
        },
    }
}
</script>
<style scoped>
.v-main {
    flex: 0 0 auto;
}
</style>