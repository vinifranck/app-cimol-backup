<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
    />
</template>
<script>
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
    import BackButton from '../navigation/BackButton.vue';

    export default {
        name: 'AppAlunos',
    };
</script>
