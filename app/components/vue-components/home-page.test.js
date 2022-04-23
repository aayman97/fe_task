const axios = require('axios');
var filterD = require('./filterDataFunction');
const moment = require('moment');
test('check start date and end date', async () => {
  const response = await axios.get(
    'https://fe-task.getsandbox.com/performance'
  );

  const endDate = '2022-01-12';
  const startDate = '2022-01-10';

  const arr = filterD.filterData(response.data, '2022-01-12', '2022-01-10');

  expect(arr[arr.length - 1]).toBe(
    moment(Date.parse(endDate)).format('DD MMM YYYY')
  );

  expect(arr[0]).toBe(moment(Date.parse(startDate)).format('DD MMM YYYY'));
});
