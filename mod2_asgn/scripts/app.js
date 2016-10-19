(function(){

  angular.module('shoppingListApp', [])
         .controller('buyListController', buyListControllerFunc)
         .controller('boughtListController', boughtListControllerFunc)
         .service('shoppingListService', shoppingListServiceFunc)

/**
* Controller handling list of itemsToBuy still to buy
**/
  function buyListControllerFunc(shoppingListService){
    var buyCtrl = this;
  
    buyCtrl.items = shoppingListService.getItemsToBuy();

    buyCtrl.removeItem = function(index){
      shoppingListService.removeItem(index);
    }
  }

  buyListControllerFunc.$inject = ['shoppingListService']

/**
* Controller handling list of itemsToBuy bought already
**/
  function boughtListControllerFunc(shoppingListService){
    var boughtCtrl = this;
    boughtCtrl.items = shoppingListService.getItemsBought();
  }

  buyListControllerFunc.$inject = ['shoppingListService']

/**
* Factory providing service to maintain a list of shopping itemsToBuy
**/
  function shoppingListServiceFunc(){
      var servThis = this;      

      var itemsToBuy = [{name:'Dark Chocolates', quantity:9}, {name:'Honey', quantity:'250 ml'}, {name:'Almonds', quantity :'200 Gms'}, {name :'Walnuts', quantity:'100 Gms'}, {name:'Tomatos', quantity:'1 Kg'}, {name : 'Oats', quantity : '2 Kg'}];

      var itemsBought = [];

      servThis.removeItem = function(index){
        itemsBought.push(itemsToBuy.splice(index, 1)[0]);
      }

      servThis.getItemsToBuy = function(){
        return itemsToBuy;
      }

      servThis.getItemsBought = function(){
        return itemsBought;
      }
  }

})()
