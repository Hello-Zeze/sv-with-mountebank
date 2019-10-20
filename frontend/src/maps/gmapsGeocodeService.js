class GmapsGeocodeService {
    constructor(){
        this.geocoder = new window.google.maps.Geocoder();
    }

    getAddressLatLng(address){
        return new Promise((resolve, reject)=>{
            this.geocoder.geocode({'address':address}, function(results, status){
                if(status === 'OK'){
                    resolve(results[0].geometry.location);
                } else {
                    reject(`Unsuccessful address geocode: ${status}`);
                }
            });
        });
    }
}

export default new GmapsGeocodeService();