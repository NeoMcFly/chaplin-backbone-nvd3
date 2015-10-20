define(['backbone-nvd3'// Just for loading
        ], function() {
	'use strict';
	
	d3.locale.fr_FR = d3.locale({
		  decimal: ",",
		  thousands: " ",
		  grouping: [3],
		  currency: ["", " €"],
		  dateTime: "%A, le %e %B %Y, %X",
		  date: "%d/%m/%Y",
		  time: "%H:%M:%S",
		  periods: ["AM", "PM"], // unused
		  days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
		  shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
		  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
		  shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
	});
	
	var ChartView = Backbone.nvd3.extend({
		
		createChart : function(nv){
			var chart = nv.models.lineChart(); 

			chart.duration(2000);
			
			chart.noData = function(){return 'Aucune donnée';};
			
			chart.yAxis.axisLabel('Kg');
			chart.yAxis.axisLabelDistance(-10);
			
			this.defineXAxis(chart);
			
			return chart;
		},
		
		update : function(){
			this.key = Math.random();
			
			this.defineXAxis(this.chart);
			
			Backbone.nvd3.prototype.update.apply(this, arguments);
		},
		
		defineXAxis: function(chart){
			
			if(this.collection.length){
				
				var dataYear = new Date(this.collection.at(0).get(this.xname)).getYear();
				
				var timeScale = d3.time.scale().domain([new Date(dataYear, 0, 1), new Date(dataYear, 11, 31)]);
	
				chart.xScale( timeScale );
				
				chart.lines.xScale( timeScale );
				//chart.lines2.xScale( timeScale );
				
				chart.xAxis.ticks( d3.time.months, 1);
			
				chart.xAxis.tickFormat( function(d) {
					return d3.locale.fr_FR.timeFormat('%b')(new Date(d));
				});

			}
		}
		
	});

	return ChartView;
});
