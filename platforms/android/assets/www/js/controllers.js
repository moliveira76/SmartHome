angular.module('app.controllers', [])

.controller('lightStateCtrl', ['$scope', '$http', '$stateParams',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $timeout, $stateParams) {

	$scope.checkStatus = function(){
		$http({
	        method: 'GET',
	        url: 'https://api.particle.io/v1/devices/53ff6f066667574835380967/state?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba' //Light 3
		}).then(function successCallback(response) {
			window.alert(response.data.result);
		}, function errorCallback(response) {
				  	alert(response);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
	  	});
	}

}])





  
.controller('lightCtrl', ['$scope', '$http', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $timeout, $stateParams) {

	$scope.toggleState = { checked: false };
  
  	$scope.$watch('toggleState.checked', function(newValue, oldValue) {
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

}])
   
.controller('temperatureCtrl', ['$scope', '$http', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams) {
	$scope.image = "temperature.png";

	$scope.getTemp = function(){
		$http({
			  method: 'GET',
			  url: 'https://api.particle.io/v1/devices/230046001347343339383037/tempC?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {
				$scope.tempTextArea = Math.round((response.data.result*100))/100;
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
   
.controller('humidityCtrl', ['$scope', '$http', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams) {

		$scope.getHumidity = function(){

		$http({
			  method: 'GET',
			  url: 'https://api.particle.io/v1/devices/230046001347343339383037/humidity?access_token=04b90f278a1415636513f0f71fe9f89e92cdfcba'
			}).then(function successCallback(response) {

				$scope.humidityTextArea = Math.round((response.data.result*100))/100;
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			  	alert(response);
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
   
.controller('loginCtrl', ['$scope', '$http', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location) {

	$scope.auth = function(){

		$http({
	        method: 'POST',
	        url: 'http://54.173.72.95:8080/release-0.0.1-SNAPSHOT/rest/api/smarthome/authenticate',
	        data: 'username=' + $scope.data.username + '&password=' + $scope.data.password,
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).then(function successCallback(response) {
			$location.path('/side-menu21/page7');

		}, function errorCallback(response) {
		  	$location.path('/page4');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
	  	});

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
 