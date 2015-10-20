
(function(){
	'use strict';
	
	var Chart = Backbone.nvd3 = Backbone.View.extend({
		
		key : null,
		
		chart : null,
		
		selector : null,
		
		data : null,
		
		initialize : function(options){
			Backbone.View.prototype.initialize.apply(this, arguments);
			
			this.collection = options.collection;
			if(!this.collection){
				throw new Error('A collection must be provided');
			}
			
			this.selector = this.selector || options.selector || '#chart';
			
			this.key   = this.key   || options.key   || '' ;
			this.xname = this.xname || options.xname || '' ;
			this.yname = this.yname || options.yname || '' ;
			
	        this.chart = this.createChart(nv);
			
			this.listenTo(this.collection, 'change add remove reset', this.update);
		},
		
		/**
		 * Default Type Chart
		 * 
		 */
		createChart : function(nv){
			var chart = nv.models.lineWithFocusChart();
			chart.duration(2000);
			return chart;
		},
		
		render : function(){
			var self = this;
			
			nv.addGraph(function() {

				self.data = [{
					key: self.key,
					values: self.map()
				}];
				
				d3.select(self.selector)
					.datum(self.data)
					.transition().duration(500)
					.call(self.chart);

				nv.utils.windowResize(self.chart.update);

				return self.chart;
			});
			
			return this;
		},
	
		/**
		 * Called when the chart must be refreshed
		 */
		update : function(){
			
			this.data[0].key = this.key;
			this.data[0].values = this.map(); 
			
			this.chart.update();
		},
		
		map: function(){
			var datas = this.collection.map(function(item,index){
				return {
					x : item.get(this.xname),
					y : item.get(this.yname)
				};
			},this);
			return datas;
		},
		
		remove : function(){
			if(nv.graphs && nv.graphs.length) {
				var self = this;
				nv.graphs = $.grep(nv.graphs, function(e){
				     return e.uid != self.chart.uid;
				});
			}
		}
		
	});
	
	return Backbone;
	
})();
