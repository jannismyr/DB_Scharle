import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import StartSeite from './seiten/StartSeite.vue';

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [
        { path: '/startseite', 
        component: StartSeite },
    ]
}))
.mount('#app')
