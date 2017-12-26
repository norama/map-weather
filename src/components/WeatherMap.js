import PropTypes from 'prop-types';
import React, { Component } from 'react';

import JsonTable from 'ts-react-json-table';

import './WeatherMap.css';
import './JsonTable.css';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  PropTypes as MapPropTypes
} from 'react-leaflet';

import getWeather from '../services/WeatherData';

const WeatherPopup = (props) => {
  const w = props.weather;
  const rows = [{
    name: 'position', value: '(lat: '+w.coord.lat + ', lon: '+w.coord.lon + ')'
  }, {
    name: 'place', value: w.name + ' ('+ w.sys.country +')'
  }, {
    name: 'weather', value: w.weather[0].main + ': ' + w.weather[0].description
  }, {
    name: 'wind', value: 'speed (m/s): ' + w.wind.speed + (w.wind.deg ? '  direction (degrees): ' + w.wind.deg : '')
  }, {
    name: 'humidity (%)', value: w.main.humidity
  }, {
    name: 'pressure (hPa)', value: w.main.pressure
  }, {
    name: 'temperature (\u2103)', value: w.main.temp
  }];

  return <JsonTable rows={rows} settings={{header: false}} />;
};
 

class WeatherMarker extends Component {

  render() {
    return (
      <Marker
        ref={this.props.id}
        position={this.props.position}
        draggable={this.props.draggable}
        onDragend={this.handleDragend}>

        <Popup className='weatherPopup'>
          <WeatherPopup weather={this.props.weather} />
        </Popup>       
      </Marker>
    );
  }

  handleDragend = (e) => {
    this.props.onDragend(e.target._latlng);
  };
}

WeatherMarker.propTypes = {
  children: MapPropTypes.children,
  position: MapPropTypes.latlng,
}

class WeatherMarkersList extends Component {
  render() {
    const props = this.props;
    const items = props.markers.map(({ key, ...props }) => (
      <WeatherMarker key={key} {...props} />
    ));
    return <div style={{ display: 'none' }}>{items}</div>;   
  }
}

WeatherMarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
}

export default class WeatherMap extends Component {
  state = {
    latlng: {
      lat: 51.505,
      lng: -0.09,
    },
    weather: {},
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 13,
  }

  render() {

    const markers = [{ 
      key: 'marker1', 
      id: 'marker1',
      draggable: true,
      onDragend: this.updatePosition,
      position: [this.state.latlng.lat, this.state.latlng.lng], 
      weather: this.state.weather 
    }];

    return (
      <Map 
        center={this.state.center} 
        onLocationfound={this.handleLocationFound}
        ref="map"
        zoom={this.state.zoom}>

        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <WeatherMarkersList markers={markers} />
      </Map>
    )
  }

  updatePosition = (latlng) => {
    const self = this;
    getWeather(latlng, (weather) => {
      self.setState({
        latlng,
        weather
      });
    });

  }

  handleLocationFound = (e) => {
    this.setState({
      center: e.latlng
    }, () => {
      this.updatePosition(this.state.center);
    });
  };

  componentDidMount() {
    this.refs.map.leafletElement.locate();
  }
}
