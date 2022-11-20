<template>
    <v-container>
        <h1>Armarios</h1>
        <hr>
        <v-container fluid>
            <v-row dense>
                <v-col
                    v-for="armario in armarios"
                    :key="armario.id_armario"
                    :color="armario.cor"
                >
                    <v-card color="armario.cor">
                        <v-card-title v-text="armario.numero" />
                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                text
                                @click="detalhesArmario(armario.id_armario)"
                            >
                                Ver mais ...
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
        name: 'AppArmariosCurso',
        components: { Loading, BackButton },
        mixins: [api],
        data() {
            return {
                searchOnGoing: false,
                armarios: [],
            };
        },
        created() {
            console.log(this.$route.params.id_curso);
            const sql = `/curso/armarios/${this.$route.params.id_curso}`;

            this.get(`/curso/armarios/${this.$route.params.id_curso}`).then((response) => {
                this.armarios = response.data;
            });
        },
        methods: {
            detalhesArmario(id_armario) {
                this.$router.push(`/curso/armario/${this.$route.params.id_curso}/${id_armario}`);
            },
        },
    };
    const params = new URL(location.href).searchParams.get('id_curso');
</script>

<style>
    .v-col{
        display:grid;
        row-gap: 10px;
        grid-template-columns:auto auto auto auto auto auto;
    }

</style>
