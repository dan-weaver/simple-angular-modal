describe('modal', function(){
  var modal, $document, $rootScope;

  beforeEach(function(){

    module('dweave.modal');
    module('template/backdrop.html');

    inject(function(_modal_, _$document_, _$rootScope_){
      modal = _modal_;
      $document = _$document_;
      $rootScope = _$rootScope_;
    });

  });

  it('should have a backdrop', function(){
    modal.open();
    $rootScope.$digest();
    expect($document.find('body div.dw-modal-backdrop').length).toBe(1);
  });


});