/**
 * Angular JS aside menu directive
 *
 * (c) Mahmut Duva <mahmutduva@gmail.com>
 * https://github.com/mahmutduva/angular-aside-menu
 *
 * Version: v0.1
 *
 * Licensed under the MIT license
 */

/*jslint unparam: true */
/*global angular: false, console: false, define, module */
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        // to support bundler like browserify
        module.exports = factory(require('angular'));
    } else {
        // Browser globals (root is window)
        factory(root.angular);
    }

}(this, function (angular) {
    'use strict';
    var module = angular.module('asideModule', [])

        .factory('asideMenu', function () {
            'use strict';

            var asideMenu = function (scope, elem, attrs, isOpen) {

                this.defaultOptions = {
                    "size": "240px",
                    "position": "left",
                    "backdrop": false
                };

                this.scope = scope;

                this.elem = elem;

                this.target = attrs.target;

                this.size = attrs.size;

                this.position = attrs.position;

                this.isOpen = isOpen;
                // Initialize aside menu
                this.init();
            };

            // Add instance methods
            asideMenu.prototype = {

                /**
                 * Initialize aside menu
                 *
                 * @returns {undefined}
                 */
                init: function () {
                    var target = document.getElementById(this.target);
                    if(!this.isOpen){
                        angular.element(target).addClass('open ' + this.position);
                    }
                    else{
                        angular.element(target).removeClass('open ' + this.position);
                    }

                }


            };

            return asideMenu;
        })

        .directive('asideMenu', ['asideMenu', function (asideMenu) {
            'use strict';

            return {
                restrict: 'E',
                scope: {
                    target: '=?'
                },

                link: function (scope, elem, attrs) {
                    var isOpen = true;
                    elem.bind('click', function () {
                        isOpen = !isOpen;
                        return new asideMenu(scope, elem, attrs, isOpen);
                    });
                }
            };
        }]);


    return module
}));
