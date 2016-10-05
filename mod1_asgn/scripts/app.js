(function(){
  'use strict';

  angular.module('lunchApp', [])
  .controller('lunchController', lunchControllerFunc);

  function lunchControllerFunc($scope){
   
    $scope.showTheVerdict = false;
    $scope.verdict = '';
    $scope.lunchItems = '';
    $scope.styleClass = '';

    $scope.displayTheVerdict = function(){
      $scope.showTheVerdict = true;
    } 

    $scope.updateVerdict = function(){
      var numItems = 0;
      var items = $scope.lunchItems.split(',');
      for(var index=items.length;index--;)
        if(items[index] !== '')
          numItems+=1;

      if(numItems === 0)
      {
        $scope.styleClass = 'red';
        $scope.verdict = 'Please enter data first';
      }
      else
      {
        $scope.styleClass = 'green';
        $scope.verdict = numItems <= 3 ? 'Enjoy!' : 'Too much!';
      }
    }

    $scope.reset = function(){
      $scope.verdict = '';
      $scope.displayTheVerdict = false;
      $scope.lunchItems = '';
    }
  }

  lunchControllerFunc.$inject = ['$scope'];

})();
