define(['controllers/base/controller',
        'views/resultat/resultat_view',
        ],function(Controller, ResultatView) {
	'use strict';

	var IndexController = Controller.extend({

		main: function(params,route) {

			this.use(ResultatView);

		}

	});
	
	return IndexController;
});
