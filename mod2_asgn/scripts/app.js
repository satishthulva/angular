(function(){

  angular.module('shoppingListApp', [])
         .controller('buyListController', buyListControllerFunc)
         .controller('boughtListController', boughtListControllerFunc)
         .factory('shoppingListServiceFactory', shoppingListServiceFactoryFunc)

/**
* Controller handling list of items still to buy
**/
  function buyListControllerFunc(shoppingListServiceFactory){
    var buyCtrl = this;

    var someService = new shoppingListServiceFactory([{name:'Dark Chocolates', quantity:9}, {name:'Honey', quantity:'250 ml'}, {name:'Almonds', quantity :'200 Gms'}, {name :'Walnuts', quantity:'100 Gms'}, {name:'Tomatos', quantity:'1 Kg'}, {name : 'Oats', quantity : '2 Kg'}]);
  
    buyCtrl.items = someService.getItems();

    buyCtrl.removeItem = function(index){
      someService.removeItem(index);
    }
  }

  buyListControllerFunc.$inject = ['shoppingListServiceFactory']

/**
* Controller handling list of items bought already
**/
  function boughtListControllerFunc(shoppingListServiceFactory){
    var boughtCtrl = this;
    
    var someService = new shoppingListServiceFactory();

    boughtCtrl.items = someService.getItems();

    boughtCtrl.addItem = function(name, quantity){
      someService.addItem(name, quantity);
    }

  }

  buyListControllerFunc.$inject = ['shoppingListServiceFactory']

/**
* Factory providing service to maintain a list of shopping items
**/
  function shoppingListServiceFactoryFunc(){
    var func = function(defaultItems){
      var servThis = this;      

      var items = [];
      if(defaultItems !== undefined)
        items = defaultItems;

      servThis.addItem = function(itemName, itemQuantity){
        var item = {
          name : itemName,
          quantity : itemQuantity
        }

        items.push(item);
      }

      servThis.removeItem = function(index){
        items.splice(index, 1);
      }

      servThis.getItems = function(){
        return items;
      }
    }

    return func
  }

})()
