<template>
    <v-container>
        
        <v-container fluid>
            <v-row dense>
                <v-col v-for="(item, i) in items"
                     :key="i" 
                    @click="homeActionClick(item.action)">
                    <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                v-text="item.text"
                            >                                
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
            name: 'HomePage',
            components: { Loading
                , BackButton
            },
            mixins: [api],
            
            methods: {
            homeActionClick(action) {
              if (action === "home") {
                this.home();
              } else if (action === "cursos") {
                this.cursos();
              } else if (action === "armarios") {
                this.armarios();
              } else if (action === "turmas") {
                this.turmas();
              } else if (action === "logout") {
                this.logout();
              } else if (action === "biblioteca") {
                this.biblioteca();
              } else if (action === "patrimonios") {
                this.patrimonios();
              }
              this.$store.commit('setShowNav', false);
              
            },
            home() {
                this.$router.push('/');
            },
            armarios() {
                let id_curso=null;
                this.get(`/curso/coordenador/${this.$store.state.userId}`).then((response)=>{
                  console.log(response.data);
                  id_curso = response.data.id_curso;
                  console.log(id_curso);
                  this.$router.push('/curso/armarios/'+id_curso);
                });
                //this.$router.push('/curso/armarios/'+id_curso);
            },
            cursos() {
                this.$router.push('/cursos');
            },
            turmas() {
                this.$router.push('/turmas');
            },
            patrimonios() {
                this.$router.push('/patrimonios');
            },
            biblioteca() {
                this.$router.push('/biblioteca');
            }
        },
            data() {
                let perfil=this.$store.state.perfil;
                let itens=new Array();
                itens.push({ text: 'Biblioteca', icon: 'mdi-book',  action:'biblioteca'});
                if(perfil=='admin'){
                    itens.push({ text: 'Cursos', icon: 'mdi-school', action:'cursos'});
                    itens.push({ text: 'Turmas', icon: 'mdi-star', action:'turmas'});
                }
                if(perfil=='admin' || perfil=='coordenador' ){
                    itens.push({ text: 'Alunos', icon: 'mdi-account-multiple' , action:'alunos'});
                    itens.push({ text: 'Armarios', icon: 'mdi-equal-box',  action:'armarios'});
                    itens.push({ text: 'Patrimônios', icon: 'mdi-bank',  action:'patrimonios'});
                     itens.push({ text: 'Horarios', icon: 'mdi-border-all',  action:'horarios'});
                }
                if(perfil=='admin' || perfil=='coordenador' || perfil=='professor' || perfil=='aluno'){
                    itens.push({ text: 'Horarios', icon: 'mdi-border-all',  action:'horarios'});
                }
                if(perfil=='biblioteca'){
                    itens.push({ text: 'biblioteca', icon: 'mdi-border-all',  action:'biblioteca'});
                }
                return {
                    selectedItem: 0,
                    items: itens,
                }
            },
        }
    </script>
