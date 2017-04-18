(function(){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

function FoundItems(){
  var ddo={
    templateUrl:'foundItems.html',
     scope:{
       items: '=items'
     }
  };
  return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
  var menuSearch=this;
 var menuItems;
  menuSearch.items=function(searchWord){
var promise=  MenuSearchService.getMatchedMenuItems(searchWord);
promise.then(function (response) {

    menuSearch.fulldata=response.menu_items;
    console.log(menuSearch.fulldata.length);
})
  .catch(function (error) {
    console.log(error);
  })

};

menuSearch.removeItems=function(itemIndex){
    console.log(itemIndex);
  MenuSearchService.removeItems(itemIndex);
}

}

MenuSearchService.$inject=['$http','ApiBasePath']

function MenuSearchService($http,ApiBasePath){
var service=this;

var foundItems=[];
service.getMatchedMenuItems=function(searchWord){
  console.log(searchWord);

return $http({
method: "GET",
url:(ApiBasePath+"/menu_items.json")

}).then(function (response){
foundItems=response.data;
console.log(foundItems.menu_items);

  for (var i = 0; i < foundItems.menu_items.length; i++) {
      if(foundItems.menu_items[i].description.indexOf(searchWord)==-1){
      console.log(foundItems.menu_items[i].description+' index '+foundItems.menu_items[i].description.indexOf(searchWord));
      foundItems.menu_items.splice(i,1);

    }
  }
 //  console.log(foundItems);
  return foundItems;
})
};



service.removeItems=function(itemIndex){

  foundItems.menu_items.splice(itemIndex,1);
};



}

})();
