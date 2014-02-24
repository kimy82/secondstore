//code for log in facebook
var fb = require('facebook');
fb.appid = 1424716701093081;
fb.permissions = ['publish_stream', 'email', 'user_about_me', 'user_likes', 'offline_access', 'read_stream'];

fb.addEventListener('login', function(e) {
    if (e.success) {
        if (fb.loggedIn) {
            params = {
                access_token : fb.accessToken
            };
            fb.authorize();
            fb.requestWithGraphPath('/me', params, 'GET', function(e) {
                var result = JSON.parse(e.result);

                var longitude = "";
                var latitude = "";
                Titanium.Geolocation.getCurrentPosition(function(e) {
                    latitude = e.coords.latitude;
                    longitude = e.coords.longitude;

                });
                //Guarda user al servidor
                server.insertUser(result.username, "facebook", result.email, latitude, longitude);
                principal.setUser(result.username);

            });
        }
    }
});
fb.addEventListener('logout', function(e) {
    //delete user from db
    controlDB.deleteUser();
    alert('Logged out');
});

function logoutFacebook() {

    fb.logout();

}

