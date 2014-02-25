var args = arguments[0] || {};
var parent = args.parent;
var map = args.map;
var idAnunci = args.idAnunci;
var ipConections = args.ipConnections;

var detailAnunci = {
    _init: function(){
        detailAnunci.lan = "";
        detailAnunci.lon = "";
    },
    getInfoAnunci : function(idAnunci) {
        TiLoad.show();
        var url = "http://" + ipConections + "/rest/service/userService/getInfoAnunci?id=" + idAnunci;

        var client = Ti.Network.createHTTPClient({
            // function called when the response data is available
            onload : function(e) {
                var data = this.responseText;
                var jdata = JSON.parse(data);
                detailAnunci.placeInfo(jdata);
                TiLoad.hide();

            },
            // function called when an error occurs, including a timeout
            onerror : function(e) {
                Ti.API.debug(e.error);
                detailAnunci.errorAlert();
            },
            timeout : 60000 // in milliseconds
        });
        // Prepare the connection.
        client.open("GET", url);
        // Send the request.
        client.send();
    },
    placeInfo : function(json) {

        var intImage = 0, intImages = json.images.length;
        for ( intImage = 0; intImage < intImages; intImage = intImage + 1) {
            var img = Ti.UI.createImageView({
                id : "profilePic",
                image : json.images[intImage],
                borderColor : 'white',
                borderWidth : '10dp',
                width : Ti.UI.SIZE,
                top : '10dp'
            });
            $.con_foto.add(img);
            break;
        }

        $.name.setText(json.titol);
        $.price.setText(json.preu + " €");
        $.inText.setText(json.descripcio);
        detailAnunci.lan=json.latitud;
        detailAnunci.lon=json.longitud;
        
         var anotation2 = Titanium.Map.createAnnotation({
                latitude : detailAnunci.lan,
                longitude : detailAnunci.lon,
                title : 'Anunci',
                subtitle : 'centre',
                pinImage : "/pin.png",
                leftButton : "/images/appcelerator_small.png",
                myid : 1,
            });
        $.mapview.annotations = [anotation2];
        $.mapview.region = {
            latitude :detailAnunci.lan,
            longitude : detailAnunci.lon,
            latitudeDelta : 0.01,
            longitudeDelta : 0.01
        };
        
        

        TiLoad.hide();
    },
    errorAlert : function() {
        Ti.UI.createAlertDialog({
            message : 'Error carregant Anunci',
            ok : 'KO',
            title : 'ERROR'
        }).show();
    },
};

detailAnunci.getInfoAnunci(idAnunci);

function doClick(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
};

function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    if (OS_IOS) {
        $.mapview.region = {
            latitude : detailAnunci.lan,
            longitude : detailAnunci.lon,
            latitudeDelta : 0.01,
            longitudeDelta : 0.01
        };
    }
}



$.detail.open();
