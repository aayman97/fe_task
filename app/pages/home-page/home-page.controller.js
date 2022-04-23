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
  //   console.log('homePageVm : ', homePageVm);
  //   console.log('$rootScope : ', $rootScope.$on);

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
      console.log(data);
      if (homePageVm.pageNumber === homePageVm.numerOfPages) {
        homePageVm.loadingButton = true;
      } else {
        homePageVm.loadingButton = false;
      }
    });
  };
}
