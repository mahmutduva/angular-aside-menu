/**
 * Angular JS aside menu directive
 *
 * (c) Mahmut Duva <mahmutduva@gmail.com>
 * https://github.com/mahmutduva/angular-aside-menu
 *
 * Version: v1.4.1
 *
 * Licensed under the MIT license
 */


'use strict';
var module = angular.module('asideModule', [])


    .directive('asideMenuToggle', ['$compile', function ($compile) {
        'use strict';

        return {
            restrict: 'EA',
            link: function (scope, elem, attrs) {


                // is open menu
                scope.isOpen = false;


                // All Menus
                scope.menus = document.getElementsByTagName("aside-menu");


                // Menu Content
                scope.menuContent = document.getElementsByClassName("aside-menu-content");


                // Default menu Options
                scope.targetMenu = {
                    "item": null,
                    "width": 275,
                    "side": "left",
                    "pushContentContent": false,
                    "isBackdrop": false
                };


                // Click Event
                elem.bind('click', function () {

                    // reset menu content transform
                    angular.element(scope.menuContent).css("transform", "translate3d(0, 0, 0)");


                    // List all menus
                    angular.forEach(scope.menus, function (item) {


                        // Close menu
                        if (!angular.element(item).attr("fixed")) {
                            angular.element(item).css("transform", "translate3d(0, 0, 0)");
                        }


                        // Get target menu options from attrs
                        if (angular.element(item).attr("id") == attrs.asideMenuToggle) {
                            scope.targetMenu.item = angular.element(item);
                            scope.targetMenu.width = angular.element(item).attr("width");
                            scope.targetMenu.side = angular.element(item).attr("side");
                            scope.targetMenu.pushContent = angular.element(item).attr("push-content");
                            scope.targetMenu.isBackdrop = angular.element(item).attr("is-backdrop");

                            if (angular.element(item).attr("open")) {
                                angular.element(item).attr("open", false);
                                scope.$emit('getMenuState', false);

                            }
                            else {
                                angular.element(item).attr("open", true);
                                scope.$emit('getMenuState', true);
                            }

                            scope.targetMenu.open = angular.element(item).attr("open");

                        }


                    });


                    if (scope.targetMenu.open) {


                        if (scope.targetMenu.side == "left") {

                            if (scope.targetMenu.pushContent == "true") {


                                angular.element(scope.menuContent).css("transform", "translate3d(" + scope.targetMenu.width + ", 0, 0)");


                            }
                            else {
                                scope.targetMenu.item.css("transform", "translate3d( 100%, 0, 0)");

                            }


                        }
                        else if (scope.targetMenu.side == "right") {

                            if (scope.targetMenu.pushContent == "true") {


                                angular.element(scope.menuContent).css("transform", "translate3d(-" + scope.targetMenu.width + ", 0, 0)");


                            }
                            else {
                                scope.targetMenu.item.css("transform", "translate3d(-" + scope.targetMenu.width + ", 0, 0)");

                            }


                        }
                        if (scope.targetMenu.isBackdrop == "true") {


                            var el = $compile('<div close-aside-menu class="aside-back-drop in"></div>')(scope);

                            angular.element(scope.menuContent).append(el);


                        }


                    }
                    else {


                        if (scope.targetMenu.pushContent == "true") {


                            angular.element(scope.menuContent).css("transform", "translate3d(0, 0, 0)");


                        }
                        else {


                            scope.targetMenu.item.css("transform", "translate3d(0, 0, 0)");


                        }

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


                angular.element(elem).css({"width": attrs.width});


                if (attrs.side == "left") {


                    angular.element(elem).css("left", 0);


                    if (attrs.pushContent == "false") {


                        angular.element(elem).css("z-index", "99");

                        angular.element(elem).css("left", "-" + attrs.width);


                    }


                }
                else if (attrs.side == "right") {


                    angular.element(elem).css("right", 0);


                    if (attrs.pushContent == "false") {


                        angular.element(elem).css("z-index", "99");

                        angular.element(elem).css("right", "-" + attrs.width);


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


                elem.bind('click', function () {


                    angular.element(scope.menuContent).css("transform", "translate3d(0, 0, 0)");
                    scope.targetMenu.item.css("transform", "translate3d( 0, 0, 0)");
                    angular.element(scope.targetMenu.item).attr("open", false);
                    scope.$emit('getMenuState', false);
                    elem.remove();


                })


            }
        };
    });


