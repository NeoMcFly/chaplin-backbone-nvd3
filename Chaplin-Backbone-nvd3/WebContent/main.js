
require.config({

	// The path where your JavaScripts are located
	baseUrl: './js/',

	// Specify the paths of vendor libraries
	paths: {

		'text': 						'../bower_components/requirejs-text/text',

		'jquery': 						'../bower_components/jquery/dist/jquery.min',

		'underscore': 					'../bower_components/underscore/underscore-min',

		'backbone': 					'../bower_components/backbone/backbone-min',
		'backbone-modelbinding': 		'../bower_components/backbone.modelbinding/backbone-modelbinding-min',
		'backbone-nested':		 		'../bower_components/backbone-nested-models/backbone-nested-models.min',

		'chaplin': 						'../bower_components/chaplin/chaplin.min',
		'handlebars': 					'../bower_components/handlebars/handlebars.amd.min'
	},

	map: {
	},

	shim: {
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'backbone-modelbinding': {
			deps: ['backbone']
		},
		'backbone-nested': {
			deps: ['backbone']
		},
		'chaplin': {
			deps: ['backbone'],
			exports: 'Chaplin'
		}
	}

});

require(['application',
         'routes'
         ],function(Application, routes) {

	new Application({
		pushState: false,
		routes: routes,
		controllerSuffix: '_controller'
	});
});