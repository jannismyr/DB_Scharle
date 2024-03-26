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
import TestAll from './seiten/TestAll.vue';

import DatenEingabe from './components/AnzeigeErstellen/TatartspezifischeComps/DatenEingabe.vue'

import vuex from './vuex/index.js'


createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(process.env.BASE_URL),
    routes: [
        { path: '/startseite', 
        component: StartSeite },

        { path: '/neue_anzeige', 
        component: NeueAnzeige,
        children: [
            {
                path:':Tat',
                component: DatenEingabe
            }
        ] },

        { path: '/detailansicht/:Aktenzeichen', 
        component: DetailAnsicht },

        { path: '/bearbeiten/:Aktenzeichen', 
        component: AnzeigeBearbeiten },

        { path: '/verknuepfen/:Aktenzeichen', 
        component: FaelleVerknuepfen },

        { path: '/login', 
        component: LogIn },
        
        { path: '/test', 
        component: TestAll },

    ]
}))
.use(vuex)
.mount('#app')
