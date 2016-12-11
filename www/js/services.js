'use strict';

angular.module('conFusion.services', ['ngResource'])
    .constant('baseUrl', 'http://localhost:3000/')
    .service('menuFactory', function($resource, baseUrl) {

      this.getDishes = function() {
        return $resource(baseUrl + 'dishes/:id', null, {'update': {method: 'PUT'}});
      };

      this.getPromotions = function() {
        return $resource(baseUrl + 'promotions/:id');
      }
    })

    .service('corporateFactory', function($resource, baseUrl) {

      this.getLeaders = function() {
        return $resource(baseUrl + 'leadership/:id');
      };
    })

    .service('feedbackFactory', function($resource, baseUrl) {
      this.getFeedback = function() {
        return $resource(baseUrl + 'feedback/:id');
      }
    })
    .service('favoriteFactory', function($resource, baseUrl) {
      var favorites = [];
      this.addToFavorites = function(index) {
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].id == index) {
            return;
          }
        }
        favorites.push(index);
      };
      this.getFavorites = function() {
        return favorites;
      };
      this.deleteFromFavorites = function(index) {
        favorites.splice(favorites.indexOf(index), 1);
      }
    })
;
