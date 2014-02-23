//bootstrap the database

var db = Ti.Database.open('appstore');

var controlDB = {
    _init : function() {
        this._self = this;
    },
    populateDB : function() {
        db.execute('CREATE TABLE IF NOT EXISTS USER (id,name,password)');
    },
    saveUser : function(id, name, password) {
        user.name = name;
        user.password = password;
        user.id = id;
        _executionsDB.saveUser();
    },
    deleteUser : function() {

        _executionsDB.deleteUser();
    },
    errorCB : function(tx, err) {
        console.log("Error creating client table SQL: " + err);
    },
    successCB : function() {
        console.log("success: user table created!");
    },
};

var _executionsDB = {

    saveUser : function() {//Guarda dades del user a la BBDD del client. Agafa les dades de l'objecte user.

        var query = 'INSERT INTO USER (id,name,password) VALUES (\'' + user.getId() + '\',\'' + user.getName() + '\',\'' + user.getPassword() + '\')';
        db.execute(query);
    },
    deleteUser : function() {// Borra usuari de la BBDD del client

        var query = 'DELETE FROM USER WHERE 1=1';
        db.execute(query);

    },
    getUser : function() {//recuper usuari de la BBDD del client. Si no existeix retorna un user buit
        var query = 'SELECT * FROM USER WHERE 1=1';
        var rows = db.execute(query);
        user._init();
        while (rows.isValidRow()) {

            user.name = rows.fieldByName('name');
            user.password = rows.fieldByName('password');
            user.id = rows.fieldByName('id');
            rows.next();
        }
        rows.close();
        return user;

    },
};

//User object in the client side.
var user = {
    _init : function() {
        this.name = "";
        this.password = "";
    },
    getName : function() {
        return user.name;
    },
    getPassword : function() {
        return user.password;
    },
    getId : function() {
        return user.id;
    },
    name : "",
    password : "",
    id : "",
};
var utilsDB = {};

utilsDB = {
    _init : function(win, map, indexWindow) {
        utilsDB.wind = win;
        utilsDB.map = map;
        utilsDB.indexWindow = indexWindow;
    },
    configureIndex : function() {
        var userInDB = _executionsDB.getUser();
        if (userInDB.id != "") {
            utilsDB.wind.icone3.removeEventListener('click',utilsDB.indexWindow.openCreateAccount);
            utilsDB.wind.icone3.addEventListener('click', function(e) {
                var win = Alloy.createController('addAnunci', {
                    parent : utilsDB.wind,
                    map : utilsDB.map
                }).getView();
                win.open();
            });
        } else {
            utilsDB.wind.icone3.addEventListener('click', 
                utilsDB.indexWindow.openCreateAccount
            );
            utilsDB.wind.icone1.addEventListener('click', 
                utilsDB.indexWindow.openCreateAccount
            );
            utilsDB.wind.icone2.addEventListener('click',
                utilsDB.indexWindow.openCreateAccount
            );
        }
    },
    unRegisterAllEventListeners: function(obj) {
            if ( typeof obj._eventListeners == 'undefined' || obj._eventListeners.length == 0 ) {
                return; 
            }
            
            for(var i = 0, len = obj._eventListeners.length; i < len; i++) {
                var e = obj._eventListeners[i];
                obj.removeEventListener(e.event, e.callback);
            }
         
            obj._eventListeners = [];
},
};

var geo = {
    latitude : "",
    longitude : "",
    setGeoPoint : function(lat, lon) {
        geo.latitude = lat;
        geo.longitude = lon;
    },
};

user._init();
controlDB._init();
controlDB.populateDB();
