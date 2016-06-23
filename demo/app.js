angular
    .module('app', ['asideModule'])
    .controller('hamburgerMenuController', hamburgerMenuController);


function hamburgerMenuController($scope) {
    
    var vm = this;

    $scope.$on("getMenuState", function (event, data) {
        $scope.$apply(function () {
            vm.opened = data;
        });
    });
}


