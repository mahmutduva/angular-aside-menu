(function() {
    "use strict";

    describe('Init Test', function() {
        beforeEach(module('asideModule'));

        var element, scope;

        beforeEach(inject(function ($compile, $rootScope) {
            element = angular.element('<aside-menu id="sol1" side="left" width="400px" is-backdrop="true" push-content="true"></aside-menu>');
            scope = $rootScope;
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should have the class', function () {
            expect(element.hasClass('aside-menu')).to.equal(true);
        });

    });

}());

