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
            utilsDB.wind.icone3view.removeEventListener('click',utilsDB.indexWindow.openGlobalRegistre);
            utilsDB.wind.icone3view.removeEventListener('click',utilsDB.setToIcone3);
            utilsDB.wind.icone3view.addEventListener('click', 
               utilsDB.indexWindow.openAddAnunci
            );
        } else {
            utilsDB.wind.icone3view.addEventListener('click', 
                utilsDB.indexWindow.openGlobalRegistre
            );
            
            utilsDB.wind.icone3view.addEventListener('click', 
                utilsDB.setToIcone3
            );
            utilsDB.wind.icone1view.addEventListener('click', 
                utilsDB.indexWindow.openGlobalRegistre
            );
            utilsDB.wind.icone1view.addEventListener('click', 
                utilsDB.setToIcone1
            );
            utilsDB.wind.icone2view.addEventListener('click',
                utilsDB.indexWindow.openGlobalRegistre
            );
            utilsDB.wind.icone2view.addEventListener('click', 
                utilsDB.setToIcone2
            );
        }
    },
    setToIcone3 : function(){
        utilsDB.indexWindow.to="icone3";
    },
      setToIcone2 : function(){
        utilsDB.indexWindow.to="icone2";
    },
      setToIcone1 : function(){
        utilsDB.indexWindow.to="icone1";
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
