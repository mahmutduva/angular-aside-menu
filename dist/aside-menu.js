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
        .directive('asideMenuToggle', ['$compile', function ($compile) {
            'use strict';

            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    scope.isOpen = false;
                    var menus = document.getElementsByTagName("aside-menu");
                    var targetMenu = {
                        "width": 275,
                        "isBackdrop": false
                    };

                    elem.bind('click', function () {
                        console.log(scope.isOpen)

                        var menuContent = document.getElementsByClassName("aside-menu-content");
                        if (scope.isOpen) {
                            angular.element(menuContent).css("transform", "translate3d(0px, 0px, 0px)");

                        }
                        angular.forEach(menus, function (item) {
                            if (scope.isOpen) {
                                angular.element(item).css("transform", "translate3d(0px, 0px, 0px)");

                            }
                            if (angular.element(item).attr("id") == attrs.asideMenuToggle) {
                                scope.targetMenu = angular.element(item);
                                targetMenu.width = angular.element(item).attr("width");
                                targetMenu.side = angular.element(item).attr("side");
                                targetMenu.push = angular.element(item).attr("push-content");
                                targetMenu.isBackdrop = angular.element(item).attr("is-backdrop");
                            }
                        });
                        if(scope.isOpen) scope.isOpen = false;
                        if (!scope.isOpen) {
                            if (targetMenu.side == "left") {
                                if (targetMenu.push == "true") {
                                    angular.element(menuContent).css("transform", "translate3d(" + targetMenu.width + "px, 0px, 0px)");
                                }
                                else {
                                    scope.targetMenu.css("transform", "translate3d(" + targetMenu.width + "px, 0px, 0px)");
                                }

                            }
                            else if (targetMenu.side == "right") {
                                if (targetMenu.push == "true") {
                                    angular.element(menuContent).css("transform", "translate3d(-" + targetMenu.width + "px, 0px, 0px)");

                                }
                                else {
                                    scope.targetMenu.css("transform", "translate3d(-" + targetMenu.width + "px, 0px, 0px)");
                                }

                            }
                            if(targetMenu.isBackdrop == "true"){
                                var el = $compile('<div close-aside-menu class="aside-back-drop fade"></div>')( scope );
                                angular.element(menuContent).append(el);

                            }

                            scope.isOpen  = true;

                        }
                        else {
                            if (targetMenu.push == "true") {
                                angular.element(menuContent).css("transform", "translate3d(0px, 0px, 0px)");

                            }
                            else {
                                scope.targetMenu.css("transform", "translate3d(0px, 0px, 0px)");
                            }
                            scope.isOpen  = false;
                        }

                    });
                }
            };
        }])
        .directive('asideMenu', function () {
            'use strict';

            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    angular.element(elem).addClass("aside-menu aside-menu-animate");
                    angular.element(elem).css({
                        "width": attrs.width + "px"
                    });
                    if (attrs.side == "left") {
                        angular.element(elem).css("left", 0);
                        if (attrs.pushContent == "false") {
                            angular.element(elem).css("z-index", "99");
                            angular.element(elem).css("left", "-" + attrs.width + "px");
                        }
                    }
                    else if (attrs.side == "right") {
                        angular.element(elem).css("right", 0);
                        if (attrs.pushContent == "false") {
                            angular.element(elem).css("z-index", "99");
                            angular.element(elem).css("right", "-" + attrs.width + "px");
                        }
                    }

                }
            };
        })
        .directive('asideMenuContent', function () {
            'use strict';

            return {
                restrict: 'AE',
                scope: true,
                link: function (scope, elem, attrs) {
                    angular.element(elem).addClass('aside-menu-content aside-menu-animate close-aside-menu');
                }
            };
        })
        .directive('closeAsideMenu', function () {
            'use strict';

            return {
                restrict: 'AC',
                link: function (scope, elem, attrs) {
                    elem.bind('click',function(){
                        var menuContent = document.getElementsByClassName("aside-menu-content");
                        angular.element(menuContent).css("transform", "translate3d(0px, 0px, 0px)");
                        scope.targetMenu.css("transform", "translate3d( 0px, 0px, 0px)");
                        scope.isOpen = false;
                        elem.remove();
                    })
                }
            };
        })



    return module
}));
