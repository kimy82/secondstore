var args = arguments[0] || {};
var parent = args.parent;
var map = args.map;

function doClick(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
};

function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    if (OS_IOS) {
        $.mapview.region = {
            latitude:37.390749, longitude:-122.081651,
            latitudeDelta:0.01, longitudeDelta:0.01
        };
    }
}

// These parameters can also be defined in the TSS file.
$.mapview.annotations = [$.mountainView];
$.mapview.region = {latitude:37.390749, longitude:-122.081651, latitudeDelta:0.01, longitudeDelta:0.01};

$.detail.open();
