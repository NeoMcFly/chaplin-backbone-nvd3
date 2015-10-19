
(function(){
	'use strict';
	
	var Chart = Backbone.nvd3 = Backbone.View.extend({
		
		chart : null,
		
		data : null,
		
		selector : null,
		
		initialize : function(options){
			Backbone.View.prototype.initialize.apply(this, arguments);
			
			this.collection = options.collection;
			if(!this.collection){
				throw new Error('A collection must be provided');
			}
			
			this.selector = options.selector || '#chart'
			
			this.key = options.key || '';
			this.xname = options.xname || '';
			this.yname = options.yname || '';
			
			this.data = [{
				key: this.key,
				values: []
			}]
			
	        this.chart = this.createChart(nv);
			
			this.listenTo(this.collection, 'change add remove reset', this.update);
		},
		
		/**
		 * Default Type Chart
		 * 
		 */
		createChart : function(nv){
			var self = this;
			return nv.models.lineWithFocusChart();
//				.x(function(d) { return d[self.xname] })
//	            .y(function(d) { return d[self.yname] });
		},
		
		render : function(){
			var self = this;
			
			nv.addGraph(function() {

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
			console.log('1');
			this.data[0].values = this.map();
			console.log('2');
			this.chart.update();
			console.log('3');
		},
		
		map: function(){
			var datas = this.collection.map(function(item,index){
				return {
					x : item.get(this.xname),
					y : item.get(this.yname)
					}
			},this);
			return datas;
		},
		
		remove : function(){
			if(nv.graphs.length) {
				var self = this;
				nv.graphs = $.grep(nv.graphs, function(e){
				     return e.uid != self.chart.uid;
				});
			}
		}
		
	});
	
	return Backbone;
	
})();
