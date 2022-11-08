<template>
    <v-container>
        
        <v-container fluid>
            <v-row dense>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon>mdi-school</v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="cursos"
                            >
                                Cursos
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="reserve"
                            >
                                Alunos
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-col>
                <v-col>
                     <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon>mdi-book</v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="reserve"
                            >
                                Biblioteca
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon>mdi-equal-box</v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="reserve"
                            >
                                Armários
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon>mdi-equal-box</v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="reserve"
                            >
                                Patrimonio
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-list-item-icon>
                                <v-icon>mdi-calendar</v-icon>
                            </v-list-item-icon>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="h"
                            >
                                Horários
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
        export default {
            name: 'HomePage',
            components: { Loading},
            mixins: [api],
            methods: {
                cursos() {
                    this.$router.push('/cursos');
                }
            }
        }
    </script>
