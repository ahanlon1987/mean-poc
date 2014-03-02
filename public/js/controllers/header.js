'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Existing Orders',
        'link': 'articles'
    }, {
        'title': 'New Order',
        'link': 'articles/create'
    }, {

        'title': 'FAQ',
        'link': 'about'
    }



    ];
    
    $scope.isCollapsed = false;
}]);