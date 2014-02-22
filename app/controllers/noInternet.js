$.noInternet.open();
$.retry.setTitle("Reintentar");
var pb = $.pb;
var noIternet = {
	
	retry : function() {
		
		pb.show();
		pb.animate({
			width : 90,
			duration : 3000
		});
		if (isNetwork()) {
			var win = Alloy.createController('index').getView();
			setTimeout(function(e) {
				win.open();
			}, 2000);

		} else {
			setTimeout(function(e) {
				$.noInternet.remove(pb);
				pb = Titanium.UI.createProgressBar({
					id: 'pb',
					top : 10,
					width : 250,
					height : 'auto',
					min : 0,
					max : 10,
					value : 0,
					color : '#fff',
					message : 'Loading ...',
					font : {
						fontSize : 14,
						fontWeight : 'bold'
					},				
				});
				$.noInternet.add(pb);
			}, 2000);

		}

	}
};

