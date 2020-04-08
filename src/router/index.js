import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Home.vue'
import TicketsList from '../views/tickets/index.vue'
import Tickets from '../views/tickets/details.vue'
import Comments from '../views/tickets/comments.vue'
import Statistics from '../views/tickets/statistics.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/users',
        name: 'Users',
        meta: {layout: 'default'},
        component: Users,
    },
    {
        path: '/login',
        name: 'Login',
        meta: {layout: 'auth'},
        component: Login
    },
    {
        path: '/:user/details',
        name: 'ticketsDetails',
        meta: {layout: 'default'},
        component: Tickets,
    },
    {
        path: '/tickets',
        name: 'tickets',
        meta: {layout: 'default'},
        component: TicketsList,
    },
    {
        path: '/tickets/:user/:id/comments',
        name: 'comments',
        meta: {layout: 'default'},
        component: Comments,
    },
    {
        path: '/tickets/:user/statistics',
        name: 'statistics',
        meta: {layout: 'default'},
        component: Statistics,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
