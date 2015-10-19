define(['backbone-nvd3'// Just for loading
        ], function() {
	'use strict';

	var ChartView = Backbone.nvd3.extend({
		
		createChart : function(nv){
			return nv.models.lineChart();
//				.x(function(d) { return d[self.xname] })
//	            .y(function(d) { return d[self.yname] });
		},
		
		update : function(){
			this.data[0].key = Math.random();
			
			Backbone.nvd3.prototype.update.apply(this, arguments);
		}
		
	});

	return ChartView;
});
