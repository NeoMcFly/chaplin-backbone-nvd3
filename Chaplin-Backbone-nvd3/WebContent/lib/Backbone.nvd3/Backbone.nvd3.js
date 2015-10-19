
(function(){
	'use strict';
	
	var Chart = Backbone.nvd3 = Backbone.View.extend({
		
		chart : null,
		
		selector : null,
		
		chartData : null,
		
		initialize : function(options){
			Backbone.View.prototype.initialize.apply(this, arguments);
			
			this.collection = options.collection;
			if(!this.collection){
				throw new Error('A collection must be provided');
			}
			
			this.selector = options.selector || '#chart';
			
			this.key = options.key || '';
			this.xname = options.xname || '';
			this.yname = options.yname || '';
			
	        this.chart = this.createChart(nv);
			
			this.listenTo(this.collection, 'change add remove reset', this.update);
		},
		
		/**
		 * Default Type Chart
		 * 
		 */
		createChart : function(nv){
			var self = this;
			return nv.models.lineWithFocusChart()
				.x(function(d) { return d[self.xname] })
	            .y(function(d) { return d[self.yname] });
		},
		
		render : function(){
			var self = this;
			
			nv.addGraph(function() {

				var data = [{
					key: self.key,
					values: self.collection.toJSON()
				}];
				
				self.chartData = d3.select(self.selector).datum(data);

				self.chartData.transition().duration(500).call(self.chart);

				nv.utils.windowResize(self.chart.update);

				return self.chart;
			});
			
			return this;
		},
	
		/**
		 * Called when the chart must be refreshed
		 */
		update : function(){
			
			var data = [{
				key: this.key,
				values: this.collection.toJSON()
			}];
			
			// Update the SVG with the new data and call chart
			this.chartData.datum(data).transition().duration(3000).call(this.chart);
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
