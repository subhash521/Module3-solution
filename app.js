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

    menuSearch.fulldata=response;
    console.log(response);
})
  .catch(function (error) {
    console.log(error);
  })

};

menuSearch.removeItems=function(itemIndex){
  MenuSearchService.removeItems(itemIndex);
}

}

MenuSearchService.$inject=['$http','ApiBasePath']

function MenuSearchService($http,ApiBasePath){
var service=this;

service.getMatchedMenuItems=function(searchWord){
  console.log(searchWord);

return $http({
method: "GET",
url:(ApiBasePath+"/menu_items.json")

}).then(function (response){
  var foundItems=response.data.menu_items;
console.log(response.data);

  for (var i = 0; i < foundItems.length; i++) {
      if(foundItems[i].description.indexOf(searchWord)!=-1){
      foundItems.splice(i,1);
     console.log(foundItems.length);
    }
  }
      //  console.log(foundItems);
  return foundItems;
})
};



service.removeItems=function(itemIndex){
  menuItems.splice(itemIndex,1);
};



}

})();
