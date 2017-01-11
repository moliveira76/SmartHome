angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.light', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/light.html',
        controller: 'lightCtrl'
      }
    }
  })

  .state('menu.temperature', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/temperature.html',
        controller: 'temperatureCtrl'
      }
    }
  })

  .state('menu.humidity', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/humidity.html',
        controller: 'humidityCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.home', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page4')

  

});