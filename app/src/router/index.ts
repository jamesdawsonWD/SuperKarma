import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Trade from '../views/Trade.vue';
import Map from '../views/Map.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Trade',
        component: Trade,
        meta: {
            title: 'Home Page - Example App',
            metaTags: [
                {
                    name: 'description',
                    content: 'The home page of our example app.'
                },
                {
                    property: 'og:description',
                    content: 'The home page of our example app.'
                }
            ]
        }
    },
    {
        path: '/map',
        name: 'Map',
        component: Map,
        meta: {
            title: 'Home Page - Example App'
        }
    },


];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router;
