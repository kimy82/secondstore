var args = arguments[0] || {};
var parent = args.parent;
var map = args.map;

Ti.include("/js/TiLoading.js");
TiLoad.init({ rotate: false });

var anunci = {
    _init : function(ip) {
        anunci.id = 'null';
        anunci.ipserver = ip;
        anunci.city = "";
    },
    setAnunciId : function(id) {
        anunci.id = id;
    },
    showMessage : function(message, ok, title) {
        Ti.UI.createAlertDialog({
            message : message,
            ok : ok,
            title : title
        }).show();

    },
    saveAnunciGetCity : function() {
        var user = _executionsDB.getUser();
        anunci.getCity(geo.latitude, geo.longitude);
    },
    save : function() {
        var user = _executionsDB.getUser();

        var url = "http://" + server.ip + "/rest/service/userService/saveAnunci?titol=" + $.titol.value + "&descripcio=" + $.descripcio.value + "&preu=" + $.preu.value + "&idAnunci=" + anunci.id + "&lon=" + geo.longitude + "&lat=" + geo.latitude + "&iduser=" + user.getId() + "&city=" + anunci.city;
        var client = Ti.Network.createHTTPClient({
            // function called when the response data is available
            onload : function(e) {

                var data = this.responseText;
                var jdata = JSON.parse(data);
                if (jdata.ok == 'ok') {
                    //Actualitza id de l'anunci i mostra missatge
                    anunci.showMessage('Guardat', 'OK', 'L\'anunci s\'ha guardat');
                    anunci.close();
                    //anunci.setAnunciId(jdata.id);
                } else {
                    anunci.showMessage('Error en el registre', 'KO', 'L\'anunci no s\'ha guardat');
                }
            },
            // function called when an error occurs, including a timeout
            onerror : function(e) {
                anunci.showMessage('Error en el registre', 'KO', 'L\'anunci no s\'ha guardat');
            },
            timeout : 5000 // in milliseconds
        });
        // Prepare the connection.
        client.open("GET", url);
        // Send the request.
        client.send();
    },
    close : function() {
        //posem id anunci a null i actualitzem l'scroll d'anuncis
        anunci.setAnunciId('null');
        parent.refreshscrollview.fireEvent("click");

        $.mapViewAnunci.remove(map);
        $.addAnunci.close();
    },
    createImageView : function(event) {

        return Ti.UI.createImageView({
            width : 100,
            height : 100,
            image : event.media
        });
    },
    addFotoFromGalery : function() {

        Titanium.Media.openPhotoGallery({

            success : function(event) {
                var image = event.media;

                var xhr = Titanium.Network.createHTTPClient();

                xhr.onerror = function(e) {
                    anunci.showMessage('Error', 'KO', 'La foto no s\'ha cargat');
                };
                xhr.onload = function() {
                    var data = this.responseText;
                    var jdata = JSON.parse(data);
                    if ("ok" == jdata.ok) {
                        anunci.setAnunciId(jdata.id);
                    }
                    TiLoad.hide();
                };
                xhr.onsendstream = function(e) {

                };
                xhr.setTimeout(10000);
                var user = _executionsDB.getUser();

                xhr.open('POST', 'http://' + anunci.ipserver + '/rest/service/userService/uploadFoto?idAnunci=' + anunci.id + '&idUser=' + user.id);

                xhr.setRequestHeader("contentType", "multipart/form-data");
                xhr.send({
                    file : image
                });
                TiLoad.show();
                var imageView = anunci.createImageView(event);
                $.fotosView.add(imageView);
            },
            cancel : function() {

            },
            error : function(error) {
            },
            allowImageEditing : true
        });
    },
    addFotoFromCamera : function() {
        Titanium.Media.showCamera({
            success : function(event) {
                // called when media returned from the camera
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

                    var imageView = anunci.createImageView(event);
                    var xhr = Titanium.Network.createHTTPClient();

                    xhr.onerror = function(e) {
                        anunci.showMessage('Error', 'KO', 'La foto no s\'ha cargat');
                    };
                    xhr.onload = function() {
                        var data = this.responseText;
                        var jdata = JSON.parse(data);

                        if ("ok" == jdata.ok) {
                            anunci.setAnunciId(jdata.id);
                        }
                        TiLoad.hide();
                    };
                    xhr.onsendstream = function(e) {

                    };
                    // open the client
                    xhr.setTimeout(10000);
                    var user = _executionsDB.getUser();
                    // alert(anunci.id);
                    xhr.open('POST', 'http://' + anunci.ipserver + '/rest/service/userService/uploadFoto?idAnunci=' + anunci.id + '&idUser=' + user.id);
                    xhr.setRequestHeader("contentType", "multipart/form-data");
                    // send the data
                    var image = event.media;

                    user = _executionsDB.getUser();
                    xhr.send({
                        file : image
                    });
                    TiLoad.show();
                    $.fotosView.add(imageView);
                } else {
                    anunci.showMessage('Error', 'KO', "got the wrong type back =" + event.mediaType);
                }
            },
            cancel : function() {
                // called when user cancels taking a picture
            },
            error : function(error) {
                // called when there's an error
                var a = Titanium.UI.createAlertDialog({
                    title : 'Camera'
                });
                if (error.code == Titanium.Media.NO_CAMERA) {
                    a.setMessage('Please run this test on device');
                } else {
                    a.setMessage('Unexpected error: ' + error.code);
                }
                a.show();
            },
            saveToPhotoGallery : true,
            allowEditing : true,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
        });
    },
    showGeo : function() {
        $.explicamapa.setHtml("Mou el mapa fins a cercar el teu punt");

        $.mapViewAnunci.add(map);
    },
    getCity : function(lat, lon) {
        var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + lat + "," + lon;
        /* web-service call */
        var addrReq = Titanium.Network.createHTTPClient();
        addrReq.open("GET", addrUrl);
        addrReq.send(null);

        addrReq.onload = function() {
            var response = JSON.parse(this.responseText);

            if (response.status == "OK") {
                anunci.city = response.results[0].address_components[2].long_name;
                anunci.save();
            } else {
                showAlert('', 'Unable to find Address');
            }

        };

    },
};

//Scroll view for fotos
var scrollFotosAnunci = Ti.UI.createScrollView({
    contentHeight : 100,
    contentWidth : Ti.UI.SIZE,
    height : 120,
    showHorizontalScrollIndicator : true,
    showVerticalScrollIndicator : false,
    width : Ti.UI.FILL
});

$.fotosView.add(scrollFotosAnunci);
//fi scroll view

anunci._init('www.alexmanydev.com/AppStore');
//anunci._init('192.168.1.65:8080/AppStore');

$.addAnunci.backgroundColor = "#CCCCCC";
$.saveAnunci.setTitle('guarda');
$.addFotoFromGaleria.setTitle('add Galeria');
$.addFotoFromCamera.setTitle('add Camera');
$.addAnunci.open(); 