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
  homePageVm.pageNumber = 1;
  homePageVm.numerOfPages = 0;
  homePageVm.loadingButton = false;

  $scope.onChange = function () {
    homePageVm.searchedValue = $scope.searchedValue;
    $location.$$search.filter = $scope.searchedValue;

    const queryParams = { filter: $scope.searchedValue };
    $state.go('.', queryParams);
  };

  $scope.clear = function () {
    homePageVm.searchedValue = '';
    $scope.searchedValue = '';
    const queryParams = { filter: '' };
    $state.go('.', queryParams);
  };

  function activate() {
    homePageVm.loadingButton = true;
    Employees.getEmployees(homePageVm.pageNumber).then(({ data }) => {
      homePageVm.employees = homePageVm.employees.concat(data.employees);
      homePageVm.numerOfPages = data.pages;
      homePageVm.loadingButton = false;
    });
  }

  activate();

  $scope.loadMore = function () {
    homePageVm.loadingButton = true;
    homePageVm.pageNumber++;
    Employees.loadMoreEmployees(homePageVm.pageNumber).then(({ data }) => {
      homePageVm.employees = homePageVm.employees.concat(data.employees);
      if (homePageVm.pageNumber === homePageVm.numerOfPages) {
        homePageVm.loadingButton = true;
      } else {
        homePageVm.loadingButton = false;
      }
    });
  };
}
