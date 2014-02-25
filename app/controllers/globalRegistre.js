var args = arguments[0] || {};
var parent = args.parent;
var indexWindow = args.indexWindow;

Ti.include("/js/facebook.js"); 

var globalRegistre = {
    _init : function() {
    },
};

//Butoon de registre
$.buttonNew.addEventListener('click', function(e) {
    indexWindow.openCreateAccount();
});

//Button del facebook
$.face.addEventListener('click', function(e) {
   fb.authorize();
});

//Button login
$.button.addEventListener('click', function(e){
    var  pass = $.textFieldPassword.value;
    var email = $.textFieldEmail.value;
    
    server.login(email,pass,indexWindow.to);
});
$.globalRegistre.open(); 