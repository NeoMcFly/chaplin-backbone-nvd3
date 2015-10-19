
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
			
			this.data = [{
				key: "Data One",
				values: [
		                  {"date": 15854, "open": 165.42, "high": 165.8, "low": 164.34, "close": 165.22, "volume": 160363400, "adjusted": 164.35},
		                  {"date": 15855, "open": 165.35, "high": 166.59, "low": 165.22, "close": 165.83, "volume": 107793800, "adjusted": 164.96},
		                  {"date": 15856, "open": 165.37, "high": 166.31, "low": 163.13, "close": 163.45, "volume": 176850100, "adjusted": 162.59},
		                  ]
			}]
			
	        this.chart = nv.models.lineWithFocusChart()
	            .x(function(d) { return d['date'] })
	            .y(function(d) { return d['close'] });
			
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
	
//		nv.addGraph(function() {
		
//	        var chart = nv.models.candlestickBar()
//	            .x(function(d) { return d['date'] })
//	            .y(function(d) { return d['close'] });
		
//	        d3.select("#chart1 svg")
//	                .datum(data)
//	                .transition().duration(500)
//	                .call(chart);
//	        nv.utils.windowResize(chart.update);
//	        return chart;
//	    });
		
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
