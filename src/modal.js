angular.module('dweave.modal', [])

.factory('modal', function($document, $compile, $rootScope){

  var modal = {},
      backdropEl, backdropScope;

  modal.open = function() {
    var body = $document.find('body').eq(0);
    body.append(angular.element('<div class="test">test</div>'));
    // console.log(body);
    var backdropNode = angular.element('<div modal-backdrop></div>');
    backdropScope = $rootScope.$new(true);
    backdropEl = $compile(backdropNode)(backdropScope);
    body.append(backdropEl);
  };

  return modal;

})

.directive('modalBackdrop', function() {
  return {
    restrict: 'EA',
    replace:true,
    // templateUrl: 'template/backdrop.html',
    template: '<div class="dw-modal-backdrop"></div>',
    link: function (scope, element, attrs) {
      //optionally set an additional class on backdrop element
      scope.backdropClass = attrs.backdropClass || '';
    }
  };
});