define(['chaplin',
        'handlebars', 
        'backbone-modelbinding',
        ], function(Chaplin, Handlebars, ModelBinding) {
	'use strict';

	var View = Chaplin.View.extend({

		autoRender : true,
		
		// Méthodes de Chaplin
		initialize: function(options){
			Chaplin.View.prototype.initialize.apply(this, arguments);
			
			if(this.model == undefined && this.modelClass != null){
				this.model = new this.modelClass();
			}
			ModelBinding.bind(this);
			
		},
		
		close: function(){
			if(this.model != null){
				ModelBinding.unbind(this);
			}
			Chaplin.View.prototype.close.apply(this, arguments);
		},

		render: function(){
			Chaplin.View.prototype.render.apply(this, arguments);
			if(this.model != null){
				ModelBinding.bind(this);
			}
		},

		getTemplateFunction : function() {
			var template, templateFunc;
			template = this.template;
			if (typeof template === 'string') {
				templateFunc = Handlebars.compile(template);
				this.template = templateFunc;
			} else {
				templateFunc = template;
			}
			return templateFunc;
		}
		
	});

	return View;
});
