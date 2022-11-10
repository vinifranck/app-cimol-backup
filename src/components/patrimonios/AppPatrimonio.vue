<template>
    <v-data-table
        :headers="headers"
        :items="listaPatrimonios"
        class="mt-5 mr-7 ml-2 elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Patrimônios</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="cyan" dark class="mb-2" v-bind="attrs" v-on="on">
                            Novo Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ tituloForm }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.descricao"
                                            label="Descrição"
                                        >
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
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.local"
                                                label="Local"
                                            ></v-text-field>
                                        </v-col>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-file-input @change="Preview_image" v-model="editedItem.imagem">
                                        </v-file-input>
                                        <v-img :src="url"></v-img>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red accent-1" text @click="close"> Cancelar </v-btn>
                            <v-btn color="light-green lighten-1" text @click="salvar">
                                Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5 .align-self-center"
                            >Tem certeza que deseja deletar este item?
                        </v-card-title>
                        <v-card-text class="text-h5" color="red darken--1">
                            (Esta ação não poderá ser desfeita!)
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn class="mx-2" fab dark x-small color="cyan"
                ><v-icon small @click="editItem(item)"> mdi-pen </v-icon></v-btn
            >
            <v-btn class="mx-2" fab dark x-small color="#EF5350"
                ><v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reiniciar </v-btn>
        </template>
    </v-data-table>
</template>
<script>
const axios = require("axios");
import api from "../api/api";
import axiosInstance from "../api/apiInstance";
import BackButton from "../navigation/BackButton.vue";

export default {
    mixins: [api],
    name: "appPatrimonio",
    data: () => ({
        headers: [
            { text: "Descrição", align: "start", value: "descricao", sortable: false },
            { text: "Número de Série", value: "numero_serie", sortable: false },
            { text: "Número Patrimonio", value: "numero_patrimonio", sortable: false },
            { text: "Local", value: "local", sortable: false },
            { text: "Nota Fiscal", value: "item_nota_fiscal", sortable: false },
            { text: "Imagem", value: "imagem", sortable: false },
            { text: "Ações", value: "actions", sortable: false },
        ],
        dialog: false,
        dialogDelete: false,
        listaPatrimonios: [],
        editedIndex: -1,
        editedItem: {},
        url: null,
        imagem: null,
        itemPadrao: {
            descricao: "",
            numero_serie: "",
            numero_patrimonio: "",
            item_nota_fiscal: "",
            local: "",
            //imagem: null,
        },
        empty:'O Campo não pode estar vazio!',
    }),

    computed: {
        tituloForm() {
            return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
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

    created() {
        axiosInstance
            .get(`/curso/patrimonio/lista`)
            .then((response) => {
                this.listaPatrimonios = response.data;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        this.close();
    },

    methods: {
        initialize() {
            this.listaPatrimonios = [
                {
                    descricao: "",
                    noSerie: "",
                    noPatrimonio: "",
                    notaFiscal: "",
                    local: "",
                    imagem: "",
                },
            ];
        },
        Preview_image() {
            this.url = URL.createObjectURL(this.imagem);
        },
        salvar(item) {
            let method = "post"
            let url = `/curso/patrimonio/criarPatrimonio`
            let id = item.id
            let data = {
            fields: item
        }
        
        },
    },
    editItem(item) {
        this.editedIndex = this.listaPatrimonios.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
    },

    deleteItem(item) {
        this.editedIndex = this.listaPatrimonios.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
    },

    deleteItemConfirm() {
        this.listaPatrimonios.splice(this.editedIndex, 1);
        this.closeDelete();
    },

    close() {
        this.dialog = false;
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.itemPadrao);
            this.editedIndex = -1;
        });
    },

    closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.itemPadrao);
            this.editedIndex = -1;
        });
    },

    salvaaaar() {
        if (this.editedIndex > -1) {
            Object.assign(this.listaPatrimonios[this.editedIndex], this.editedItem);
        } else {
            this.listaPatrimonios.push(this.editedItem);
        }
        this.close();
    },
};
</script>
<!--if (this.editedIndex > -1) {
this.editedIndex = this.listaPatrimonios.indexOf(item);
    axiosInstance
        .post("/curso/patrimonio/criarPatrimonio", {
            descricao: this.descricao,
            numero_serie: this.noSerie,
            numero_patrimonio: this.noPatrimonio,
            item_nota_fiscal: this.notaFiscal,
            local: this.local,
            imagem: this.imagem,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    Object.assign(this.listaPatrimonios[this.editedIndex], this.editedItem);
} else {
    axiosInstance.put(
        `/curso/patrimonio/${this.$route.params.id_curso}/${this.$route.params.id_patrimonio}`,
        {
            descricao: this.descricao,
            numero_serie: this.noSerie,
            numero_patrimonio: this.noPatrimonio,
            item_nota_fiscal: this.notaFiscal,
            local: this.local,
            imagem: this.imagem,
        }
    );
    this.listaPatrimonios.push(this.editedItem);
}
this.close();-->
