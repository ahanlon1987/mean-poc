'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', function ($scope, $stateParams, $location, Global, Articles) {
    $scope.global = Global;

    $scope.create = function() {
        console.log('create function called....');
        console.log('First Name: ' + this.firstName +
                  ', Last Name: ' + this.lastName +
                  ', Street One: ' + this.streetOne +
                  ', Street Two: ' + this.streetTwo +
                  ', Zip Code: ' + this.zip);

        var article = new Articles({
            firstName: this.firstName,
            lastName: this.lastName,
            streetOne: this.streetOne,
            streetTwo: this.streetTwo,
            zip: this.zip
        });
        article.$save(function(response) {
            $location.path('articles/' + response._id);
        });


        //Why do I need to clear these out?
        this.firstName = '';
        this.lastName = '';
        this.streetOne = '';
        this.streetTwo = '';
        this.zip = '';
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.articles = articles;
        });
    };

    $scope.findOne = function() {
        Articles.get({
            articleId: $stateParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };
}]);