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
		
		color : '#C97289',
		
		configureChart : function(chart){
			Backbone.nvd3.prototype.configureChart.apply(this, arguments);
			
			chart.noData = function(){return 'Aucune donnée';};
			
			chart.duration(2000);
			
			console.log(chart);
			
			chart.yAxis.tickFormat(d3.locale.fr_FR.numberFormat(',.2f'));
			chart.yAxis.axisLabelDistance(-10);
			
			if(chart.y2Axis){
				chart.y2Axis.tickFormat(d3.locale.fr_FR.numberFormat(',.2f'));
				chart.y2Axis.axisLabelDistance(-10);
			}
			
			chart.useInteractiveGuideline = true;
			
			chart.tooltip.contentGenerator(function(data) {
			    return '<h3>'+data.series[data.seriesIndex].key+'</h3><p>' + data.point.x + ' : <b>' + data.point.y + '</b></p>';
			});
		}
		
	});

	ChartView.journalier = ChartView.extend({
		
		createChart : function(nv){
			var chart = nv.models.lineWithFocusChart();

			chart.margin({left: 120, right:50});
			
			this.defineXAxis(chart);
			
			return chart;
		},
		
		defineXAxis: function(chart){
			
			chart.xAxis.tickFormat( function(d) { 
				return d3.locale.fr_FR.timeFormat('%d/%m/%Y')(new Date(d));
			});
			chart.x2Axis.tickFormat( function(d) { 
				return d3.locale.fr_FR.timeFormat('%d/%m')(new Date(d));
			});
			
		}
	
	});
	
	ChartView.mensuel = ChartView.extend({
		
		createChart : function(nv){
			var chart = nv.models.lineChart(); 

			chart.margin({left: 120, right:60});
			
			this.defineXAxis(chart);
			
			return chart;
		},
		
		defineXAxis: function(chart){

			chart.xAxis.ticks( d3.time.months, 1);

			chart.xAxis.tickFormat( function(d) {
				return d3.locale.fr_FR.timeFormat('%b')(new Date(d));
			});

		}
		
	});
	
	return ChartView;
});
