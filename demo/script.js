var app = angular.module('myApp', ['ez.datetime','ui.bootstrap']);

app.controller('myCtrl', function($scope) {
  $scope.config1 = {
    format: 'YYYY/MM/DD HH:mm',
    ranges: {
       'Today': [moment(), moment()],
       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
       'Tomorrow': [moment().add(1, 'days'), moment().add(1, 'days')],
       'This Week': [moment().startOf('week'), moment().endOf('week')],
       'Last Week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
       'This Month': [moment().startOf('month'), moment().endOf('month')],
       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  };

  $scope.config2 = {
    format: 'YYYY/MM/DD HH:mm',
		okBtnText: 'FINE',
		minuteStep: 10,
		meridiemEnabled: true,
		hourFormat: 'HH',
		minuteFormat: 'mm',
		modelFormat: 'YYYY/MM/DD HH:mm',
		viewFormat: 'YYYY/MM/DD HH:mm',
		timepickerEnabled: true
  };
  $scope.form = {
    //date3: moment().format()
		// date4Range: {from:moment().startOf('day'),to:moment().endOf('day')}
		date4RangeFrom: moment().subtract(1, 'days').startOf('day').format($scope.config2.modelFormat), 
		date4RangeTo: moment().subtract(1, 'days').endOf('day').format($scope.config2.modelFormat),
		date5RangeFrom: moment().subtract(1, 'days').startOf('day').format($scope.config2.modelFormat), 
		date5RangeTo: moment().subtract(1, 'days').endOf('day').format($scope.config2.modelFormat)
  };

  $scope.$watch('form', function(newVal) {
    // console.log('form changed');
    console.log(newVal);
  }, true);

  $scope.clear = function(property) {
    $scope.form[property] = null;
  };
});
