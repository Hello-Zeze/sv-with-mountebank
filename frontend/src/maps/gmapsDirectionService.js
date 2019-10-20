class GmapsDirectionsService{
    constructor(googleMapInstance){
        this.directionsService = new window.google.maps.DirectionsService();        
        this.directionsRenderer = new window.google.maps.DirectionsRenderer({draggable: false});

        this.directionsRenderer.setMap(googleMapInstance);
    }

    getDirectionsForAddressPair(sourceAddress, destinationAddress){        
        return new Promise((resolve, reject)=>{
            const directionsRequest = {
                origin: sourceAddress,
                destination: destinationAddress,
                optimizeWaypoints: true,
                travelMode: window.google.maps.DirectionsTravelMode.DRIVING
            };

            this.directionsService.route(directionsRequest, function(response, status){
                if(status === window.google.maps.DirectionsStatus.OK){
                    resolve({transitPath: response.routes[0].overview_path});
                } else {
                    reject({response, status});
                }
            });
        });
    }
}

export default GmapsDirectionsService;