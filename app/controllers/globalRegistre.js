var args = arguments[0] || {};
var parent = args.parent;
var indexWindow = args.indexWindow;

Ti.include("/js/facebook.js"); 

var globalRegistre = {
    _init : function() {
    },
};

//Butoon de registre
var buttonRegi = Titanium.UI.createButton({
    title : 'Registra \'t',
    top : 10,
    width : Ti.UI.SIZE,
    height : 50,
    id : 'buttonRegistre'
});

buttonRegi.addEventListener('click', function(e) {
    indexWindow.openCreateAccount();
});

//Button del facebook
$.buttonsregistre.add(button);
$.buttonsregistre.add(buttonRegi);
$.globalRegistre.open(); 