// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'ionic.cloud', 'app.controllers', 'app.routes', 'app.directives','app.services',])

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

.run(function($ionicPlatform, $ionicPopup, GeoAlert, sharedProperties, $ionicPush, $ionicAuth, ClockSrv, $http) {

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


    ClockSrv.startClock(function(){
      $http({
        method: 'GET',
        url: 'https://api.particle.io/v1/devices/230046001347343339383037/tempC?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
      }).then(function successCallback(response) {
        if((Math.round((response.data.result*100))/100) == 20.7 ){
        }
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    });

    /*if(window.localStorage.getItem("light") == 221){
      window.alert("YESSSS");
    }*/



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

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])
