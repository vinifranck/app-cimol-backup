<template>
    <header>
        <div id="logo">
            <img src="https://cimol.g12.br/images/logo-colorful.svg" />
        </div>
        <div id="title">
            <h1>ESCOLA TÉCNICA ESTADUAL MONTEIRO LOBATO</h1>
        </div>
        <div id="menu-icon">
            <v-app-bar-nav-icon @click="showMenu" ></v-app-bar-nav-icon>
        </div>
    </header>
    
</template>

<script>
    export default {
        name: 'AppHeader',
        methods: {
            showMenu(){
                if(this.$store.state.showNav){
                    this.$store.commit('setShowNav', false);
                }else{
                    this.$store.commit('setShowNav', true);
                }
            },
        },
    }
</script>

<style scoped>
*{
    color:#2062AD;
}
 
header{
    display:flex;
    width:100vw;
    height:9vh;
    background-color:#FFFAFA;
    border-bottom:2px solid #2062AD; 
    border-top:2px solid #FFD700;
    padding:1vh;
    justify-content:start;
 }
 .v-list{
    border-bottom:2px solid #FFD700; 
 }
 
 #logo{
    display:flex;
    width:20vw;
    justify-content:center;
 }
 #logo img{
    height:7vh;
 }
 #title{
    display:flex;
    width:50vw;
    justify-content:center;
    padding-top:1.5vh;
 }
 #title h1{
    display:none;
 }
 #menu-icon{
    display:flex;
    width:20vw;
    justify-content:center;
    height:6vh;
    padding-top:1vh;
 }
@media (min-width: 980px)
{
    #title h1{
        display:block;
        font-size:1.3rem
    }
}
</style>
