define(['chaplin'], function(Chaplin) {

	var Router = Chaplin.Router.extend({

		removeDomaine : new RegExp('^.*#'),

		route : function(pathDesc, params, options) {
			if (typeof pathDesc === 'object') {
				// IE7 : href contient toujours l'url complete
				pathDesc.url = pathDesc.url.replace(this.removeDomaine, '');
			}
			Chaplin.Router.prototype.route.apply(this, arguments);
		}

	});

	console.debug('Router defined');

	return Router;
});
