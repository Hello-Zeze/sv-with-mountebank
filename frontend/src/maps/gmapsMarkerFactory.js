export default class GmapsMarkerFactory{
    static createMarker(googleMapInstance, spawnLocation, iconUrl){
        const icon = {
            anchor: new window.google.maps.Point(25,50),
            scaledSize: new window.google.maps.Size(120,120)
        };

        if(iconUrl!==undefined){
            icon.url = iconUrl;
        }

        return new window.google.maps.Marker({
            position: {lat: spawnLocation.lat, lng: spawnLocation.lng},
            map: googleMapInstance,
            icon
        });
    }
}