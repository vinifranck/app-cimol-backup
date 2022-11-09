<template>
    
    <v-container>
        <h1>Detalhes dos armários</h1>
        <v-container fluid>
            <v-row dense>
                <v-col>
                    <v-card>
                        <v-card-title>
                        </v-card-title>
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
        
    }
    let params=new URL(location.href).searchParams.get('id_curso');
</script>
