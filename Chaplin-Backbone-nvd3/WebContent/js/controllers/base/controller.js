define(['chaplin',
        ], function(Chaplin) {
	'use strict';

	var Controller = Chaplin.Controller.extend({

		initialize: function() {
			Chaplin.Controller.prototype.initialize.apply(this, arguments);
		},

		use: function(view,options){
			var instanceView = new view(options);
			do{ // Ne pas avoir deux vues avec le meme nom aleatoire
				var name = Math.random();
				if (this[name] === undefined) {
					this[name] = instanceView;
					break;
				}
			}while(true);
			return instanceView;
		}

	});

	return Controller;

});
