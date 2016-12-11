angular.module('conFusion.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      // Form data for the login modal
      $scope.loginData = {};
      $scope.reservation = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };
      $ionicModal.fromTemplateUrl('templates/reserve.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.reserveform = modal;
      });
      $scope.closeReserve = function() {
        $scope.reserveform.hide();
      };
      $scope.reserve = function() {
        $scope.reserveform.show();
      };
      $scope.doReserve = function() {
        console.log('Doing reservation', $scope.reservation);
        $timeout(function() {
          $scope.closeReserve();
        }, 1000);
      }
    })

    .controller('MenuController', function($scope, menuFactory, baseUrl) {
      $scope.baseURL = baseUrl;
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;
      $scope.showMenu = false;
      $scope.message = 'Loading ...';
      menuFactory.getDishes().query(function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
          },
          function(response) {
            $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
          });


      $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
          $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
          $scope.filtText = "mains";
        }
        else if (setTab === 4) {
          $scope.filtText = "dessert";
        }
        else {
          $scope.filtText = "";
        }
      };

      $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
      };

      $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
      };
    })

    .controller('ContactController', ['$scope', function($scope) {

      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };

      $scope.channels = [{value: "tel", label: "Tel."}, {
        value: "Email",
        label: "Email"
      }];
      $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', function($scope, feedbackFactory) {

      $scope.sendFeedback = function() {

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
          $scope.invalidChannelSelection = true;
          console.log('incorrect');
        }
        else {
          $scope.invalidChannelSelection = false;
          feedbackFactory.getFeedback().save($scope.feedback);
          $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
          };
          $scope.feedback.mychannel = "";
          $scope.feedbackForm.$setPristine();
        }
      };
    })

    .controller('DishDetailController', function($scope, $stateParams, menuFactory, baseUrl) {
      $scope.baseURL = baseUrl;
      $scope.showDish = false;
      $scope.message = 'Loading ...';
      menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)}).$promise
          .then(
              function(response) {
                $scope.dish = response;
                $scope.showDish = true;
              },
              function(response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
              }
          );

    })

    .controller('DishCommentController', function($scope, menuFactory) {

      $scope.comment = {rating: 5, comment: "", author: "", date: ""};

      $scope.submitComment = function() {

        $scope.comment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.comment);
        menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
        $scope.commentForm.$setPristine();

        $scope.comment = {rating: 5, comment: "", author: "", date: ""};
      }
    })
    .controller('IndexController', function($scope, corporateFactory, menuFactory, baseUrl) {
      $scope.baseURL = baseUrl;
      $scope.dishMessage = $scope.leaderMessage = $scope.promoMessage = 'Loading ...';
      $scope.showDish = false;
      $scope.showPromo = false;
      $scope.showLeader = false;
      menuFactory.getDishes().get({id: 0}).$promise
          .then(
              function(response) {
                $scope.dish = response;
                $scope.showDish = true;
              },
              function(response) {
                $scope.dishMessage = 'Error: ' + response.status + ' ' + response.statusText;
              }
          );
      menuFactory.getPromotions().get({id: 0}).$promise
          .then(
              function(response) {
                $scope.promotion = response;
                $scope.showPromo = true;
              },
              function(response) {
                $scope.promoMessage = 'Error: ' + response.status + ' ' + response.statusText;
              }
          );
      corporateFactory.getLeaders().get({id: 3}).$promise
          .then(
              function(response) {
                $scope.leader = response;
                $scope.showLeader = true;
              },
              function(response) {
                $scope.leaderMessage = 'Error: ' + response.status + ' ' + response.statusText;
              }
          );
    })
    .controller('AboutController', function($scope, corporateFactory, baseUrl) {
      $scope.baseURL = baseUrl;
      $scope.showleaders = false;
      $scope.message = 'Loading ...';
      corporateFactory.getLeaders().query(function(response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
          },
          function(response) {
            $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
          });
    })
;
