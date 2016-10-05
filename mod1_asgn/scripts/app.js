(function(){
  'use strict';

  angular.module('lunchApp', [])
  .controller('lunchController', lunchControllerFunc);

  function lunchControllerFunc($scope){
   
    $scope.showTheVerdict = false;
    $scope.verdict = '';
    $scope.lunch_items = '';

    $scope.displayTheVerdict = function(){
      $scope.showTheVerdict = true;
    } 

    $scope.updateVerdict = function(){
      var numItems = 0;
      var items = $scope.lunch_items.split(',');
      for(var index=items.length;index--;)
        if(items[index] !== '')
          numItems+=1;

      $scope.verdict = numItems <= 3 ? 'Enjoy!' : 'Too much!';
    }

    $scope.reset = function(){
      $scope.verdict = '';
      $scope.displayTheVerdict = false;
      $scope.lunch_items = '';
    }
  }

  lunchControllerFunc.$inject = ['$scope'];

})();
