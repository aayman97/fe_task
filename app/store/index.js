import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
// Create a new store instance.

export default new Vuex.Store({
  state: {
    chartData: null,
  },
  actions: {
    setChartData({ commit }) {
      axios.get('https://fe-task.getsandbox.com/performance').then((res) => {
        commit('setChartData', res.data);
      });
    },
  },
  mutations: {
    setChartData(state, payload) {
      state.chartData = payload;
    },
  },
  getters: {
    getChartData(state) {
      return state.chartData;
    },
  },
});
