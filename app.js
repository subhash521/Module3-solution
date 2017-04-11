(function(){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject=['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
  var menuSearch=this;

  menuSearch.items=function(searchWord){
  MenuSearchService.getMatchedMenuItems(searchWord);

};

}

MenuSearchService.$inject=['$http','ApiBasePath']

function MenuSearchService($http,ApiBasePath){
var service=this;

service.getMatchedMenuItems=function(searchWord){
  console.log(searchWord);
var response=$http({
method: "GET",
url:(ApiBasePath+"/menu_items.json")

});
console.log(response);
return response;
};
};

})();
