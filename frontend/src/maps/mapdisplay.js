import React from 'react';
import GMap from './gmap';
import PropTypes from 'prop-types';
import './mapdisplay.css';

export default class MapDisplay extends React.Component {
    static propTypes = {
        DefaultLocation: PropTypes.object.isRequired,
        ZoomLevel: PropTypes.number,
        OnMapLoaded: PropTypes.func.isRequired
    };
    getDefaultLocation = () => {
        return (this.props.DefaultLocation !== undefined) ? this.props.DefaultLocation: {lat: -29.8483747, lng: 30.9572539};
    }
    getZoomLevel = () => {
        return (this.props.ZoomLevel !== undefined)? this.props.ZoomLevel: 12;
    }
    render() {
        const defaultLocation = this.getDefaultLocation();
        const zoomLevel = this.getZoomLevel();
        return(
            <div id="map-container">
                <GMap 
                  MapCenterPosition={defaultLocation} 
                  ZoomLevel={zoomLevel} 
                  OnMapLoaded={this.props.OnMapLoaded}
                />
            </div>
        );
    }
}