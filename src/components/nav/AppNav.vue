<template>
  <div>
    <v-navigation-drawer permanent>
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAb1BMVEUAAAD////z8/P09PTt7e39/f34+Pjh4eHn5+fs7Oz8/Pzi4uLo6Ojw8PC8vLyvr6+dnZ22trampqYqKioaGhrExMTZ2dnPz89cXFwgICBUVFSIiIiOjo5lZWV8fHwWFhZISEgLCws1NTVtbW0/Pz9X9iEdAAALXklEQVRogcUbiXbjqs6sxhjSLJOlW9pO+//feCUBNt4S26+Zp3M4syiSDAKhjYIxV1sYmslaMF57puuKaeOYgsFqk5CaeUAKQFoYgGDM1IxVQJ0oEakBYQ0gHVKaQBmQkliz2iliS5QFUxX+HX9ogIsB+UaSfGucZThypCBkhR+nlKsVQ+qA5C2ly+XD6FECW5KJ8l2lLQiw8DPlDVfCeAV8LPzUAgKHVtKJFukqGE5ZV1nlHCCJUijuiFJZpHQuUBPSccUTW6AGBAyghFGEBcbVwAXmzTIpWEdlStZDonpggrT6pAEdkaiBSFmS3hRzpSKkbCgrolSoNxO0XsBn4hI74JEvsYOfwgQZTBDXX3WQMA+bLU9af5ggThL2AC5PYhvWH74AVYuzB0rUgSK2RdhFOA9ZApcSflSGXURbrIbPNCUoqoQPjEgLg5VIBctTAbICyhYJE6zjBANbTWzDzoWlKYltXJ5G/x6H4xa0aJP+dZwgzEUEpPFWONQiqhcpHe0coG4pg/6bbdVSRv0DW6R2RN3oXw70727o39zQP6uT/usb+o+nvtBaVlp7KbSvuOYwROW1kBIQaVSIFJpLT0hNQ0ZKGlOUMlLiD5BaRkocRLla/6jiCn7AYbJofxpkvsFn6B8/08uwAlxmn4nDZ0ifIWGAkNN587Tf74/nEnZFoG4o5YCSJ8oOskBFGdrDOEFQVClpggo/k/QfT3FABv0zc96+/xQJPj6/9zUgov7p/KOK6XhE/XeWp2zPvxDe4+CC45D4p28GIdpB/6mV2H4WA7g8Me15omrZ+h5bWIGIlDCi/l2u/zrXPx6PpH/aw5y/DYUTfO0rThO0C/TPl4HQ++cJ8QCHo1rIr6N/eVf/xr1PS0d4Xar/jvab4Yd6RIQ9H26Lh21Q6ZwyZyu6bGlrLNK/39yTDvBxWqT/dETbYxoOucQhggWLSLufIR6gto3tG7Al85Cx7Z7/aP/H9e+O88QXX6ee/ssb+m/tOFxUFVxUFRiz3MDDsIjUp5nii+LT2yFbbuO9YRu2cLHMtv+1/ztbfvEtR/RfTug/fE26/9IVB58Jc8BLPsyDf88XXxRvLE0w3n+eRnP3NWwLM3H/W7r/63T/qzlbP4OTC/e/HLn/bX7/G/RDTfJi0VGVKngx4KQ48n8sOqp3D34X3nmgbNkG5xjcc4XuObnVMObqf+bRa6Gs5p1/9MaT/8sz/9cF/zfFH0vFF99+4P+G+APdQxb8X8tm6t8vnj5YoXn6d9ETx8/0zWdSFIOKCssjL8vlv7Go/8iWAjuVwjOUyUj/NsV/3RCjE/+Z5eKLTzce/6X1j/FfMLKm7O4/m/ZfibvIPa2QX5yje57bnzLuv7LZf1P+f8dRX2R7EmzkHP8fV6KRn/Qf9591McB/WSP/KjK2FNgjW4haiK0LWi+aSKiJvkKARTFUiKNkucD0t/DDIltBbCk8A9YtW4zd5tgfd/5aI//AlsSfKVEgQhYhD7DVeY344rl24/kHiD/z/MPd+IOtk//nVM/wP4MnUHW9D7h7MUwmBGhwruPTk28CW9Q/sOTEVjZsNeof4w80k4P8V+5/Vgvv3iRfBv03+a8qxG6BrQpubdG6iYMQU4sYf67Uv/Hj8adoA1MxJ/5g8z2/HA7VnPhDYzSgw4DPpIGf6FsEP90IuW7IZ7rhEFl32NIYiz8G57/8uS9tCJdZ599jFOjD8PSnb/4d/u65XXH9FsXWep6x4gO2+I9G//JW/DEVcd+Ec0f/9Uh6Jo8/m1RBN/tAyFUH4FDzXmgr+qx5E3/27b/t+J+LYo8EFznL/xT397/39nW5/I3IWbZs094P7GfGn8stwEHfyD/U/fgzhEm9CKyJP7UUd9IeQ9iyFH922Iqcraf406XzX4+d/5h/WLwAdmb+AbPBwRdp/Z/s/nMxyWwXuoBPLKWng//Do1slg++T2PrZ+Se/yAa/8Nn5BwqTQ4oheQA6rIDGRHmKo9kSJ+CjlumCz9mG25+GbfMP5Amb/P7HQMFQiSmrf9ntfPk7uaD+1f4wVtE68Y/R0YfX86OArTQ5W52xpcJCrH+R/Eb/9b38U61nhgFXPpJ/rCf0T5HYMP5QcFQUBgoKkSk8nGUFXnVFE1TVaPwR488UfzR/y6qYvfVPxgH4zLDDW05BznD969H1H9Y/B/Gvh92Es8d53NuEH0cZ65/es8h2qv5J8tsC62j8D3zOm+3baxlzGPZ0MxH0AncoBdhi87bd7gzTVbb+WXk2zbpASzhpf/hpn/bc1VQROe2M/N2wWP9oPLbLPqucpPJgvv8y/ffWH2aen7g/Tzoh30bX4HMHBoYodf6JX6915/yxnv5H6u/B/uhrT8DlpMMerurje88j+bkeE6U/99zV5z1mXybsD5nZXv4XE7XqPPR5PvZeQHgGVpRrf95fX54/Pj7+HF5eN2eqxKHl5mLkjFw8IGL+N9jfJv87df+Mm/vPM+VQLFX/YIN7mI+FPznd3UDJd6O6OdRmwv6kmyBcFSn+ZLtR8QDfJ1j/3j0SKLmy4jgVKXwZ3Ys/A+WE/3mazjh8vZ/hh2Rg8/o3N9bvPiepigOfrn/2HSXtb2d7P99O0irfem4WHMrz9baT/G31wK3r6T/dPzNuur+vT2cfjJzW+rT9/nOXZMfG/M9eoRKHnu1q/Fze3y9zY4OvWotuaQzGqP5XhZv34buvf0v1z6xIx3HoFcnmeXAWIIuHmWM81q9/Bv27Vdm+OXDRI/XPfvytVyV758FJU9G3ib85H8k/Lay0LIFrNYw/e90PYl2yaSb4prFirP6J9t/2b71fhQ0bq3/6aP9wBewjxYMRbHs/Qv8HfomKiUK04g9d/uK57uYfY/0Tb+Jw+082V/wSHFWv/tnkn2L8sTjQXwavsmf/UyUu+L/CfzxW/ovv+b+x/hTtv1iX6p4Ph6pXf7KpEqAwUbAkyF0HZ0b1l1TzaetPtP5L0xzLYS9DeJTWv1t/FasqXUvg6rv11679Nw80/gF+Ovaf4o8s/l2X6V8Cz8x04o9O/bl69PYP7UF5/bmj/+phrk8Lx6j/rP5pU/1zXaJ9ofwqa0/1Pfvz0Ms3wM507E9H/48/fpgYhpkztHhD/fMHed45vI3138b+o0f6fgmu+kb/7b+QXw3jz+gNcr6q0LcM3tl0/635B/Iv/fp3Vo1dlmRfKV83/nfQf3v/aP0v5Mvp/lt5P4r/n+HFNuJ8P/78P+i/03v7T86fzVt6e+f/8/Hyt25Y/0xfs6bOuRR2Im9sDvpvCgWTab9fg69zN/6QWfzp5bpOhyVw0PHGCdm7nv7twy/g7Vj/bRN/6nWtNvPho7T9+LPj/69rdZsPV9nrv8vLtOgBPjb+P5gqe38EKzDIP90or/wC7Hxqq4jtyVn9K/V/rmp2mQdbj/WvSmXv/wb1h5o/zAl+tcP8Y+b/pieGD1LB15PH/tve+0Nlh/VHcf+Zx3K4nHWsP/b7b9P+y/tvtr/sCXwelYn9d2XT1mWp/zbY//77S3Z8/a2N+HXZGmam+m+n+n+pYHU8bp6eNjB2m10z6D/asbuJ3J20d7ppbKT+717/bWjwD29YjYcdKOmRK/W/S68Yl4oJacFv1sxKwZTkDBCMCtOcRou0CUHDW8aBdYetSfkfE/pvp/ovlUn9N/feH1d55bR5/2Vsr/9Sxv7L5lkz6r+1v9n7T5c91KQ24fj+k1pzXKz8hRF6d3hsMu40GN9k277/nNF/48q8ih3rn2Gkzt1Q/9RlfP/VPo+903/Tyf/RG2bhWv0rmIeK1xMgOSDwBXScZFweeh7NQ+9y1mBcJbY6IpGtVN3lmdN/2x6PtIdH9c/v6b/Kn8dGtl3/q9N/5rNGMdnrIht94NqhnGIrZYftf72N/ZoxHEseAAAAAElFTkSuQmCC"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <v-list-item-content v-text="$store.state.userNome" />
            </v-list-item-title>
            <v-list-item-subtitle v-text="$store.state.userEmail" />
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i" 
            @click="navActionClick(item.action)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title  v-text="item.text"></v-list-item-title>               
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  //v-if="item.perfil.indexOf(window.localStorage.perfil)"
  import api from '../api/api';
  import Loading from '../loading/Loading.vue';
  export default {
    name: 'AppNav',
    mixins: [api],
        methods: {
            navActionClick(action) {
              if (action === "cursos") {
                this.cursos();
              } else if (action === "armarios") {
                this.armarios();
              } else if (action === "turmas") {
                this.turmas();
              } else if (action === "logout") {
                this.logout();
              }
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
            patimonios() {
                this.$router.push('/patrimonios');
            },
            logout() {
                this.$store.commit('setAuthToken', '');
                this.$store.commit('setUserId', '');
                this.$store.commit('setUserNome', '');
                //this.$store.commit('setUserEmail', '');
                this.$store.commit('setLogged', false);
                this.$router.push('/login');
                //this.$router.push('/logout');
            },
        },
    data() {
      let perfil=this.$store.state.perfil;
      let itens=new Array();
      if(perfil=='admin'){
        itens.push({ text: 'Cursos', icon: 'mdi-school', action:'cursos'});
        itens.push({ text: 'Turmas', icon: 'mdi-star', action:'turmas'});
      }else if(perfil=='admin' || perfil=='coordenador' ){
        itens.push({ text: 'Alunos', icon: 'mdi-account-multiple' , action:'alunos'});
        itens.push({ text: 'Armarios', icon: 'mdi-equal-box',  action:'armarios'});
        itens.push({ text: 'Patrimônios', icon: 'mdi-equal-box',  action:'patrimonios'});
      }else if(perfil=='admin' || perfil=='coordenador' || perfil=='professor' || perfil=='aluno'){
        itens.push({ text: 'Horarios', icon: 'mdi-border-all',  action:'horarios'});
      }
      itens.push({ text: 'Logout', icon: 'mdi-logout',  action:'logout', perfil:'admin, coordenador, professor,aluno, biblioteca'});
      return {
        selectedItem: 0,
        items: itens,
      }
    },
  }
</script>
<style>
  
</style>