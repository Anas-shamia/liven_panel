import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Home.vue'
import TicketsList from '../views/tickets/index.vue'
import Tickets from '../views/tickets/details.vue'
import Comments from '../views/tickets/comments.vue'
import Statistics from '../views/tickets/statistics.vue'
import Login from '../views/Login.vue'
import Dietician from '../views/Dietician.vue'
import Advices from '../views/Advices.vue'
import SugarMeasurements from '../views/SugarMeasurements.vue'
import MealInfo from '../views/MealInfo.vue'
import Reports from '../views/Reports.vue'
import Appointments from '../views/Appointments.vue'
import Call from '../views/Call.vue'
import Test from '../views/test.vue'

Vue.use(VueRouter);

let routes;
routes = [
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
        path: '/stats/:user/statistics',
        name: 'statistics',
        meta: {layout: 'default'},
        component: Statistics,
    },
    {
        path: '/dietician',
        name: 'dietician',
        meta: {layout: 'default'},
        component: Dietician,
    },
    {
        path: '/advices',
        name: 'advices',
        meta: {layout: 'default'},
        component: Advices,
    },
    {
        path: '/:user/sugar-measurements',
        name: 'sugar',
        meta: {layout: 'default'},
        component: SugarMeasurements,
    },
    {
        path: '/:user/:meal/meal-info',
        name: 'mealInfo',
        meta: {layout: 'default'},
        component: MealInfo,
    },
    {
        path: '/:user/reports',
        name: 'reports',
        meta: {layout: 'default'},
        component: Reports,
    },
    {
        path: '/appointments',
        name: 'appointment',
        meta: {layout: 'default'},
        component: Appointments,
    },
    {
        path: '/call',
        name: 'call',
        meta: {layout: 'default'},
        component: Call,
    },
    {
        path: '/test',
        name: 'test',
        meta: {layout: 'default'},
        component: Test,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
