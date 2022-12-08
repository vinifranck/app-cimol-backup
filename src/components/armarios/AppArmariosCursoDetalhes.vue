<template>
    
    <v-container>
        <h1>Detalhes dos armários</h1>
        <v-container fluid>
            <v-row dense>
                <v-col>
                    <v-card>

                        <div class="text-overline mb-4">
                            {{armario.txLocado}}
                        </div>
                        
                        

                        
                        <v-card-title>Armário {{armario.numero}}
                            
                        </v-card-title>
                         
                        <v-list-item-subtitle>{{armario.local}}</v-list-item-subtitle>
                         <hr/>
                        <div v-if="armario.locado>0">
                            <h3>Nome do Aluno</h3>
                            <p>{{armario.aluno.nome}}</p>
                            <h3>Locado em</h3>
                            <p>{{armario.dataLocacao}}</p>
                            <h3>Devolver em</h3>
                            <p>{{armario.dataPrevDevolucao}}</p>
                        </div>
                        
                        <v-card-actions>
                            <v-btn text v-if="armario.locado>0" @click="devolverArmario(armario.id_armario, armario.aluno.id_aluno)" >
                                DEVOLVER
                            </v-btn>
                            
                        </v-card-actions>
                        <app-armarios-form-locar :idCurso="idCurso" :idArmario="armario.id_armario" v-if="armario.locado===0"/>
                        

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
    import AppArmariosFormLocar from './AppArmariosFormLocar.vue';
    

    export default {
        name: 'AppArmariosCursoDetalhes',
        components: { Loading, BackButton, AppArmariosFormLocar},
        mixins: [api],
        data(){
            return{
                searchOnGoing: false,
                armario: {},
                idCurso:parseInt(this.$route.params.id_curso),
               
            };
        },
        methods:{
            devolverArmario(id_armario, id_aluno){                
                    this.post(`/curso/armarios/devolver/${id_armario}`,{id_armario: id_armario, id_aluno:id_aluno  });
                    this.$router.push("/curso/armarios/"+this.$route.params.id_curso);
                },
            },
        
        created(){
            //let sql=`/curso/armarios/${this.$route.params.id_armario}`;
            this.get(`/curso/armarios/busca/${this.$route.params.id_armario}`).then((response)=>{
                console.log(response.data[0]);
                             
                this.armario = response.data[0];
            });
        },
    }
    let params=new URL(location.href).searchParams.get('id_armario');
</script>