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
        .directive('asideMenuToggle', function () {
            'use strict';

            return {
                scope:true,
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var isOpen = false;

                    elem.bind('click', function () {
                        var menuContent = document.getElementsByClassName("aside-menu-content");
                        console.log(scope.isBackdrop)
                        if(!isOpen){
                            if (attrs.asideMenuToggle == "left") {
                                angular.element(menuContent).css("transform", "translate3d("+scope.width+"px, 0px, 0px)");
                                isOpen = true;

                            }
                            else if(attrs.asideMenuToggle == "right"){
                                angular.element(menuContent).css("transform", "translate3d(-"+scope.width+"px, 0px, 0px)");
                                isOpen = true;

                            }
                        }
                        else{
                            angular.element(menuContent).css("transform", "translate3d(0px, 0px, 0px)");
                            isOpen = false;
                        }

                    });
                }
            };
        })
        .directive('asideMenu', function () {
            'use strict';

            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    console.log(attrs)
                    scope.side = attrs.side;
                    scope.width = attrs.width;
                    scope.isBackdrop = attrs.isBackdrop;
                    angular.element(elem).addClass("aside-menu aside-menu-" + scope.side);
                    angular.element(elem).css("width", scope.width + "px");
                }
            };
        })
        .directive('asideMenuContent', function () {
            'use strict';

            return {
                restrict: 'AE',
                scope:true,
                link: function (scope, elem, attrs) {
                    angular.element(elem).addClass('aside-menu-content aside-menu-animate');
                }
            };
        })


    return module
}));
