import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/home/HomePage.vue';
import LoginPage from './components/login/LoginPage.vue';
import LogoutPage from './components/login/LogoutPage.vue';
import SetPerfilPage from './components/login/SetPerfilPage.vue';
import Cursos from './components/curso/AppCursos.vue';
import CursosDetalhes from './components/curso/AppCursosDetalhes.vue';
import ArmariosCurso from './components/armarios/AppArmariosCurso.vue';
<<<<<<< HEAD
import Movimento from './components/patrimonios/AppPatrimoniosMovimento.vue';
import Patrimonios from './components/patrimonios/AppPatrimonios.vue';
=======
import ArmariosCursoDetalhes from './components/armarios/AppArmariosCursoDetalhes.vue';
import Alunos from './components/alunos/AppAlunos.vue';
>>>>>>> 442e6f777c7eab78ce98d5607b970b7fa29d0a4e

Vue.use(Router);


const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/logout', name: 'logout', component: LogoutPage },
    { path: '/setperfil', name: 'setperfil', component: SetPerfilPage },
    { path: '/cursos', name: 'cursos', component: Cursos },
    { path: '/curso/:id_curso', name: 'cursosDetalhes', component: CursosDetalhes },
    { path: '/curso/armarios/:id_curso', name: 'armariosCurso', component: ArmariosCurso },
<<<<<<< HEAD
    { path: '/patrimonio', name: 'patrimonios', component: Patrimonios },
    { path: '/patrimonios/movimentos', name: 'movimentos', component: Movimento },
=======
    { path: '/curso/armario/:id_curso/:id_armario', name: 'armariosCursoDetalhes', component: ArmariosCursoDetalhes},
    { path: '/alunos', name: 'alunos', component: Alunos },
>>>>>>> 442e6f777c7eab78ce98d5607b970b7fa29d0a4e
];

export default new Router({
    routes,
});
