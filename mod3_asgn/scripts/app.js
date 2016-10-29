/**
* Always make your javascript file IIFE - Immediately Invoked Function Expression - so that we won't mutate global scope unknowingly( because function creates its' own scope )
**/
(function(){
angular.module('restaurantMenuSearchApp',[])
  .controller('restaurantMenuSearchController', restaurantMenuSearchControllerFunc)
  .directive('matchedItems', restaurantMenuDirectiveFunc);

// controller definition
function restaurantMenuSearchControllerFunc($http){
  var ref = this;
  ref.matchedItems = [];
  ref.atleastOneClick = true;
  
  var temp;

  /**
  * Fetch the menu from restaurants' api and filter based on the search key
  **/
  ref.fetchMatchedItems = function(){
    $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function(resp){
        ref.matchedItems = [];
        temp = resp.data.menu_items;
        for(var i=temp.length;i--;){
          if(temp[i].description.indexOf(ref.searchKey) !== -1){
            ref.matchedItems.push(temp[i]);
          }
        }
    });

    ref.atleastOneClick = true;
  };

  ref.removeItem = function(index){
    ref.matchedItems.splice(index, 1);
  };
}

// Specifying dependencies
restaurantMenuSearchControllerFunc.$inject = ['$http'];

// directive Definitin Object returning function
function restaurantMenuDirectiveFunc(){
var ddo = {
      restrict : 'E',
      scope : {
        matches : '=items',
        removeItem : '&removeItem'
      },
      templateUrl : 'templates/restaurant_menu.html'
  };

  return ddo;
}

})();
