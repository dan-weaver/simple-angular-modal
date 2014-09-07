angular.module('dweave.modal', [])

.factory('modal', function($document, $compile, $rootScope, $controller, $q, $templateCache, $injector){

  function getTemplateAsPromise(options) {
    if (options.template) {
      return $q.when(options.template);
    }
    return $http.get(options.templateUrl,
      {cache: $templateCache}).then(function (result) {
        return result.data;
    });
  }

  function getResolvesAsPromise(resolves){
    var promisesArr = [];
    angular.forEach(resolves, function (value) {
      if (angular.isFunction(value) || angular.isArray(value)) {
        promisesArr.push($q.when($injector.invoke(value)));
      }
    });
    return promisesArr;
  }

  var modal = {};

  modal.open = function(modalOptions) {

    var modalScope = $rootScope.$new();

    var modalNode, modalEl;

    modalOptions.resolve = modalOptions.resolve || {};

    if (!modalOptions.template && !modalOptions.templateUrl) {
      throw new Error('One of template or templateUrl options is required.');
    }

    var modalResultDeferred = $q.defer();
    var modalOpenedDeferred = $q.defer();
    

    var modalInstance = {

        result: modalResultDeferred.promise,

        opened: modalOpenedDeferred.promise,

        close: function(result){
          modalScope.$destroy();
          modalEl.remove();
          modalResultDeferred.resolve(result);
        },

        dismiss:function(reason) {
          modalScope.$destroy();
          modalEl.remove();
          modalResulteDeferred.reject(reason);
        }

      };


    //resolve all resolves and temlpate
    $q.all([getTemplateAsPromise(modalOptions)].concat(getResolvesAsPromise(modalOptions.resolve))).then(function(res){
      
      
      // modalScope = $rootScope.$new();
      modalScope.$close = modalInstance.close;
      modalScope.$dismiss = modalInstance.dismiss;
      var ctrlInstance, ctrlLocals = {};

      if (modalOptions.controller) {
        ctrlLocals.$scope = modalScope;
        ctrlLocals.$modalInstance = modalInstance;
        angular.forEach(modalOptions.resolve, function (value, key) {
          ctrlLocals[key] = tplAndVars[resolveIter++];
        });

        ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
        // console.log("HEREEE");
      }

      //Open logic
      var body = $document.find('body').eq(0);
      modalNode = angular.element('<div modal-page></div>');
      modalNode.html(res[0]);
      modalEl = $compile(modalNode)(modalScope);
      body.append(modalEl);
    });

    
    return modalInstance;

  };

  return modal;

})

.directive('modalPage', function() {
  return {
    restrict: 'EA',
    replace:true,
    transclude:true,
    templateUrl: 'template/backdrop.html',
    // template: '<div class="dw-modal-backdrop"></div>',
    link: function (scope, element, attrs) {
      //optionally set an additional class on backdrop element
      scope.backdropClass = attrs.backdropClass || '';
    }
  };
})

.directive('modalWindow', function(){
  
});