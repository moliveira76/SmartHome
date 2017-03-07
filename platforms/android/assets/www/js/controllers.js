angular.module('app.controllers', ['ionic', 'ionic.cloud'])
  
.controller('lightCtrl', function($scope, $q, LoginService, $http, $location, $ionicPopup, $state) {
	var res = LoginService.getResponse();

	/*$scope.lights = [
		{name: "Room 1", boardId: "53ff72066667574817532367", checked: false},
		{name: "Room 2", boardId: "53ff6f066667574834212367", checked: false},
		{name: "Room 3", boardId: "53ff6f066667574835380967", checked: false},
	]

	$scope.checkedItems = {};

	var OnStates = [];

	$scope.print = function() {
		console.log($scope.checkedItems);
	}*/

	$scope.lights = [];
	/*for(var i=1; i<res.included.length; i++){
		$scope.lights.push({
			name: res.included[i].attributes.name, boardId: res.included[i].id
		});
	}*/

	var t = function(i){
		$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/' + res.included[i].id +'/state?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //Light 3
		}).then(function successCallback(response) {
			$scope.lights.push({
				name: res.included[i].attributes.name, boardId: res.included[i].id, checked: (response.data.result == 'ON'? true : false)
			});
		});
	}

	for (var i=1; i<res.included.length; i++) {
  		t(i);
	}

	$scope.update = function(light){
		console.log(light.name, light.boardId, light.checked);
		$http({
            method: 'POST',
            url: 'https://api.particle.io/v1/devices/' + light.boardId +'/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
            data: 'args=' + (light.checked == true ? 'on' : 'off'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    	})
	}

	$scope.getUsage = function(light){
		$http({
	  		method: 'GET',
	 	 	url: 'https://api.particle.io/v1/devices/' + light.boardId + '/usageTime?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
		}).then(function successCallback(response) {
			// Split s into minutes and seconds.
			m       = response.data.result / 60; // 6442450 minutes.
			seconds = Math.floor(response.data.result % 60);

			// Split m into hours and minutes.
			h       = m / 60; // 107374 hours.
			minutes = Math.floor(m % 60);

			// Split h into days and hours.
			hours   = Math.floor(h % 24);
			$scope.usagetxtarea = hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";
		  }, function errorCallback(response) {
		  });
	}

})

