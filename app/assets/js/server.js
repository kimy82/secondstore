var server = {
	_init: function(ip){
		server.ip=ip;
		server.init=0;
		server.userID="";
		
	},
	setParent: function(parent){
		server.parent = parent;
	},
	login : function(email, password,to){
	    TiLoad.show();
	    var url = "http://"+server.ip+"/rest/service/userService/login?user=" + email+ "&pass="+password;
	    var client = Ti.Network.createHTTPClient({
            // function called when the response data is available
            onload : function(e) {
                var data = this.responseText;
                var jdata = JSON.parse(data);
                if (jdata.ok == 'ok') {     
                    //Guarda user a la BD del device        
                    server.userID=  jdata.id;
                    controlDB.saveUser(jdata.id,jdata.userName, md5(password));
                    setTimeout(function(){utilsDB.configureIndex();},1000);
                    TiLoad.hide();
                    if(to=="icone3"){
                        server.parent.openAddAnunci();
                    }

                }else{
                     TiLoad.hide();
                     Ti.UI.createAlertDialog({
                        message : 'Error en el login',
                        ok : 'KO',
                        title : 'INCORRECTE'
                    }).show();
                }
            },
            // function called when an error occurs, including a timeout
            onerror : function(e) {
                Ti.API.debug(e.error);
                Ti.UI.createAlertDialog({
                    message : 'Error en el login',
                    ok : 'KO',
                    title : 'El login no s\'ha pogut finalitzar'
                }).show();
            },
            timeout : 60000 // in milliseconds
        });
        
        // Prepare the connection.
        client.open("GET", url);
        // Send the request.
        client.send();
	},
	insertUser : function(userName,password,email,lat,lon) {
			
		var url="";			
		if(password=="facebook"){
			var url = "http://"+server.ip+"/rest/service/userService/insert?user=" + userName+ "&pass=facebook&email="+email+"&lat="+lat+"&lon="+lon;
		}else{
			var url = "http://"+server.ip+"/rest/service/userService/insert?user=" + userName+ "&pass=" + md5(password)+"&email="+email+"&lat="+lat+"&lon="+lon;	
		}
		
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				var data = this.responseText;
				var jdata = JSON.parse(data);
				if (jdata.ok == 'ok') {
					//Guarda user a la BD del device		
					server.userID=	jdata.id;
					controlDB.saveUser(jdata.id,userName, md5(password));
					setTimeout(function(){utilsDB.configureIndex();},1000);
					Ti.UI.createAlertDialog({
						message : 'Registra\'t',
						ok : 'Okay',
						title : 'La teva compte s\'ha creat'
					}).show();
				}
				if(server.parent.to=="icone3"){
				  server.parent.openAddAnunci();
				}
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				Ti.UI.createAlertDialog({
					message : 'Error en el registre',
					ok : 'KO',
					title : 'El registre no s\'ha pogut finalitzar'
				}).show();
			},
			timeout : 60000 // in milliseconds
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	},
	sentNotification : function() {
			
		
		var url = "http://"+server.ip+"/rest/service/userService/sentNotification?userId="+server.userID;
	
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				Ti.UI.createAlertDialog({
					message : 'Error en el registre',
					ok : 'KO',
					title : 'El registre no s\'ha pogut finalitzar'
				}).show();
			},
			timeout : 90000 // in milliseconds
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	},	
};