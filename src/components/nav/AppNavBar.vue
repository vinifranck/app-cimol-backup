<template>
  <v-card
    class="mx-auto overflow-hidden"
    width="90vw"
  >
    <v-system-bar color="deep-purple darken-3"></v-system-bar>

    <v-app-bar
      color="deep-purple accent-4"
      dark
      prominent
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-item>CIMOL</v-item>
        <v-btn icon>
            <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="Cursos ">Cursos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Turmas</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>horários</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Armários</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Biblioteca</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="logout">Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </v-card>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    methods: {
            Cursos() {
                this.$router.push('/cursos');
            },
            Turmas() {
                this.$router.push('/turmas');
            },
            logout() {
                console.log("nsfaklgnaks")
                this.$store.commit('setAuthToken', '');
                window.localStorage.authToken=false;
                this.$store.commit('setUserId', '');
                this.$store.commit('setUserNome', '');
                this.$store.commit('setUserEmail', '');
                this.$store.commit('setUserPerfils', '');
                window.localStorage.userPerfils=false;
                this.$store.commit('setLogged', false);
                window.localStorage.logged=false;
                this.$router.push('/'); 
            },
        },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>