define(['views/base/view',
        'views/base/collection_view',
        'models/base/model',
        'models/base/collection',
        'chart/base/chart_view',
        'text!views/resultat/resultat.hbs',
        'text!views/resultat/dot.hbs'
        ], function(View, CollectionView, Model, Collection, ChartView, template, dotTemplate) {
	'use strict';

	var DotView = View.extend({
		template : dotTemplate
	});
	
	var ResultatView = View.extend({
		
		template: template,

		tagName : 'div',

		container : '.bb_app',
		
		regions : {
			chart : '.bb_chart',
			list  : '.bb_list'
		},

		events : {
			'click #add-dot' : 'add',
			'click #add-dot-365' : 'add365',
			'click #shuffle-dot' : 'shuffle',
			'click #remove-dot' : 'remove'
		},
		
		initialize : function(){
			View.prototype.initialize.apply(this, arguments);
			
			this.collection = new Collection();
		},
		
		render : function(){
			View.prototype.render.apply(this, arguments);
			
			var	chart = new ChartView({
				collection : this.collection,
				selector : '.bb_chart svg',
				key : 'Résultats',
				xname : 'date',
				yname : 'resultat',
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
				date : new Date().getTime(),
				resultat : Math.floor(100*Math.random())
			}));
		},
		
		add365 : function(){
			var datas = [];
			for (var int = 0; int < 365; int++) {
				datas.push(new Model({
					'date' : int,
					'resultat' : Math.floor(100*Math.random())
				}));
			}
			this.collection.reset(datas);
		},
		
		shuffle : function(){
			this.collection.each(function(item,index){
				item.set('resultat', Math.floor(100*Math.random()));
			},this);
		},
		
		remove : function(){
			this.collection.remove(this.collection.at(0));
		}
		
	});

	return ResultatView;
});
