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
                            Dados do aluno
                        </div>
                        <v-card-actions>
                            <v-btn text>
                                EDITAR ARMÁRIO
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
        name: 'AppArmariosCursoDetalhes',
        components: { Loading, BackButton},
        mixins: [api],
        data(){
            return{
                searchOnGoing: false,
                armario: {},
               
            };
        },
        created(){
            //let sql=`/curso/armarios/${this.$route.params.id_armario}`;
            this.get(`/curso/armarios/busca/${this.$route.params.id_armario}`).then((response)=>{
                
                             
                this.armario = response.data[0];
            });
        },
    }
    let params=new URL(location.href).searchParams.get('id_armario');
</script>
