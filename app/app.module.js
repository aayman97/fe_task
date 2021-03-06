import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import store from './store/index';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';

angular
  .module('appModule', ['ui.router', 'ngVue', 'ngVue.plugins'])
  .config(($ngVueProvider) => {
    $ngVueProvider.setRootVueInstanceProps({
      store: store,
    });
  });

angular
  .module('appModule')
  .directive('vPerformancePage', (createVueComponent) => {
    return createVueComponent(
      Vue.component('performancePageComponent', PerformancePageComponent)
    );
  });

angular
  .module('appModule')
  .directive('vPerformanceChart', (createVueComponent) => {
    return createVueComponent(
      Vue.component('performanceChartComponent', PerformanceChartComponent)
    );
  });
