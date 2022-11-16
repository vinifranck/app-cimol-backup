<template>
    <v-container>
    <v-app class="mr-7">
        <v-main class="container align-center mt-0">
            <v-toolbar flat>
                <v-toolbar-title>Patrimônios</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6">
                        <v-select :items="cursos" label="Cursos" @input="filtraCurso"></v-select>
                    </v-col>
                </v-row>
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
                                <span class="headline">{{ tituloForm }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.descricao" label="Descrição">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.numero_serie" label="Num Série">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.numero_patrimonio" label="Num Patrimônio">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.item_nota_fiscal" label="Nota Fiscal">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-file-input accept="image/*" label="Imagem" truncate-length="10"
                                            @change="Preview_image" v-model="editedItem.imagem">
                                        </v-file-input>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.local" label="Local"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>  
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red accent-1" text @click="showEditDialog()">Cancelar</v-btn>
                                <v-btn color="light-green lighten-1" text @click="salva()">Salvar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </v-toolbar>
            <v-card>
                <v-data-table :headers="headers" :items="items" :footer-props="{'items-per-page-text':'Itens por página'}">
                    <template v-slot:item.actions="{ item }">
                        <div class="text-truncate">
                            <v-btn class="ma-2" fab dark x-small color="cyan">
                                <v-icon small @click="editItem(item)" color="white">
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
                            <strong class="red--text text--lighten-1">(Esta ação não poderá ser desfeita!)</strong>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="light-green lighten-1" text @click="dialogDelete = false">Fechar</v-btn>
                            <v-btn color="red accent-1" text @click="deleta(itemToDelete)">Deletar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-main>
    </v-app>
</v-container>
</template>
<script>
import api from "../api/api";
import axiosInstance from "../api/apiInstance";
import Axios from "axios";
import BackButton from '../navigation/BackButton.vue';
export default {
    mixins: [api],
    name: "appPatrimonio",
    data() {
        return {
            headers: [
                { text: 'ID', value: "id_patrimonio_item" },
                { text: 'Descrição', align: "start", value: "descricao", sortable: false },
                { text: "Número de Série", value: "numero_serie", sortable: false },
                { text: "Número Patrimonio", value: "numero_patrimonio", sortable: false },
                { text: "Local", value: "local", sortable: false },
                { text: "Nota Fiscal", value: "item_nota_fiscal", sortable: false },
                { text: "Imagem", value: "imagem", sortable: false },
                { text: "Situação", value: "nome", sortable: false },
                { text: "Ações", value: "actions", sortable: false },
            ],
            items: [],
            dialog: false,
            editedItem: [],
            dialogDelete: false,
            editedIndex: -1,
            itemToDelete: [],
            cursos: [
                { text: "Eletrônica", value: 1 },
                { text: "Eletrotécnica", value: 2 },
                { text: "Mecânica", value: 3 },
                { text: "Design de Móveis", value: 4 },
                { text: "Móveis", value: 5 },
                { text: "Informática", value: 6 },
                { text: "Química", value: 7 },
                { text: "Meio Ambiente", value: 8 },
            ],
        };
    },
    mounted() {
        this.carrega();
    },
    computed:{
        tituloForm(){
            return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
        }
    },
    methods: {
        Preview_image() {
            this.url = URL.createObjectURL(this.imagem);
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog;
        },
        filtraCurso(){
            axiosInstance
                .get(`/curso/patrimonio/lista/${item.id_curso}`)
                .then((response) => {
                    this.cursos = response.data;
                    this.carrega();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleta(item){
            let url = `/curso/patrimonio/remover/${item.id_patrimonio_item}`
            console.log(url);
            axiosInstance.delete(url)
                .then(res => {
                    this.carrega();
                    this.dialogDelete = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        carrega() {
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

        salva(item) {
            let method = "post";
            let url = `/curso/patrimonio/criarPatrimonio`;
            let id = item.id_patrimonio_item;
            if (id) {
                method = "put";
                url = `/curso/patrimonio/alterar/${this.$route.params.id_curso}/${id}`;
            }
            console.log(method);
            console.log(item);
            let data = {
                ...item
            };
            axiosInstance[method](url, data)
                .then((response) => {
                    this.dialog = false;
                    this.carrega();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        showDeleteDialog(item){
            this.itemToDelete = item;
            this.dialogDelete = !this.dialogDelete;
        },
        editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

       /* loadPatCurso() {
            axiosInstance
                .get(`/curso/patrimonio/lista/${this.$route.params.id_curso}`)
                .then((response) => {
                    this.itemsCurso = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },*/
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
}
</script>
<style scoped>
.v-main {
    flex: 0.2 0 auto;
}
</style>
