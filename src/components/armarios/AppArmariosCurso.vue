<template>
    <v-container>
        <h1>Armarios</h1>
        <hr/>
        <v-container fluid>
            <v-row dense>
                <v-col
                v-for="armario in armarios"
                :key="armario.id_armario"
                :cols="armario.numero"
                >
                    <v-card>
                        <v-card-title v-text="armario.numero"></v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="detalhesArmario(armario.id_curso, armario.id_armario)">
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
        name: 'AppArmariosCurso',
        components: { Loading, BackButton},
        mixins: [api],
        data() {
            return {
                searchOnGoing: false,
                armarios:[],
            };
        },
        created() {
            console.log(this.$route.params.id_curso);
            let sql=`/curso/armarios/${this.$route.params.id_curso}`;
            console.log(sql)
            this.get(`/curso/armarios/${this.$route.params.id_curso}`).then((response)=>{
                this.armarios = response.data;
            });
        },
        methods:{
            detalhesArmario(id_curso, id_armario){
               // this.$router.push("/curso/armario/"+id_curso+"/"+id_armario);
            }
        }
    }
    let params=new URL(location.href).searchParams.get('id_curso');
</script>