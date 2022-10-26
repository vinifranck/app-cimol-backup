import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/home/HomePage.vue';
import LoginPage from './components/login/LoginPage.vue';
import LogoutPage from './components/login/LogoutPage.vue';
import SetPerfilPage from './components/login/SetPerfilPage.vue';
import Cursos from './components/curso/AppCursos.vue';
import CursosDetalhes from './components/curso/AppCursosDetalhes.vue';
import ArmariosCurso from './components/armarios/AppArmariosCurso.vue';

Vue.use(Router);

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/logout', name: 'logout', component: LogoutPage },
    { path: '/setperfil', name: 'setperfil', component: SetPerfilPage },
    { path: '/cursos', name: 'cursos', component: Cursos },
    { path: '/curso/:id_curso', name: 'cursosDetalhes', component: CursosDetalhes },
    { path: '/curso/armarios/:id_curso', name: 'armariosCurso', component: ArmariosCurso },
];

export default new Router({
    routes,
});

