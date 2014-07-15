angular.module('dweave.modal.app', ['dweave.modal'])

.controller('DemoCtrl', function(modal, $scope){
  $scope.openModal = function(){
    modal.open();
  };
});