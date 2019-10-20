import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'react-google-map';
import GoogleMapLoader from 'react-google-maps-loader';
import ConfigDirectory from '../common/apiindex/ConfigDirectory';
import './gmap.css';

const GMAP_API_KEY = ConfigDirectory.getConfig('gmapsKey');

class GMap extends React.Component {
    static propTypes = {
        MapCenterPosition: PropTypes.object.isRequired,
        ZoomLevel: PropTypes.number.isRequired,
        MapMarkers: PropTypes.array,
        OnMapLoaded: PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
    }
    
    _onMapLoaded = (googleMaps, map) => {
        map.setMapTypeId(googleMaps.MapTypeId.ROADMAP);
        this.props.OnMapLoaded(map);
    }

    render(){
        return(
            <div id="map-display-container">
                <GoogleMap
                    googleMaps={this.props.googleMaps}
                    center={this.props.MapCenterPosition}
                    zoom={this.props.ZoomLevel}
                    onLoaded={this._onMapLoaded}                    
                    autoFitBounds={false}
                    disableDefaultUI={true}
                />
            </div>
        );
    }
}

export default GoogleMapLoader(GMap, { libraries:["places"], key: GMAP_API_KEY});
