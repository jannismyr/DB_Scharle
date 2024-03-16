import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import StartSeite from './seiten/StartSeite.vue';
import NeueAnzeige from './seiten/NeueAnzeige.vue';
import DetailAnsicht from './seiten/DetailAnsicht.vue';
import AnzeigeBearbeiten from './seiten/AnzeigeBearbeiten.vue';

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [
        { path: '/startseite', 
        component: StartSeite },

        { path: '/neue_anzeige', 
        component: NeueAnzeige },

        { path: '/detailansicht', 
        component: DetailAnsicht },

        { path: '/bearbeiten', 
        component: AnzeigeBearbeiten },

    ]
}))
.mount('#app')
