define(['views/base/view',
        'views/base/collection_view',
        'models/base/model',
        'models/base/collection',
        'text!views/chart/chart.hbs',
        'text!views/chart/dot.hbs',
        'backbone-nvd3'// Just for loading
        ], function(View, CollectionView, Model, Collection, template, dotTemplate) {
	'use strict';

	var DotView = View.extend({
		template : dotTemplate
	});
	
	var ChartView = View.extend({
		
		template: template,

		tagName : 'div',

		container : '.bb_app',
		
		regions : {
			chart : ".bb_chart",
			list : ".bb_list"
		},
		
		events : {
			'click #add-dot' : 'add',
			'click #remove-dot' : 'remove'
		},
		
		initialize : function(){
			View.prototype.initialize.apply(this, arguments);
			
			this.collection = new Collection();
		},
		
		render : function(){
			View.prototype.render.apply(this, arguments);
			
			var	chart = new Backbone.nvd3({
				collection : this.collection,
				selector : '.bb_chart svg'
			});
			
			chart.render();
			
			var listView = new CollectionView({
				itemView : DotView,
				collection : this.collection,
				region : 'list'
			});
			this.subview('listView', listView);
		},
		
		add : function(){
			this.collection.add(new Model({
				date : new Date(),
				resultat : Math.floor(100*Math.random())
			}));
		},
		
		remove : function(){
			this.collection.remove(this.collection.at(0));
		}
		
	});

	return ChartView;
});
