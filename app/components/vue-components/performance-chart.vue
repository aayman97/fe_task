<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
    <div class="c-dashboard__titleContainer">
      <h1 class="c-dashboard__title">{{ xlabel }}</h1>
    </div>
    <h1 class="c-dashboard__title"></h1>
  </div>
</template>

<script>
import moment from 'moment';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import 'echarts/lib/component/legend';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
const filterData = require('./filterDataFunction');

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: 'PerformanceChartComponent',
  props: {
    startDate: String,
    endDate: String,
  },
  components: {
    VChart,
  },
  data() {
    return {
      xlabel: 'HomePage',
    };
  },
  created() {
    this.$store.dispatch('setChartData');
  },
  computed: {
    initOptions() {
      return {
        width: 'auto',
        height: '300px',
      };
    },
    chartOptions() {
      return {
        title: {
          text: 'Team Performance Index',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 10,
          className: 'toolTip',
          textStyle: {
            color: 'white',
          },
        },

        grid: {
          left: '30px',
          right: '12px',
          bottom: '2px',
          top: '6px',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: '#FD0100',
            },
            {
              gt: 50,
              lte: 80,
              color: '#FBDB0F',
            },
            {
              gt: 80,
              lte: 100,
              color: '#00aa00',
            },
          ],
          outOfRange: {
            color: '#999',
          },
        },
        series: [
          {
            data: this.yAxisData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 2,
            name: 'Team Performance Index :',
            cursor: 'default',
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
    },

    xAxisData() {
      return filterData.filterData(
        this.$store.getters.getChartData,
        this.endDate,
        this.startDate
      );
    },
    yAxisData() {
      return (
        this.$store.getters.getChartData &&
        this.$store.getters.getChartData.map((item) =>
          Math.round(item.performance * 100)
        )
      );
    },
  },
  watch: {
    '$store.getters.getchartData'(val) {
      if (val) {
        this.$emit('passDefaultDatetimes', [
          moment(this.$store.getters.getChartData[0].date_ms).format(
            'YYYY-MM-DD'
          ),
          moment(
            this.$store.getters.getChartData[
              this.$store.getters.getChartData.length - 1
            ].date_ms
          ).format('YYYY-MM-DD'),
        ]);
      }
    },
  },
  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format('DD MMM YYYY');
    },
  },
};
</script>