.controller('temperatureCtrl', function($scope, LoginService, $http, $location, $ionicPopup, $state) {
	$scope.image = "temperature.png";

	function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

	$scope.getTemp = function(){
		/*sleep(5000);

		$cordovaLocalNotification.schedule({
      		id: 1,
 		 	text: 'Instant Notification',
          	title: 'Instant'
        	}).then(function () {
	          alert("Instant Notification set");
        });*/


		$http({
			  method: 'GET',
			  url: 'https://api.particle.io/v1/devices/230046001347343339383037/tempC?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {
				$scope.tempTextArea = (Math.round((response.data.result*100))/100);
				$scope.FTextArea = Math.round(((response.data.result*1.8)+32)*100)/100;
			    // this callback will be called asynchronously
			    // when the response is available
			    //$scope.tempTextArea = 0.01;
			    if($scope.tempTextArea <= 20){
	    			$scope.image = "temperature_cold.png";
			    }
            	
     			else if($scope.tempTextArea>20 && $scope.tempTextArea <40){
					$scope.image = "temperature_warm.png";
     			}
     			else{
					$scope.image = "temperature_hot.png";
     			}
     			console.log("image:" + $scope.image);
			  }, function errorCallback(response) {
			  	//alert(response);
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	}

})
   
.controller('humidityCtrl', ['$scope', '$http', '$stateParams','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $rootScope) {
	$scope.colors = ['#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
	$scope.data = [100,0];
	$scope.labels = ["Humidity", ""];
	$scope.options = {
					  tooltips: {enabled: false}
					 };
	$scope.getHumidity = function(){

		$http({
			  method: 'GET',
			  url: 'https://api.particle.io/v1/devices/230046001347343339383037/humidity?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {
				var humidity = (Math.round((response.data.result*100))/100);
				if((humidity/ Math.floor(humidity))==1){
					$scope.humidityTextArea = humidity + ".0%";
				}
				else{
					$scope.humidityTextArea = humidity + "%";
				}
				$scope.labels = ["Humidity", ""];
				$scope.colors = ['#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
  				$scope.data = [Math.round((response.data.result*100))/100, 100-(Math.round((response.data.result*100))/100)];
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			  	//alert("Timed out...Please try again later");
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	}


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('loginCtrl', function($scope, LoginService, AlarmPIRClockSrv, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state, $cordovaLocalNotification) {
 
    $scope.auth = function() {
		LoginService.loginUser($scope.data.username, $scope.data.password).then(function(response){
			LoginService.addResponse(response);
			getAddress();
		});


		AlarmPIRClockSrv.startClock(function(){
			$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/alarmState?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {
				if(response.data.result == "ON"){
					$cordovaLocalNotification.schedule({
			            id: 1,
			            text: 'Movement detected!',
			            title: 'PIR Warning',
			            icon: '../img/temperature.png'
			            }).then(function () {
		            });

			        cordova.plugins.notification.local.on("click", function (notification, state) {
                        $state.go('menu.camera');
                    }, this)
				}
					
	          }, function errorCallback(response) {
	          	console.log(response.data)
	          });

			$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/pirState?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {
				if(response.data.result == 1){
					$cordovaLocalNotification.schedule({
			            id: 1,
			            text: 'Alarm is on!',
			            title: 'Alarm Warning',
			            icon: '../img/temperature.png'
			            }).then(function () {
		            });

			        cordova.plugins.notification.local.on("click", function (notification, state) {
                        $state.go('menu.camera');
                    }, this)
				}
					
	          }, function errorCallback(response) {
	          	console.log(response.data)
	          });


		});

		ClockSrv.startClock(function(){
				var res = LoginService.getResponse();
				var totalTime = 0;


				for (var i=1; i<res.included.length; i++) {
					$http({
				        method: 'GET',
				        url: 'https://api.particle.io/v1/devices/' + res.included[i].id +'/usageTime?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //Light 3
					}).then(function successCallback(response) {
						totalTime = totalTime + response.data.result;
						if(totalTime > (window.localStorage.getItem("light")*3600)){
							$cordovaLocalNotification.schedule({
					            id: 1,
					            text: 'Light usage threshold exceeded!',
					            title: 'Light Warning',
					            icon: '../img/temperature.png'
					            }).then(function () {
					              //alert("Warning: Current temperature is higher than desired threshold temperature!");
					            });
						}
					});
				}

				

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
	    });




	function getAddress(){

		var res = LoginService.getResponse();
		console.log(res)
		console.log("ADDRESS IS: " + res.data.attributes.address)

		address = res.data.attributes.address;
		//address = '929 Bunchberry Way';
		//address = '349 Terry Fox Drive';
	    // Initialize the Geocoder
	    geocoder = new google.maps.Geocoder();
	    if (geocoder) {
	        geocoder.geocode({
	            'address': address
	        }, function (results, status) {
	            if (status == google.maps.GeocoderStatus.OK) {
	                console.log("lat of " + address + "is: " + results[0].geometry.location.lat());
	                console.log("long of " + address + "is: " + results[0].geometry.location.lng());
	                startGeo(results[0].geometry.location.lat(), results[0].geometry.location.lng())
	            }
	        });
	    }

	}
  



    function startGeo(lat, long){
    	GeoAlert.begin(lat,long, function() {
    		console.log("LAT ISSSS: " + lat)

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

    }

	 




    }

})


.controller('logoutCtrl', ['$scope', '$http', '$stateParams', '$location', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location, $ionicLoading, $ionicPopup) {

	$scope.logout = function(){
		$ionicLoading.hide();
		$location.path('/page4');
	}

}])

.controller('messagingCtrl', function($scope, LoginService, $http, $location, $ionicPopup, $state) {
	$scope.users = [];
	res = LoginService.getResponse();

	$http({
  	method: 'GET',
  	url: 'http://54.173.72.95:8080/release-0.0.1-SNAPSHOT/rest/api/smarthome/users?houseId=' + res.data.relationships.house.data[0].id
	}).then(function successCallback(response) {
		for(i=0; i<response.data.data.length; i++){
			$scope.users[i] = {name: response.data.data[i].attributes.name, email: response.data.data[i].attributes.email, checked: false};
		}
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function errorCallback(response) {
	  	//alert("Timed out...Please try again later");
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });

	$scope.checkedItems = {};

	$scope.print = function() {
		console.log($scope.checkedItems);
	}

	$scope.save = function() {
	    var checkedUsers = [];
	    for(var i in $scope.checkedItems) {
	        console.log($scope.checkedItems[i]);
	        if($scope.checkedItems[i] == true) {
	            checkedUsers.push(i);
	        }
	    }
	    console.log(checkedUsers);

        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "", // Subject
            "",                      // Body
            checkedUsers,    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
    }

})



.controller('configurationsCtrl', ['$scope', '$http', '$stateParams', '$location', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location, $ionicLoading, $ionicPopup, sharedProperties) {

	$scope.saveData = function(l, t, h, i){
	    window.localStorage.setItem("light", l);
	    window.localStorage.setItem("temp", t);
	    window.localStorage.setItem("humidity", h);
	    window.localStorage.setItem("IP", i);
	}

	$scope.loadData = function(){
	    $scope.lightThreshTextArea = window.localStorage.getItem("light");
	    $scope.tempThreshTextArea  = window.localStorage.getItem("temp");
	    $scope.humidityThreshTextArea  = window.localStorage.getItem("humidity");
	    $scope.IPTextArea  = window.localStorage.getItem("IP");
  	}


}])


.controller('accessdeniedCtrl', function($scope, LoginService, $http, $location, $ionicPopup, $state) {

	$scope.checkTempAccess = function(){
		res = LoginService.getResponse();
		if(res.data.relationships.house.data.length == 0){
			$state.go('menu.accessdenied');
		}
		else{
			$state.go('menu.temperature');
		}
	}

	$scope.checkHumidityAccess = function(){
		res = LoginService.getResponse();
		if(res.data.relationships.house.data.length == 0){
			$state.go('menu.accessdenied');
		}
		else{
			$state.go('menu.humidity');
		}
	}

	$scope.checkConfigurationsAcess = function(){
		res = LoginService.getResponse();
		if(res.data.attributes.isadmin == false){
			$state.go('menu.accessdenied');
		}
		else{
			$state.go('menu.configurations');
		}
	}

})

.controller('cameraCtrl', function($scope, LoginService, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state) {

	$scope.goSnapshot = function(){
		console.log("SNAPSHOT")
		$state.go('menu.snapshot');
	}

	$scope.goLivestream = function(){
		console.log("LIVESTREAM")
		$state.go('menu.livestream');
	}

	
})

.controller('snapshotCtrl', function($scope, LoginService, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state) {

	$scope.ipAddress ="http://" + window.localStorage.getItem("IP") + "/latestPhoto.png";
	console.log($scope.ipAddress)
	
})

.controller('livestreamCtrl', function($scope, LoginService, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state) {

	$scope.ipAddress ="http://" + window.localStorage.getItem("IP") + ":5000";
	console.log($scope.ipAddress)

	$scope.right = function(){
		$http({
	        method: 'POST',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/servoRight?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	        data: '',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			console.log(response.data)
          }, function errorCallback(response) {
          	console.log(response.data)
          });
	}

	$scope.reset = function(){
		$http({
	        method: 'POST',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/servoReset?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	        data: '',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			console.log(response.data)
          }, function errorCallback(response) {
          	console.log(response.data)
          });
	}

	$scope.left = function(){
		$http({
	        method: 'POST',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/servoLeft?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	        data: '',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			console.log(response.data)
          }, function errorCallback(response) {
          	console.log(response.data)
          });
	}

	
})

.controller('alarmCtrl', function($scope, LoginService, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state) {

	$scope.turnOn = function(){
		$http({
	        method: 'POST',
	        url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/alarm?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	        data: 'args=on',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			console.log(response.data)
          }, function errorCallback(response) {
          	console.log(response.data)
          });
	}

	$scope.turnOn = function(){
		$http({
	        method: 'POST',
	        url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/alarm?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	        data: 'args=off',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			console.log(response.data)
          }, function errorCallback(response) {
          	console.log(response.data)
          });
	}


})

.controller('fanCtrl', function($scope, LoginService, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state) {
	$scope.fanImage = "fanOff.png";
	$scope.fans = [];

	$http({
        method: 'GET',
        url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/fanState?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
	}).then(function successCallback(response) {

			$scope.fans.push({
				checked: (response.data.result == 'ON'? true : false)
			});




			if(response.data.result == 'ON'){
				$scope.fanImage = "fanOn.png";
			}
			else{
				$scope.fanImage = "fanOff.png";
			};
	});


	$scope.update = function(fan){
		$http({
            method: 'POST',
            url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/fan?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
            data: 'args=' + (fan.checked == true ? 'on' : 'off'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    	})

    	if(fan.checked == true){
    		$scope.fanImage = "fanOn.png";
		}
		else{
			$scope.fanImage = "fanOff.png";
		};


	};




})


.controller('heaterCtrl', function($scope, LoginService, ClockSrv, GeoAlert, $http, $location, $ionicPopup, $state) {
	$scope.heaterImage = "heaterOff.png";
	$scope.heaters = [];

	$http({
        method: 'GET',
        url: 'https://api.particle.io/v1/devices/53ff6f066667574834212367/heaterState?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
	}).then(function successCallback(response) {

			$scope.heaters.push({
				checked: (response.data.result == 'ON'? true : false)
			});




			if(response.data.result == 'ON'){
				$scope.heaterImage = "heaterOn.png";
			}
			else{
				$scope.heaterImage = "heaterOff.png";
			};
	});


	$scope.update = function(heater){
		$http({
            method: 'POST',
            url: 'https://api.particle.io/v1/devices/53ff6f066667574834212367/heater?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
            data: 'args=' + (heater.checked == true ? 'on' : 'off'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    	})

    	if(heater.checked == true){
    		$scope.heaterImage = "heaterOn.png";
		}
		else{
			$scope.heaterImage = "heaterOff.png";
		};


	};




})
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 