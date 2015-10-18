
define(['chaplin',
        'router',
        ],function(Chaplin, Router ) {
	'use strict';

	var Application = Chaplin.Application.extend({

		title : 'Application',

		initialize : function(options) {
			console.debug('> application initialize');
			
			Chaplin.Application.prototype.initialize.apply(this, arguments);
			
			
			console.debug('< application initialize');
		},

		initRouter : function(routes, options) {
			this.router = new Router(options);
			return typeof routes === "function" ? routes(this.router.match) : void 0;
		}

	});

	return Application;
});
