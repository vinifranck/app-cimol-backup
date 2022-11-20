<template>
    <v-container>
        <h1>Detalhes dos armários</h1>
        <v-container fluid>
            <v-row dense>
                <v-col>
                    <v-card>
                        <div class="text-overline mb-4">
                            {{ armario.txLocado }}
                        </div>


                        <v-card-title>
                            Armário {{ armario.numero }}
                        </v-card-title>

                        <v-list-item-subtitle>{{ armario.local }}</v-list-item-subtitle>
                        <hr>
                        <div v-if="armario.locado>0">
                            Dados do aluno
                            <p>{{ armario.aluno.nome }}</p>
                        </div>
                        <v-card-actions>
                            <v-btn
                                v-if="armario.locado>0"
                                text
                                @click="devolverArmario(armario.id_armario, armario.aluno.id_aluno)"
                            >
                                DEVOLVER
                            </v-btn>
                            <v-btn
                                v-if="armario.locado===0"
                                text
                            >
                                LOCAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <back-button />
    </v-container>
</template>

<script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
    import BackButton from '../navigation/BackButton.vue';

    export default {
        name: 'AppArmariosCursoDetalhes',
        components: { Loading, BackButton },
        mixins: [api],
        data() {
            return {
                searchOnGoing: false,
                armario: {},

            };
        },

        created() {
            // let sql=`/curso/armarios/${this.$route.params.id_armario}`;
            this.get(`/curso/armarios/busca/${this.$route.params.id_armario}`).then((response) => {
                this.armario = response.data[0];
            });
        },
        methods: {
            devolverArmario(id_armario, id_aluno) {
                this.post(`/curso/armarios/devolver/${id_armario}`, { id_armario, id_aluno });
                this.$router.push(`/curso/armarios/${this.$route.params.id_curso}/${id_armario}`);
            },
        },
    };
    const params = new URL(location.href).searchParams.get('id_armario');
</script>
