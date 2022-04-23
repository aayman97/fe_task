angular.module('appModule').service('Employees', EmployeesService);

function EmployeesService($http) {
  const getEmployees = () => {
    const employeesUrl = 'https://fe-task.getsandbox.com/employees';

    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = (pageNum) => {
    // [Load more empolyess logic goes here]
    console.log(pageNum);
    const employeesUrl = `https://fe-task.getsandbox.com/employees?page=${pageNum}`;

    return $http.get(employeesUrl);
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
