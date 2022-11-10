<template>
    <div>
    </div>
</template>

    
    <script>
        import api from '../api/api';
        import Loading from '../loading/Loading.vue';
        export default {
            name: 'HomePage',
            components: { Loading},
            mixins: [api],
        }
    </script>
