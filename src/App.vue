<template>
    <v-app>
        
        <app-header v-if="$store.state.logged"/>

        <div id="content">
            <nav  v-if="$store.state.showNav">
                <app-nav v-if="$store.state.logged"/>
            </nav>
            <main>
                <v-content>
                    <router-view />
                </v-content>
            </main>    
        </div>  
        <feedback />
    </v-app>
</template>

<script>
    import apiConfig from './components/api/apiConfig';
    import AppHeader from './components/header/AppHeader.vue';
    import AppNav from './components/nav/AppNav.vue';
    import Feedback from './components/feedback/Feedback.vue';
    export default {
        name: 'App',
        components: {AppNav, AppHeader, Feedback },
        mixins: [apiConfig],
        created() {
            this.createInterceptors();
            if (window.localStorage.authToken && window.localStorage.userId && window.localStorage.userNome && window.localStorage.userEmail) {
                this.$store.commit('setAuthToken', window.localStorage.authToken);
                this.$store.commit('setUserId', window.localStorage.userId);
                this.$store.commit('setUserNome', window.localStorage.userNome);
                this.$store.commit('setUserEmail', window.localStorage.userEmail);
                this.$store.commit('setPerfil', window.localStorage.perfil);
            } else {
                this.$router.push('/login');
            }
        },
    };
</script>

<style>
    #content{
        display:flex;
    }
  
    nav{
        position:absolute;
        z-index:1;
        width:15vw;
        display:flex;
    }

    main{
        width:100vw;
        display:flex;
        margin-left:0vw;
    }
    
</style>
