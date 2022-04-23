<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <div class="date__container">
        <h6>Start date</h6>
        <input
          type="date"
          class="date__input"
          :min="defaultStartDate"
          :max="defaultEndDate"
          v-model="startDate"
        />
      </div>

      <div class="date__container">
        <h6>End date</h6>
        <input
          type="date"
          :min="startDate || defaultStartDate"
          :max="defaultEndDate"
          class="date__input"
          v-model="endDate"
          :disabled="!startDate"
        />
      </div>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component
        :startDate="startDate"
        :endDate="endDate"
        @passDefaultDatetimes="initializeDefaultDatetimes"
      ></performance-chart-component>
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from '../components/vue-components/performance-chart.vue';
export default {
  name: 'AboutPageComponent',
  components: {
    PerformanceChartComponent,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      defaultStartDate: null,
      defaultEndDate: null,
    };
  },
  methods: {
    initializeDefaultDatetimes(arr) {
      this.defaultStartDate = arr[0];
      this.defaultEndDate = arr[1];
    },
  },
  watch: {
    startDate() {
      if (this.startDate > this.endDate) {
        this.endDate = null;
      }
    },
  },
};
</script>
