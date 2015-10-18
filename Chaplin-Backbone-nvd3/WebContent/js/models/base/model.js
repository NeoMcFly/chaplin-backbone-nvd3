define(['chaplin',
        'backbone-nested'
        ], function(Chaplin,NestedModel) {
	
	// Héritage de Backbone.NestedModel en plus de Chaplin Model
	_.extend(Chaplin.Model.prototype, Backbone.Model.prototype);
	
	var Model = Chaplin.Model.extend({
		
	});
	
	return Model;

});
