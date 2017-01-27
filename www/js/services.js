angular.module('app.services', [])

.factory('GeoAlert', function() {
   console.log('GeoAlert service instantiated');
   var interval;
   var duration = 6000;
   var long, lat;
   var processing = false;
   var callback;
   var minDistance = 10;
    
   // Credit: http://stackoverflow.com/a/27943/52160   
   function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }
  
   function deg2rad(deg) {
    return deg * (Math.PI/180)
   }
   
   function hb() {
      console.log('hb running');
      if(processing) return;
      processing = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        processing = false;
        console.log(lat, long);
        console.log(position.coords.latitude, position.coords.longitude);
        var dist = getDistanceFromLatLonInKm(lat, long, position.coords.latitude, position.coords.longitude);
        console.log("dist in km is "+dist);
        if(dist <= minDistance) callback();
      });
   }
   
   return {
     begin:function(lt,lg,cb) {
       long = lg;
       lat = lt;
       callback = cb;
       interval = window.setInterval(hb, duration);
       hb();
     }, 
     end: function() {
       window.clearInterval(interval);
     },
     setTarget: function(lg,lt) {
       long = lg;
       lat = lt;
     }
   };
   
})


.factory('ClockSrv', function($interval){
  var clock = null;
  var service = {
    startClock: function(fn){
      if(clock === null){
        clock = $interval(fn, 30000);
      }
    },
    stopClock: function(){
      if(clock !== null){
        $interval.cancel(clock);
        clock = null;
      }
    }
  };

  return service;
})



.service('sharedProperties', function() {
    var light = "";
    var temp = "";
    var humidity = "";
    
    return {
        getLight: function() {
            return light;
        },
        getTemp: function() {
            return temp;
        },
        getHumidity: function() {
            return humidity;
        },
        setValues: function(lightText, tempText, humidityText) {
            light = lightText;
            temp = tempText;
            humidity = humidityText;


        },
        getObject: function() {
            return objectValue;
        }
    }
})


.service('LoginService', function($q, $http, $location, $ionicPopup, $ionicLoading) {
    var res = {};

    var addResponse = function(resObj){
      res = resObj;
    };

    var getResponse = function(){
      return res;
    };


    return {
        loginUser: function(name, pw) {
          var deferred = $q.defer();

          $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner icon="android"></ion-spinner>'
          });


          $http({
            method: 'POST',
            url: 'http://54.173.72.95:8080/release-0.0.1-SNAPSHOT/rest/api/smarthome/authenticate',
            data: 'username=' + name + '&password=' + pw,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
          }).then(function successCallback(response) {
              $location.path('/side-menu21/page7');
              $ionicLoading.hide();
              deferred.resolve(response.data);
          }, function errorCallback(response) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
              });
          });

          return deferred.promise;
        },

        addResponse: addResponse,
        getResponse: getResponse
    };
})


