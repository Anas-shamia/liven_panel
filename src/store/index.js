import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAxios, axios);


Vue.axios.defaults.baseURL = 'http://it-team-dev.com/api';

Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
//`Bearer ${localStorage.getItem('token')}`;

Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
});
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showMeal: false,
        menuOpen: false,
        openCall: false,
    },
    mutations: {
        setMealShow(state, status) {
            state.showMeal = status
        },
        setOpenMenu: (state, item) => {
            state.menuOpen = item;
        },
        setCallOpen: (state, item) => {
            state.openCall = item;
        },
    },
    actions: {
        getMealShow({commit}, status) {
            commit('setMealShow', status)
        },
        getOpenMenu({commit}, item) {
            commit('setOpenMenu', item);
        },
        getCallOpen({commit}, item) {
            commit('setCallOpen', item);
        },
    }
})
