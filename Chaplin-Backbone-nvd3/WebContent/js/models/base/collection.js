define(['chaplin',
        'models/base/model'
        ], function(Chaplin, Model) {
	
	
	var Collection = Chaplin.Collection.extend({
		 model: Model,
	});

	return Collection;
	
});