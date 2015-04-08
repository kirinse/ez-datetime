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
	'$compile',
	'$parse',
	'$document',
	'$position',
  'EzDatetimeConfigService',
  function(
		$compile,
		$parse,
		$document,
		$position,
    ConfigService
  ) {
    return {
      restrict: 'EA',
      require: 'ngModel',
			// templateUrl: 'ez_datetime_range_popup.html',
      scope: {
				isOpen: '=',
        ngModel: '=',
        from: '=?',
        to: '=?',
        config: '=?'
      },
      link: function(scope, $element, attrs, ngModel) {
        var rangeEnabled = false;

        scope.form = {};

        $element.addClass('ez-datetime-control');

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
				
	      scope.$watch('isOpen', function(value) {
	        if (value) {
	          scope.$broadcast('datepicker.focus');
	          scope.position = $position.position($element);
	          scope.position.top = scope.position.top + $element.prop('offsetHeight');

	          // $document.bind('click', documentClickBind);
	        } else {
	          // $document.unbind('click', documentClickBind);
	        }
	      });
				
	      var popupEl = angular.element('<div ez-datetime-popup-wrap><div>aaaaaa</div></div>');
	      var $popup = $compile(popupEl)(scope);
	      // Prevent jQuery cache memory leak (template is now redundant after linking)
	      popupEl.remove();
        $element.after($popup);
				console.log(attrs);
        // $element.bind('click', function() {
        //
        //   scope.form.date = ngModel.$modelValue;
        //
        //   // try to init from ngModel value first
        //   if (!!scope.form.date) {
        //     if (!!scope.form.date.from) {
        //       scope.form.from = scope.form.date.from;
        //     }
        //
        //     if (!!scope.form.date.to) {
        //       scope.form.to = scope.form.date.to;
        //     }
        //   }
        //
        //   // try to init from from/to scope attributes
        //   //
        //   scope.form.from = scope.from;
        //   scope.form.to = scope.to;
        //
        //   scope.form.isFrom = !!attrs.to && !!scope.form.to;
        //   scope.form.isTo = !!attrs.from && !!scope.form.from;
        //
        //   if (!scope.form.from && !scope.from) {
        //     scope.form.from = moment().format(scope.options.modelFormat);
        //   }
        //
        //   if (!scope.form.to && !scope.to) {
        //     scope.form.to = moment().format(scope.options.modelFormat);
        //   }
        //
        // });

      }
    };
  }
]);

