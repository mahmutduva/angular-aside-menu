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
                restrict: 'EA',
                link: function (scope, elem, attrs) {

                    var isOpen = false;
                    var menus = document.getElementsByTagName("aside-menu");
                    var targetMenu = {
                        "width": 275,
                        "isBackdrop": false
                    };

                    elem.bind('click', function () {

                        var menuContent = document.getElementsByClassName("aside-menu-content");

                        angular.forEach(menus, function (item) {
                            if (angular.element(item).attr("id") == attrs.asideMenuToggle) {
                                targetMenu.item = angular.element(item);
                                targetMenu.width = angular.element(item).attr("width");
                                targetMenu.side = angular.element(item).attr("side");
                                targetMenu.push = angular.element(item).attr("push");
                            }
                        });

                        if (!isOpen) {
                            if (targetMenu.side == "left") {
                                if (targetMenu.push == "true") {
                                    angular.element(menuContent).css("transform", "translate3d(" + targetMenu.width + "px, 0px, 0px)");
                                }
                                else {
                                    targetMenu.item.css("transform", "translate3d(" + targetMenu.width + "px, 0px, 0px)");
                                }

                            }
                            else if (targetMenu.side == "right") {
                                if (targetMenu.push == "true") {
                                    angular.element(menuContent).css("transform", "translate3d(-" + targetMenu.width + "px, 0px, 0px)");

                                }
                                else {
                                    targetMenu.item.css("transform", "translate3d(-" + targetMenu.width + "px, 0px, 0px)");
                                }

                            }

                            isOpen = true;

                        }
                        else {
                            if (targetMenu.push == "true") {
                                angular.element(menuContent).css("transform", "translate3d(0px, 0px, 0px)");

                            }
                            else {
                                targetMenu.item.css("transform", "translate3d(0px, 0px, 0px)");
                            }
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
                    angular.element(elem).addClass("aside-menu aside-menu-animate");
                    angular.element(elem).css({
                        "width": attrs.width + "px"
                    });
                    if (attrs.side == "left") {
                        angular.element(elem).css("left", 0);
                        if (attrs.push == "false") {
                            angular.element(elem).css("z-index", "99");
                            angular.element(elem).css("left", "-" + attrs.width + "px");
                        }
                    }
                    else if (attrs.side == "right") {
                        angular.element(elem).css("right", 0);
                        if (attrs.push == "false") {
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
                    angular.element(elem).addClass('aside-menu-content aside-menu-animate');
                }
            };
        });


    return module
}));
