// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'ionic.cloud', 'app.controllers', 'app.routes', 'app.directives','app.services', 'chart.js',])

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

.run(function($ionicPlatform, $ionicPopup, GeoAlert, sharedProperties, $ionicPush, $ionicAuth, ClockSrv, $http, $cordovaLocalNotification) {

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
    var lat = 45.3145318; //929 bunchberry way
    var long = -75.6172014;

    //var lat = 45.3520158; //Kanata
    //var long = -75.91496169999999; 

    //var lat = 45.3830819; //Carleton U
    //var long = -75.69831199999999;

    function onConfirm(idx) {
      console.log('button '+idx+' pressed');
    }
    
    /*GeoAlert.begin(lat,long, function() {
      console.log('TARGET');
      GeoAlert.end();
      $cordovaLocalNotification.schedule({
        id: 1,
        text: 'You are near your home!',
        title: 'Approaching Home'
        }).then(function () {
          //alert("You are near your target!");
      });
    });


    address = '929 Bunchberry Way';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results[0].geometry.location.lat());
                console.log(results[0].geometry.location.lng());
            }
        });
    }*/


    /*ClockSrv.startClock(function(){
      $http({
        method: 'GET',
        url: 'https://api.particle.io/v1/devices/230046001347343339383037/tempC?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //temperature
      }).then(function successCallback(response) {      
        if(Math.round((response.data.result*100))/100 > window.localStorage.getItem("temp") && window.localStorage.getItem("temp") != null){
          $cordovaLocalNotification.schedule({
            id: 1,
            text: 'We detected an unusual temperature!',
            title: 'Temperature Warning',
            icon: '../img/temperature.png'
            }).then(function () {
              //alert("Warning: Current temperature is higher than desired threshold temperature!");
            });
        }
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

        $http({
        method: 'GET',
        url: 'https://api.particle.io/v1/devices/230046001347343339383037/humidity?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //humidity
      }).then(function successCallback(response) {
        if(Math.round((response.data.result*100))/100 > window.localStorage.getItem("humidity") && window.localStorage.getItem("humidity") != null){
          $cordovaLocalNotification.schedule({
            id: 1,
            text: 'We detected an unusual humidity!',
            title: 'Humidity Warning',
            icon: '../imgtemperature_hot.png'
            }).then(function () {
              //alert("Warning: Current humidity is higher than desired threshold humidity!");
            });
        }
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    });*/


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
