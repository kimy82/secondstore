var args = arguments[0] || {};
var parent = args.parent;
var map = args.map;

var geoPoint = {
	latitude: "",
	longitude: "",
};

var createAccount = {
	validateEmail: function(email){
	    var re = /\S+@\S+\.\S+/;
    	return re.test(email);
	},
	insertUser : function() {	
		if(!createAccount.validateEmail($.email.value)){
			createAccount.showMessage("L' email no és correcte","KO","email");
		}else{
			if($.repeatpassword.value == $.password.value){
				server.insertUser( $.userName.value, $.password.value,$.email.value, geo.latitude,geo.longitude);
				principal.setUser($.userName.value);
				$.createAccount.close();
			}else{
				createAccount.showMessage("Els passwords no són iguals","KO","password");
			}
		}
	},
	showMessage: function(message,ok,title){
		Ti.UI.createAlertDialog({
			message : message,
			ok : ok,
			title : title
		}).show();
		
	},
	close : function(){
		
		$.createAccount.close();
	},
	
};

$.mapView.add(map);

$.createAccount.backgroundColor="#CCCCCC";

$.createAccount.open();
$.mybut.setTitle('Save');
