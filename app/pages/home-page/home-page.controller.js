angular.module('appModule').controller('homeController', homePageController);

function homePageController(Employees, $scope) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.searchedValue = '';
  $scope.onChange = function () {
    homePageVm.searchedValue = $scope.searchedValue;
    console.log(homePageVm);
  };

  $scope.clear = function () {
    homePageVm.searchedValue = '';
    $scope.searchedValue = '';
  };

  console.log(homePageVm);
  function activate() {
    Employees.getEmployees().then(({ data }) => {
      homePageVm.employees = homePageVm.employees.concat(data.employees);
    });
  }

  activate();
}
