define(['controllers/base/controller',
        'views/chart/chart_view',
        ],function(Controller, ChartView) {
	'use strict';

	var IndexController = Controller.extend({

		main: function(params,route) {

			this.use(ChartView);

		}

	});
	
	return IndexController;
});
