angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$searchService,$state, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout) {


  ////////// SEARCH CONTROLLER BELOW ////////////
  $scope.mySearch = {}; // create empty object for search params
  $rootScope.userSettings = {}; // store global user settings

  /// Core Search Function
  $scope.doSearch = function(mySearch){
    console.log(mySearch);

      $ionicLoading.show({
          template: "Loading data..."
      })
      $searchService.searchColleges(mySearch).then(function(res){
        if (res) {
        console.log(res);
        console.log(res.results);
        var arrayObj = res.results;
        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].name = arrayObj[i]['school.name'];
          delete arrayObj[i]['school.name'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].state = arrayObj[i]['school.state'];
          delete arrayObj[i]['school.state'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].accreditor = arrayObj[i]['school.accreditor'];
          delete arrayObj[i]['school.accreditor'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].city = arrayObj[i]['school.city'];
          delete arrayObj[i]['school.city'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].studentCost = arrayObj[i]['school.instructional_expenditure_per_fte'];
          delete arrayObj[i]['school.instructional_expenditure_per_fte'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].priceURL = arrayObj[i]['school.price_calculator_url'];
          delete arrayObj[i]['school.price_calculator_url'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].revenue = arrayObj[i]['school.tuition_revenue_per_fte'];
          delete arrayObj[i]['school.tuition_revenue_per_fte'];
        };

        for(i = 0; i < arrayObj.length; i++){
          arrayObj[i].url = arrayObj[i]['school.school_url'];
          delete arrayObj[i]['school.school_url'];
        };

        


        console.log(arrayObj);

          $scope.COLLEGE_RESULTS = arrayObj;
          $state.go("app.results", arrayObj);
          $ionicLoading.hide();

        } else{
          var alertPopup = $ionicPopup.alert({
          title: 'Error!',
            template: 'It doesn\'t look like that search worked. Try again'
          });
          $state.go("app.results")
          $ionicSideMenuDelegate.toggleLeft()
        }
      })
    // }
    $ionicSideMenuDelegate.isOpen() ? $ionicSideMenuDelegate.toggleLeft() : null; /// close side menu
  }

  /// clear list view or results and delete from scope
  $scope.clearSearch = function(){
    delete $scope.COLLEGE_RESULTS;    /// dump search result list
    $scope.clearForm();
    $scope.toggleLeft();
  }

  /// clear side menu search form
  $scope.clearForm = function(){
    $scope.mySearch = {};
  }

  $scope.toggleLeft = function() {   /// menu toggle: waiting for timer
    $ionicSideMenuDelegate.toggleLeft();
  }
  $timeout(function() {  /// short delay then open side menu to grab user's attention
    $scope.toggleLeft();
  }, 500);

})


// /////// List Results Child Controller
.controller('ResultsCtrl', function($scope, $state) {


})



