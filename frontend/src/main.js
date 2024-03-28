import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';

import StartSeite from './seiten/StartSeite.vue';
import NeueAnzeige from './seiten/NeueAnzeige.vue';
import DetailAnsicht from './seiten/DetailAnsicht.vue';
import AnzeigeBearbeiten from './seiten/AnzeigeBearbeiten.vue';
import FaelleVerknuepfen from './seiten/FaelleVerknuepfen.vue'
import LogIn from './seiten/LogIn.vue';
import DatenEingabe from './components/AnzeigeErstellen/Beweismittel/DatenEingabe.vue'

import vuex from './vuex/index.js'


createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [
        { path: '/startseite', 
        component: StartSeite },

        { path: '/neue_anzeige', 
        component: NeueAnzeige },

        { path: '/detailansicht/:Aktenzeichen', 
        component: DetailAnsicht },

        { path: '/bearbeiten/:Aktenzeichen', 
        component: AnzeigeBearbeiten },

        { path: '/verknuepfen/:Aktenzeichen', 
        component: FaelleVerknuepfen },

        { path: '/beweise/:Aktenzeichen', 
        component: DatenEingabe },

        { path: '/login', 
        component: LogIn },

    ]
}))
.use(vuex)
.mount('#app')
