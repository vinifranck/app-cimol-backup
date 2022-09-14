<template>
    <v-container>
        <h1>Cursos</h1>
        <v-container fluid>
            <v-row dense>
                <v-col
                v-for="curso in cursos"
                :key="curso.id_curso"
                :cols="curso.nome"
                >
                    <v-card>
                        <v-card-title v-text="curso.nome"></v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="detalhesCurso(curso.id_curso)">
                                Ver mais ...
                            </v-btn>
                        </v-card-actions>
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
        name: 'LibraryList',
        components: { Loading, BackButton},
        mixins: [api],
        data() {
            return {
                searchOnGoing: false,
                cursos:[],
            };
        },
        created() {
                this.get('/curso').then((response)=>{
                console.log(response.data)
                this.cursos = response.data;
            });
        },
        methods:{
            detalhesCurso(id_curso){
                this.$router.push("/curso/"+id_curso);
            }
        }
    }
    console.log(window.localStorage.perfil);

</script>