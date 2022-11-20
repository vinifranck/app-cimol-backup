<template>
    <v-container>
        <v-app class="mr-7">
            <v-main class="container align-center mt-0">
                <v-toolbar flat>
                    <v-toolbar-title>Patrimônios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-row align="center">
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select :items="cursos" label="Cursos" @input="filtraCurso" />
                        </v-col>
                    </v-row>
                    <v-spacer />
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
                                <span class="headline" v-if="editedItem.id_patrimonio_item">Editar
                                    {{ editedItem.descricao }}</span>
                                <span class="headline" v-else>Inserir Item</span>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.descricao" label="Descrição" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.numero_serie" label="Num Série" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.numero_patrimonio" label="Num Patrimônio" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.item_nota_fiscal" label="Nota Fiscal" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-file-input v-model=editedItem.imagePath label="Imagem" truncate-length="10"
                                            @change="upaImagem" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.local" label="Local" />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="red accent-1" text @click="showEditDialog(item)">
                                    Cancelar
                                </v-btn>
                                <v-btn color="light-green lighten-1" text @click="salvar(editedItem, imagePath)">
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                <v-card>
                    <v-data-table :headers="headers" :items="items"
                        :footer-props="{ 'items-per-page-text': 'Itens por página' }">
                        <template v-slot:item.actions="{ item }">
                            <div class="text-truncate">
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="showEditDialog(item)">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="">
                                        mdi-shuffle-variant
                                    </v-icon>
                                </v-btn>
                                <v-btn class="mx-2" fab dark x-small color="#EF5350">
                                    <v-icon small color="white" @click="showDeleteDialog(item)">
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </div>
                        </template>
                        <template #item.imagem="{ value }">
                            <div class="text-truncate" style="width: 140px">
                                <a :href="value" target="_blank">{{ value }}</a>
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
                                <v-spacer />
                                <v-btn color="light-green lighten-1" text @click="dialogDelete = false">
                                    Fechar
                                </v-btn>
                                <v-btn color="red accent-1" text @click="deleta(itemToDelete)">
                                    Deletar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-main>
        </v-app>
    </v-container>
</template>
<script>
import axios from "axios";
import api from "../api/api";
import axiosInstance from "../api/apiInstance";

export default {
    name: "AppPatrimonio",
    mixins: [api],
    data() {
        return {
            headers: [
                { text: "ID", value: "id_patrimonio_item", name: "id" },
                { text: "Descrição", align: "start", value: "descricao", sortable: false, },
                { text: "Número de Série", value: "numero_serie", sortable: false },
                { text: "Número Patrimonio", value: "numero_patrimonio", sortable: false },
                { text: "Local", value: "local", sortable: false },
                { text: "Nota Fiscal", value: "item_nota_fiscal", sortable: false },
                { text: "Imagem", value: "imagem" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            items: [],
            dialog: false,
            editedItem: [],
            dialogDelete: false,
            itemToEdit: [],
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
            imagePath: "",


        };
    },
    computed: {
        filtraCursos() {
            axiosInstance
                .get(`/curso/patrimonio/lista/${item.id_curso}`)
                .then((response) => {
                    return this.items.filter((item) => item.profile_complete === 0);
                    this.carrega();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },
    mounted() {
        this.carrega();
    },
    methods: {
        deleta(item) {
            const url = `/curso/patrimonio/remover/${item.id_patrimonio_item}`;
            axiosInstance
                .delete(url)
                .then((res) => {
                    this.carrega();
                    this.dialogDelete = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        altera(item, imagePath) {
            const data = {
                ...item,
                imagem: imagePath
            };
            axiosInstance
                .patch(`/curso/patrimonio/alterar/${item.id_patrimonio_item}`, data)
                .then((res) => {
                    this.carrega();
                    this.dialog = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        salvar(item, imagePath) {
            console.log(item.id_patrimonio_item);
            const data = {
                ...item,
                imagem: imagePath
            };
            if(item.id_patrimonio_item) {
                this.altera(item, imagePath);
            }else{
                axiosInstance
                    .post(`/curso/patrimonio/criarPatrimonio`, data)
                    .then((res) => {
                        this.carrega();
                        this.dialog = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }  
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog;
        },
        showDeleteDialog(item) {
            this.itemToDelete = item;
            this.dialogDelete = !this.dialogDelete;
        },
        upaImagem(file) {
            let formData = new FormData();
            formData.append("upload_preset", "criijqf2");
            formData.append("folder", "cloudinary-demo");
            formData.append("file", file);
            axios
                .post("https://api.cloudinary.com/v1_1/drkpkbqdo/upload", formData)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(file)
                        let url = res.data.url;
                        this.imagePath = url;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        filtraCurso() {
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
        carrega() {
            this.items = [];
            axiosInstance
                .get("/curso/patrimonio/lista")
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        filtraCurso() {
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
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
    },
    configuration: {
        cloudName: "drkpkbqdo",
    },
};
</script>
<style scoped>
.v-main {
    flex: 0.2 0 auto;
}
</style>
