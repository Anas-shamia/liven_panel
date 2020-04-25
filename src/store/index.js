import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

//https://developer.edamam.com/edamam-recipe-api-demo
//https://api.edamam.com/api/food-database/parser?ingr=rice&app_id=691cdfff&app_key=85704859d9ba587b4181bb4d6af9215e

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = 'https://it-team-dev.com/api';

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
        token: null,
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
        setToken: (state, item) => {
            state.token = item;
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
        getToken({commit}, item) {
            commit('setToken', item);
        },
    }
})
