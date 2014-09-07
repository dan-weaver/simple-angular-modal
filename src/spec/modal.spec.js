describe('modal', function(){
  var modal, $document, $rootScope, $timeout;

  beforeEach(function(){

    module('dweave.modal');
    module('template/backdrop.html');

    inject(function(_modal_, _$document_, _$rootScope_, _$timeout_){
      modal = _modal_;
      $document = _$document_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
    });
    // clean dom
    $document.find('body *').remove();
  });


  it('should have a backdrop', function(){
    modal.open({template:'<div>test</div>'});
    $rootScope.$digest();
    // console.log($document.find('body div.dw-modal-page').html());
    expect($document.find('body div.dw-modal-page').length).toBe(1);
  });

  it('should close with result', function(){
    var modalInstance = modal.open({template:'<div>test</div>'});
    var result;
    modalInstance.result.then(function(res){
      result = res;
    });
    $timeout.flush();
    modalInstance.close('test');
    $rootScope.$digest();
    expect(result).toEqual('test');
    expect($document.find('body div.dw-modal-page').length).toBe(0);
  });

  it('should accept controllers and inject modal instances', function () {
    var TestCtrl = function($scope, $modalInstance) {
      $scope.fromCtrl = 'Content from ctrl';
      $scope.isModalInstance = angular.isObject($modalInstance) && angular.isFunction($modalInstance.close);
    };

    modal.open({template:'<div class="content">{{fromCtrl}}</div>', controller: TestCtrl});
    $rootScope.$digest();
    // $timeout.flush();
    expect($document.find('body .dw-modal-page .content').html()).toEqual('Content from ctrl');
  });


});