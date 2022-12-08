<template>
    <v-container>
        <v-app class="mr-7">
            <v-main class="container align-center mt-0">
                <v-toolbar flat>
                    <v-toolbar-title>Patrimônios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-text-field
                        v-model="textSearch"
                        append-icon="mdi-magnify"
                        label="Pesquisar"
                        @change="carrega()"
                        single-line
                        hide-details
                    />
                    <v-row align="center"> </v-row>
                    <v-spacer />
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <div class="d-flex">
                                <v-btn color="cyan" dark class="ml-auto ma-3" v-on="on">
                                    Novo Item
                                </v-btn>
                            </div>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline" v-if="editedItem.id_patrimonio_item"
                                    >Editar {{ editedItem.descricao }}</span
                                >
                                <span class="headline" v-else>Inserir Item</span>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.descricao"
                                            label="Descrição"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.numero_serie"
                                            label="Num Série"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.numero_patrimonio"
                                            label="Num Patrimônio"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.item_nota_fiscal"
                                            label="Nota Fiscal"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="4">
                                        <v-file-input
                                            v-model="editedItem.imagePath"
                                            label="Imagem"
                                            truncate-length="10"
                                            @change="upaImagem"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="4">
                                        <v-text-field v-model="editedItem.local" label="Local" />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="4">
                                        <v-text-field
                                            v-model="editedItem.codigo_barra"
                                            label="Cod Barra"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="red accent-1" text @click="showEditDialog(item)">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    color="light-green lighten-1"
                                    text
                                    @click="salvar(editedItem, imagePath)"
                                >
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                <v-card>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        :footer-props="{ 'items-per-page-text': 'Itens por página' }"
                    >
                        <template v-slot:item.actions="{ item }">
                            <div class="text-truncate">
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="showEditDialog(item)">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="showMovimentDialog(item)">
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
                                <strong class="red--text text--lighten-1"
                                    >(Esta ação não poderá ser desfeita!)</strong
                                >
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                    color="light-green lighten-1"
                                    text
                                    @click="dialogDelete = false"
                                >
                                    Fechar
                                </v-btn>
                                <v-btn color="red accent-1" text @click="deleta(itemToDelete)">
                                    Deletar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogMoviment" max-width="800px">
                        <v-card>
                            <template v-slot:activator="{ on }">
                                <div class="d-flex" v-on="on"></div>
                            </template>
                            <v-card-title> <span class="headline">Movimentar</span></v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="10" sm="6" md="4">
                                        <v-text-field
                                            v-model="itemToMoviment.desc"
                                            :rules="regra"
                                            label="Descrição"
                                        />
                                    </v-col>
                                    <v-col cols="10" sm="6" md="4">
                                        <v-menu
                                            ref="menu1"
                                            v-model="menu1"
                                            :close-on-content-click="false"
                                            :rules="regra"
                                            transition="scale-transition"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="dateFormatted"
                                                    readonly
                                                    label="Data"
                                                    persistent-hint
                                                    v-bind="attrs"
                                                    @blur="date = parseDate(dateFormatted)"
                                                    v-on="on"
                                                >
                                                </v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date"
                                                no-title
                                                @input="menu1 = false"
                                            >
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="10" sm="6" md="4">
                                        <v-select
                                            v-model="
                                                itemToMoviment.patrimonio_tipo_movimento_id_patrimonio_tipo_movimento
                                            "
                                            :items="tiposMovimentacao"
                                            label="Tipo Movimentação"
                                            :rules="regra"
                                        />
                                    </v-col>
                                    <v-col cols="10" sm="6" md="4">
                                        <v-select
                                            v-model="itemToMoviment.categoria"
                                            :items="categoriaPat"
                                            label="Categoria"
                                            :rules="regra"
                                        />
                                    </v-col>
                                    <v-col cols="10" sm="4" md="4">
                                        <v-text-field
                                            v-model="itemToMoviment.id_patrimonio_item"
                                            :rules="regra"
                                            label="ID"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="red accent-1" text @click="dialogMoviment = false">
                                    Fechar
                                </v-btn>
                                <v-btn
                                    color="light-green lighten-1"
                                    text
                                    :rules="regra"
                                    @click="movimenta(itemToMoviment)"
                                >
                                    Movimentar
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
                { text: "Descrição", align: "start", value: "descricao", sortable: false },
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
            textSearch: "",
            dialogMoviment: false,
            itemToEdit: [],
            itemToMoviment: [],
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
            dateFormatted: "",
            itemToDelete: [],
            imagePath: "",
            menu1: false,
            regra: [(v) => !!v || "Campo obrigatório"],
            tiposMovimentacao: [
                { text: "Realocação", value: "1" },
                { text: "Descarte", value: "2" },
                { text: "Manutenção", value: "3" },
                { text: "Entrada", value: "4" },
                { text: "Empréstimo", value: "5" },
                { text: "Desmonte", value: "6" },
            ],
            categoriaPat: [],
            seleciona: null,
        };
    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
    },
    mounted(){
        this.carrega();
        this.categoriaPatrimonio();
    },
    methods: {
        deleta(item) {
            const url = `/curso/patrimonio/remover/${item.id_patrimonio_item}`;
            this
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
                imagem: imagePath,
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
                imagem: imagePath,
            };
            if (item.id_patrimonio_item) {
                this.altera(item, imagePath);
            } else {
                this
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
        categoriaPatrimonio(){
            this.categoriaPat = [];
            this
                .get(`/curso/patrimonio/categoria`)
                .then((res) => {
                    console.log(res);
                    this.categoriaPat = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        movimenta(item) {
            const data = {
                ...item,
                date: this.dateFormatted,
            };
            this
                .post(`/curso/patrimonio/movimentacao/${item.id_patrimonio_item}`, data)
                .then((res) => {
                    this.movimentos();
                    this.dialogMoviment = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog;
        },
        showDeleteDialog(item) {
            this.itemToDelete = item;
            this.dialogDelete = !this.dialogDelete;
        },
        showMovimentDialog(item) {
            this.itemToMoviment = item || {};
            this.dialogMoviment = !this.dialogMoviment;

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
                        console.log(file);
                        let url = res.data.url;
                        this.imagePath = url;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        movimentos() {
            this.$router.push(`/patrimonios/movimentos`);
        },
        carrega() {
            this.items = [];
            if (this.textSearch) {
                this.get(`/curso/patrimonio/buscar/${this.textSearch}`).then((response) => {
                    console.log(response);
                    this.items = response.data.patrimonio;
                });
            }else{
            this
                .get("/curso/patrimonio/lista")
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        carregaMov() {
            this.items = [];
            this
                .get("/curso/patrimonio/movimentacao")
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;
            const [month, day, year] = date;
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
}
};
</script>
<style scoped>
.v-main{
    flex: 0.2 0 auto;
}
</style>