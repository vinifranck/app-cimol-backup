import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './components/home/HomePage.vue';
import LoginPage from './components/login/LoginPage.vue';
import SetPerfilPage from './components/login/SetPerfilPage.vue';
import Cursos from './components/curso/AppCursos.vue';
import CursosDetalhes from './components/curso/AppCursosDetalhes.vue';
import BookEntryPage from './components/book/BookEntryPage.vue';
import LibraryListpage from './components/library/LibraryListPage.vue';
import LibraryEntryPage from './components/library/LibraryEntryPage.vue';

Vue.use(Router);

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/setperfil', name: 'setperfil', component: SetPerfilPage },
    { path: '/cursos', name: 'cursos', component: Cursos },
    { path: '/curso/:id_curso', name: 'cursosDetalhes', component: CursosDetalhes },
    { path: '/book/:id', name: 'bookEntry', component: BookEntryPage },
    { path: '/library', name: 'libraryList', component: LibraryListpage },
    { path: '/library/:id', name: 'libraryEntry', component: LibraryEntryPage },
];

export default new Router({
    routes,
});
