angular.module('app.controllers', ['ionic', 'ionic.cloud'])
  
.controller('lightCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$cordovaLocalNotification', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $timeout, $stateParams, $rootScope, $cordovaLocalNotification) {

	/*$scope.lights = [
		{name: "Room 1", boardId: "53ff72066667574817532367", checked: false},
		{name: "Room 2", boardId: "53ff6f066667574834212367", checked: false},
		{name: "Room 3", boardId: "53ff6f066667574835380967", checked: false},
	];


	$scope.checkedItems = {};

	var OnStates = [];

	$scope.print = function() {
		console.log($scope.checkedItems);
	}*/


	$scope.checkStatus = function(){
		$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/state?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //Light 3
		}).then(function successCallback(response) {
			//window.alert(response.data.result);
			if(response.data.result == "ON"){
				OnStates.push(response.data.coreInfo.deviceID);
			}
		}, function errorCallback(response) {
				  	alert(response);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
	  	});

	  	$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574834212367/state?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //Light 3
		}).then(function successCallback(response) {
			//window.alert(response.data.result);
			if(response.data.result == "ON"){
				OnStates.push(response.data.coreInfo.deviceID);
				window.alert(OnStates.indexOf('53ff6f066667574834212367') > -1);
			}
		}, function errorCallback(response) {
				  	alert(response);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
	  	});

	  	$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/state?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //Light 3
		}).then(function successCallback(response) {
			//window.alert(response.data.result);
			if(response.data.result == "ON"){
				OnStates.push(response.data.coreInfo.deviceID);
			}
		}, function errorCallback(response) {
				  	alert(response);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
	  	});

	}



	$scope.toggleState = { checked: false };

  
  	$scope.$watch('toggleState.checked1', function(newValue, oldValue) {
	    if(newValue == true){
	      $http({
	            method: 'POST',
	            url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	            data: 'args=on',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        	})
	    }
	    else{
	    	$http({
	            method: 'POST',
	            url: 'https://api.particle.io/v1/devices/53ff72066667574817532367/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	            data: 'args=off',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        	})
	    }
  	});

  	$scope.$watch('toggleState.checked2', function(newValue, oldValue) {
	    if(newValue == true){
	      $http({
	            method: 'POST',
	            url: 'https://api.particle.io/v1/devices/53ff6f066667574834212367/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	            data: 'args=on',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        	})
	    }
	    else{
	    	$http({
	            method: 'POST',
	            url: 'https://api.particle.io/v1/devices/53ff6f066667574834212367/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	            data: 'args=off',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        	})
	    }
  	});

  	$scope.$watch('toggleState.checked3', function(newValue, oldValue) {
	    if(newValue == true){
	      $http({
	            method: 'POST',
	            url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	            data: 'args=on',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        	})
	    }
	    else{
	    	$http({
	            method: 'POST',
	            url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/led?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba',
	            data: 'args=off',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        	})
	    }
  	});

  	$scope.getUsage = function(event){
		$http({
			  method: 'GET',
			  url: 'https://api.particle.io/v1/devices/' + event.target.id + '/usageTime?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
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
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			  	alert("Timed out...Please try again later");
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	}

}])
   
.controller('temperatureCtrl', ['$scope', '$http', '$stateParams', '$ionicPopup', '$cordovaLocalNotification', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $ionicPopup, $cordovaLocalNotification) {
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
			  	alert(response);
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	}


}])
   
.controller('humidityCtrl', ['$scope', '$http', '$stateParams','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $rootScope) {

	$scope.getHumidity = function(){

		$http({
			  method: 'GET',
			  url: 'https://api.particle.io/v1/devices/230046001347343339383037/humidity?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {
				$scope.humidityTextArea = Math.round((response.data.result*100))/100;
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			  	alert("Timed out...Please try again later");
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
   
.controller('loginCtrl', ['$scope', '$http', '$stateParams', '$location', '$ionicLoading', '$ionicPopup', '$rootScope', '$ionicPush', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location, $ionicLoading, $ionicPopup, $rootScope, $ionicPush, $rootScope) {

	$scope.auth = function(){
		$ionicLoading.show({
  			template: '<p>Loading...</p><ion-spinner icon="android"></ion-spinner>'
        });

        //$rootScope.lights = [{name:"l1"}, {name: "l2"}, {name: "l3"}];

		$http({
	        method: 'POST',
	        url: 'http://54.173.72.95:8080/release-0.0.1-SNAPSHOT/rest/api/smarthome/authenticate',
	        data: 'username=' + $scope.data.username + '&password=' + $scope.data.password,
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			$scope.data.username = null;
			$scope.data.password = null;
			$location.path('/side-menu21/page7');
			$ionicLoading.hide();
		}, function errorCallback(response) {
			$scope.data.username = null;
			$scope.data.password = null;
		  	$location.path('/page4');
		  	$ionicLoading.hide();
	  	   	$ionicPopup.alert({
        		title: 'Login Failed!',
        		template: 'Please check username/password!'
    		});
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
	  	});

	}


}])


.controller('logoutCtrl', ['$scope', '$http', '$stateParams', '$location', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location, $ionicLoading, $ionicPopup) {

	$scope.logout = function(){
		$ionicLoading.hide();
		$location.path('/page4');
	}

}])

.controller('messagingCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$location', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $http, $stateParams, $location, $ionicLoading, $ionicPopup) {
	$scope.users = [];

	$http({
  	method: 'GET',
  	url: 'http://54.173.72.95:8080/release-0.0.1-SNAPSHOT/rest/api/smarthome/users?houseId=123'
	}).then(function successCallback(response) {
		for(i=0; i<response.data.data.length; i++){
			$scope.users[i] = {name: response.data.data[i].attributes.name, email: response.data.data[i].attributes.email, checked: false};
		}
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function errorCallback(response) {
	  	alert("Timed out...Please try again later");
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

}])



.controller('configurationsCtrl', ['$scope', '$http', '$stateParams', '$location', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location, $ionicLoading, $ionicPopup, sharedProperties) {

	$scope.saveData = function(l, t, h){
	    window.localStorage.setItem("light", l);
	    window.localStorage.setItem("temp", t);
	    window.localStorage.setItem("humidity", h);
	}

	$scope.loadData = function(){
	    $scope.lightThreshTextArea = window.localStorage.getItem("light");
	    $scope.tempThreshTextArea  = window.localStorage.getItem("temp");
	    $scope.humidityThreshTextArea  = window.localStorage.getItem("humidity");
  	}


}])


   
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
 