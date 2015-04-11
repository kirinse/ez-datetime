/**
 * @TODO: will using dropdown-menu to implement
 **/
angular.module('ez.datetime')
.directive('ezDatetimePopupWrap', function() {
  return {
    restrict:'EA',
    replace: true,
    transclude: true,
    templateUrl: 'popup.html',
    link:function (scope, element) {
      element.bind('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  };
})
.directive('ezDatetimePopupControl', [
  'EzDatetimeConfigService',
  function(
    ConfigService
  ) {
    return {
      restrict: 'EA',
      require: 'ngModel',
			replace: true,
			templateUrl: 'popup.html',
      scope: {
        ngModel: '=',
        from: '=',
        to: '=',
        config: '='
      },
      link: function(scope, element, attrs, ngModel) {
        var rangeEnabled = false;
        scope.form = {};
        ConfigService.resolve(scope, attrs);
        if (!!attrs.from && !!attrs.to) {
          rangeEnabled = true;
        }
        ngModel.$formatters.push(function(v) {
          if (v) {
            if (rangeEnabled && scope.options.modelBinding === 'default') {
              v = moment(v.from).format(scope.options.viewFormat) + ' - ' + moment(v.to).format(scope.options.viewFormat);
            } else {
              v = moment(v).format(scope.options.viewFormat);
            }
          }
          return v;
        });
				angular.element(element.find('a')[0]).bind('click',function(evt){
					var opened = element.hasClass('open');
					if(!opened) {
						console.log(ngModel.$viewValue);
						scope.form.date = ngModel.$modelValue;
	          // try to init from ngModel value first
		        if (!!scope.form.date) {
		          if (!!scope.form.date.from) {
		            scope.form.from = scope.form.date.from;
		          }

		          if (!!scope.form.date.to) {
		            scope.form.to = scope.form.date.to;
		          }
		        }
	          // try to init from from/to scope attributes
	          //
	          scope.form.from = scope.from;
	          scope.form.to = scope.to;

	          scope.form.isFrom = !!attrs.to && !!scope.form.to;
	          scope.form.isTo = !!attrs.from && !!scope.form.from;

	          if (!scope.form.from && !scope.from) {
	            scope.form.from = moment().startOf('day').format(scope.options.modelFormat);
	          }

	          if (!scope.form.to && !scope.to) {
	            scope.form.to = moment().endOf('day').format(scope.options.modelFormat);
	          }
            scope.from = scope.form.from;
            scope.to = scope.form.to;
						ngModel.$setViewValue({from:scope.form.from,to:scope.form.to});
						ngModel.$render();
						element.addClass('open');
					}
					else {
						element.removeClass('open');
					}
				});
				scope.ok = function(){
					// var v = {};
					// v.from = scope.from = scope.form.from;
					// v.to = scope.to = scope.form.to;
					ngModel.$setViewValue({from:scope.form.from,to:scope.form.to});
					ngModel.$render();
					console.log(scope);
				};
      }
    };
  }
]);

