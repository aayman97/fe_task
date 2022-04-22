angular.module('appModule').controller('homeController', homePageController);

function homePageController(
  Employees,
  $scope,
  $location,
  $stateParams,
  $state
) {
  const homePageVm = this;
  homePageVm.employees = [];
  $scope.searchedValue = $stateParams.filter || '';
  homePageVm.searchedValue = $scope.searchedValue;

  console.log($stateParams);

  $scope.onChange = function () {
    homePageVm.searchedValue = $scope.searchedValue;
    $location.$$search.filter = $scope.searchedValue;
    console.log(homePageVm);

    const queryParams = { filter: $scope.searchedValue };
    console.log('STATE', $state);
    $state.go('.', queryParams);
  };

  $scope.clear = function () {
    homePageVm.searchedValue = '';
    $scope.searchedValue = '';
    const queryParams = { filter: '' };
    $state.go('.', queryParams);
  };

  console.log(homePageVm);
  function activate() {
    Employees.getEmployees().then(({ data }) => {
      homePageVm.employees = homePageVm.employees.concat(data.employees);
    });
  }

  activate();
}
