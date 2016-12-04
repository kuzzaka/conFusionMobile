'use strict';

angular.module('conFusion.services', ['ngResource'])
    .constant('baseUrl', 'http://localhost:3000/')
    .service('menuFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {

      this.getDishes = function() {
        return $resource(baseUrl + 'dishes/:id', null, {'update': {method: 'PUT'}});
      };

      this.getPromotions = function() {
        return $resource(baseUrl + 'promotions/:id');
      }
    }])

    .factory('corporateFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {

      var corpfac = {};

      corpfac.getLeaders = function() {
        return $resource(baseUrl + 'leadership/:id');
      };

      return corpfac;
    }])

    .service('feedbackFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.getFeedback = function() {
        return $resource(baseUrl + 'feedback/:id');
      }
    }])
;
