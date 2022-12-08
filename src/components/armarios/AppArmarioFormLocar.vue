<template>
    <v-container fluid>
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          
          <v-select
            v-model="aluno"
            :items="alunos"
            item-text="nome"
            item-value="id_aluno"
            label="Aluno"
            persistent-hint
            return-object
            single-line
          ></v-select>
          
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="dataPrevDevolucao"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dataPrevDevolucao"
              label="Data de devolução"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
              </template>
                  <v-date-picker
                      v-model="dataPrevDevolucao"
                      scrollable
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                  >
                      Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(dataPrevDevolucao)"
                  >
                      OK
                  </v-btn>
              </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-card-actions>
                  <v-btn text @click="locarArmario(aluno, idArmario, dataPrevDevolucao)">
                      LOCAR
                  </v-btn>
              </v-card-actions>
  
          </v-col>
      </v-row>
     </v-container>
  </template>
  <script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
   
    export default {
      name: 'AppArmariosFormAluno',
      components: {},
      mixins: [api],
      props:{
          idCurso: Number,
          idArmario: Number,
      },
      data(){
          return {
              searchOnGoing: false,
              alunos: [],
              aluno: '',
              dataPrevDevolucao: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              modal: false,
              
  
          }
      },
      created() {
          this.get(`/aluno/lista/?idCurso=${this.idCurso}`).then((response)=>{
              console.log(response.data);
              this.alunos = response.data;
          });
      },
      methods:{
              locarArmario(aluno, idArmario, dataPrevDevolucao){         
                      this.post(`/curso/armarios/locar/${this.idCurso}`,{id_armario: idArmario, id_aluno:aluno.id_aluno, data_previsao_devolucao: dataPrevDevolucao});
                      this.$router.push("/curso/armarios/"+this.idCurso);
                  },
              },
    }
  
  
  
  </script>