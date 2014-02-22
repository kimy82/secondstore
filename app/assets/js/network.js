function isNetwork() {
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		Titanium.API.info(' no connection present ');
		return false;				
		
	} else {
		Titanium.API.info(' connection present ');
		return true;
	}
}
