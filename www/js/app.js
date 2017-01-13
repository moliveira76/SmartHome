// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ionic.cloud', 'app.controllers', 'app.routes', 'app.directives','app.services',])

.config(function($ionicConfigProvider, $sceDelegateProvider, $ionicCloudProvider){
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  $ionicCloudProvider.init({
    "core": {
      "app_id": "b611c3bc"
    },
    "push": {
      "sender_id": "43450091796",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });

})

.run(function($ionicPlatform, $ionicPopup, GeoAlert, $ionicPush, $ionicAuth) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //var details = {'email': 'tikawy@hotmail.com', 'password': 'tikaelmasry'};
    //$ionicAuth.signup(details);

    var details = {'email': 'tikawy@hotmail.com', 'password': 'tikaelmasry'};
    $ionicAuth.login('basic', details);

    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      window.alert('Token saved:', JSON.stringify(t.token));
    });

    //Begin the service
    //hard coded 'target'
    /*var lat = 45.3145318; //929 bunchberry way
    var long = -75.6172014;*/

    var lat = 45.3520158; //Kanata
    var long = -75.91496169999999; 

    /*var lat = 45.3830819; //Carleton U
    var long = -75.69831199999999;*/

    function onConfirm(idx) {
      console.log('button '+idx+' pressed');
    }
    
    GeoAlert.begin(lat,long, function() {
      console.log('TARGET');
      GeoAlert.end();
      $ionicPopup.alert({
        title: 'Target!',
        template: 'You are near your target!'
    });
      
    });

  });
})

.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $scope.$on('cloud:push:notification', function(event, data) {
              var msg = data.message;
              alert(msg.title + ': ' + msg.text);
            });

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])