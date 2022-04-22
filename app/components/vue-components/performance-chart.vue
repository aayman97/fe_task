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
import axios from 'axios';
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
      chartData: null,
    };
  },
  created() {
    axios.get('https://fe-task.getsandbox.com/performance').then((res) => {
      this.chartData = res.data;
    });
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
      if (this.chartData) {
        let arrayTemp = this.chartData.sort((a, b) => a.date_ms - b.date_ms);
        let maxDate = arrayTemp[arrayTemp.length - 1];

        let start = this.startDate
          ? Date.parse(this.startDate)
          : arrayTemp[0].date_ms;

        //   console.log('START IS', moment(start));

        let end = this.endDate ? Date.parse(this.endDate) : maxDate.date_ms;

        //   console.log('End IS', moment(end));

        if (start < maxDate.date_ms && this.endDate === null) {
          return this.chartData
            .filter((item) => item.date_ms >= start)
            .map((item) => this.formatDate(item.date_ms));
        }

        if (start < maxDate.date_ms && end < maxDate.date_ms) {
          return this.chartData
            .filter((item) => item.date_ms >= start && item.date_ms <= end)
            .map((item) => this.formatDate(item.date_ms));
        } else {
          return this.chartData.map((item) => this.formatDate(item.date_ms));
        }
      }
    },
    yAxisData() {
      return (
        this.chartData &&
        this.chartData.map((item) => Math.round(item.performance * 100))
      );
    },
  },
  watch: {
    chartData(val) {
      if (val) {
        console.log('char data ', this.chartData);
        this.$emit('passDefaultDatetimes', [
          moment(this.chartData[0].date_ms).format('YYYY-MM-DD'),
          moment(this.chartData[this.chartData.length - 1].date_ms).format(
            'YYYY-MM-DD'
          ),
        ]);
      }
    },
  },
  methods: {
    formatDate(dateInMs) {
      console.log(moment(dateInMs));
      return moment(dateInMs).format('DD MMM YYYY');
    },
  },
};
</script>
