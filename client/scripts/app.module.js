(function () {

    'use strict';

    angular.module('app',
            [
                'ui.router',
                'app.constant',
                'app.jstest',
                'ngTable'
            ])
    .config(function ($stateProvider,  $urlRouterProvider) {

        $stateProvider.state('jstest', {
            name: 'jstest',
            url: '/jstest',
            templateUrl: 'views/jstest.html',
            controller: 'JstestController as JstestCtrl'
        });

         $urlRouterProvider.otherwise("/jstest");
    });
})();
