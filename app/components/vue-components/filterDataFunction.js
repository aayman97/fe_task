const moment = require('moment');
const formatDate = (dateInMs) => {
  return moment(dateInMs).format('DD MMM YYYY');
};

module.exports = {
  filterData: function (arr, endD, startD) {
    if (arr) {
      let arrayTemp = arr.sort((a, b) => a.date_ms - b.date_ms);
      let maxDate = arrayTemp[arrayTemp.length - 1];

      let start = startD ? Date.parse(startD) : arrayTemp[0].date_ms;

      let end = endD ? Date.parse(endD) : maxDate.date_ms;

      if (start < maxDate.date_ms && endD === null) {
        return arr
          .filter((item) => item.date_ms >= start)
          .map((item) => formatDate(item.date_ms));
      }

      if (start < maxDate.date_ms && end <= maxDate.date_ms) {
        return arr
          .filter((item) => item.date_ms >= start && item.date_ms <= end)
          .map((item) => formatDate(item.date_ms));
      }
      return arr.map((item) => formatDate(item.date_ms));
    }
  },
};
