<template>
    <v-app class="mr-7">
        <v-main class="container align-center mt-0">
            <v-toolbar flat>
                <v-toolbar-title>Patrimônios</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <div class="d-flex">
                            <v-btn color="cyan" dark class="ml-auto ma-3" v-on="on">
                                Novo Item
                            </v-btn>
                        </div>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span v-if="editedItem.descricao"
                                >Editar {{ editedItem.descricao }}</span
                            >
                            <span v-else>Inserir</span>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.descricao" label="Descrição">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.numero_serie"
                                        label="Num Série"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.numero_patrimonio"
                                        label="Num Patrimônio"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.item_nota_fiscal"
                                        label="Nota Fiscal"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-file-input
                                        accept="image/*"
                                        label="Imagem"
                                        truncate-length="10"
                                        @change="Preview_image"
                                        v-model="editedItem.imagem"
                                    >
                                    </v-file-input>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.local"
                                        label="Local"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red accent-1" text @click="showEditDialog()"
                                >Cancelar</v-btn
                            >
                            <v-btn color="light-green lighten-1" text @click="saveItem(editedItem)"
                                >Salvar</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-card>
                <v-data-table :headers="headers" :items="items">
                    <template v-slot:item.actions="{ item }">
                        <div class="text-truncate">
                            <v-btn class="ma-2" fab dark x-small color="cyan">
                                <v-icon small @click="showEditDialog(item)" color="white">
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                            <v-btn class="mx-2" fab dark x-small color="#EF5350">
                                <v-icon small @click="showDeleteDialog(item)" color="white">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title>Deletar</v-card-title>
                        <v-card-title class="text-h6 .align-self-center">
                            Tem certeza que deseja deletar {{ itemToDelete.descricao }}?
                        </v-card-title>
                        <v-card-text class="text-h7 .align-self-center">
                            <strong class="red--text text--lighten-1"
                                >(Esta ação não poderá ser desfeita!)</strong
                            >
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="light-green lighten-1" text @click="dialogDelete = false"
                                >Fechar</v-btn
                            >
                            <v-btn color="red accent-1" text @click="deleteItem()">Deletar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
            <back-button />
        </v-main>
    </v-app>
</template>
<script>
const axios = require("axios");
import api from "../api/api";
import axiosInstance from "../api/apiInstance";
import BackButton from "../navigation/BackButton.vue";
export default {
    mixins: [api],
    name: "appPatrimonio",
    data() {
        return {
            headers: [
                { text: "ID", value: "id_patrimonio_item" },
                { text: "Descrição", align: "start", value: "descricao", sortable: false },
                { text: "Número de Série", value: "numero_serie", sortable: false },
                { text: "Número Patrimonio", value: "numero_patrimonio", sortable: false },
                { text: "Local", value: "local", sortable: false },
                { text: "Nota Fiscal", value: "item_nota_fiscal", sortable: false },
                { text: "Imagem", value: "imagem", sortable: false },
                { text: "Ações", value: "actions", sortable: false },
            ],
            items: [],
            dialog: false,
            editedItem: {},
            dialogDelete: false,
            itemToDelete: {},
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        Preview_image() {
            this.url = URL.createObjectURL(this.imagem);
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog;
        },
        loadItems() {
            this.items = [];
            axiosInstance
                .get(`/curso/patrimonio/lista`)
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        saveItem(item) {
            let method = "post";
            let url = `/curso/patrimonio/criarPatrimonio`;
            let id = item.id_patrimonio_item;
            if (id) {
                method = "put";
                url = `/curso/patrimonio/${this.$route.params.id_curso}/${id}`;
            }
            let data = {
                fields: item,
            };
            axiosInstance[method](url, data)
                .then((response) => {
                    this.dialog = false;
                    this.loadItems();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteItem() {
            const index = this.items.indexOf(this.itemToDelete);
            axiosInstance
                .delete(`/remover/${this.$route.params.id_patrimonio}`)
                .then((response) => {
                    this.items.splice(index, 1);
                });
            this.items.splice(index, 1);
            this.dialogDelete = false;
        },
        showDeleteDialog(item) {
            this.itemToDelete = item;
            this.dialogDelete = !this.dialogDelete;
        },
    },
};
</script>
<style scoped>
.v-main {
    flex: 0.2 0 auto;
}
</style>
