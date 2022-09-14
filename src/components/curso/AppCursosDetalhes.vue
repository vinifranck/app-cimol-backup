<template>
    <v-container>
        <h1>Cursos</h1>
        <h2>Detalhes</h2>
        <v-container fluid>
            <v-row dense>
                <v-col>
                    <v-card>
                        <v-card-title>{{curso.nome}} ({{curso.numero}})</v-card-title>
                        <v-card-subtitle>
                            Coordenador(a): {{curso.nomeCoordenador}}
                        </v-card-subtitle>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
        <back-button/>
    </v-container>


</template>
<script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
    import BackButton from '../navigation/BackButton.vue';
    export default {
        name: 'AppCursoDetalhes',
        components: { Loading, BackButton},
        mixins: [api],
        data() {
            return {
                searchOnGoing: false,
                curso:{},
            };
        },
        created() {
            let sql=`/curso/${this.$route.params.id_curso}`;
            this.get(`/curso/${this.$route.params.id_curso}`).then((response)=>{
                this.curso = response.data;
            });
        },
    }
    let params=new URL(location.href).searchParams.get('id_curso');
</script>