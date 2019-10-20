class GmapsPlacesAutocompleteService {    
    configureAutocomplete(autocompleteTarget){
        return new Promise((resolve,reject)=>{
            debugger;
            const target = window.document.getElementById(autocompleteTarget);
            const autocomplete = new window.google.maps.Autocomplete(target);
            autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

            autocomplete.addListener('place_changed', function(e){
                console.log(`place_changed event: ${e}`);
                const place = autocomplete.getPlace();
                if(place.formatted_address !== undefined){
                    resolve(place.formatted_address);
                } else {
                    reject('No address components');
                }
            });
        });        
    }
}

export default GmapsPlacesAutocompleteService;