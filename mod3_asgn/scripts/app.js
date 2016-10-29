/**
* Always make your javascript file IIFE - Immediately Invoked Function Expression - so that we won't mutate global scope unknowingly( because function creates its' own scope )
**/
(function(){
angular.module('restaurantMenuSearchApp',[])
  .service('menuFetchService', menuFetchServiceFunc)
  .controller('restaurantMenuSearchController', restaurantMenuSearchControllerFunc)
  .directive('matchedItems', restaurantMenuDirectiveFunc);

// menu fetch service definition
function menuFetchServiceFunc($http){
  var ref = this;
  var matchedItems = [];
  /**
  * Fetch the menu from restaurants' api and filter based on the search key
  **/
  ref.fetchMatchedItems = function(searchKey){
    $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function(resp){
        var temp = resp.data.menu_items;
        matchedItems = [];
        for(var i=temp.length;i--;){
          if(temp[i].description.indexOf(searchKey) !== -1){
            matchedItems.push(temp[i]);
          }
        }
    });

    return matchedItems;
  };
}

menuFetchServiceFunc.$inject = ['$http'];

// controller definition
function restaurantMenuSearchControllerFunc(menuFetchService){
  var ref = this;
  ref.matchedItems = [];
  ref.atleastOneClick = false;
  
  var temp;

  /**
  * Fetch the menu from restaurants' api and filter based on the search key
  **/
  ref.fetchMatchedItems = function(){
    ref.matchedItems = menuFetchService.fetchMatchedItems(ref.searchKey);
    ref.atleastOneClick = true;
  };

  ref.removeItem = function(index){
    ref.matchedItems.splice(index, 1);
  };
}

// Specifying dependencies
restaurantMenuSearchControllerFunc.$inject = ['menuFetchService'];

// directive Definitin Object returning function
function restaurantMenuDirectiveFunc(){
var ddo = {
      restrict : 'E',
      scope : {
        matches : '=items',
        removeItem : '&removeItem',
        atleastOneClick : '=atleastOneClick'
      },
      templateUrl : 'templates/restaurant_menu.html'
  };

  return ddo;
}

})();
