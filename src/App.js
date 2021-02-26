/*Analisis para proyecto tienda casas - Platzi
Creado por: Andrés Alba
15 febrero 2021*/

import React, { Component } from 'react';
import './App.css';
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';
import {keyMap} from './constants'
import {getLocations} from './geocoding/index'

const latlng = {lat:4.64391,lng:-74.06361};

function Map({ center }) {
  
  return (
	<GoogleMap defaultZoom={18} defaultCenter={latlng} center={center || latlng} />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', center: null};

    this.handleChange = this.handleChange.bind(this);
    this.fetch_data = this.fetch_data.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
    //console.log(event.target.value);
  }

  async fetch_data(event){
    const locations = await getLocations(this.state.value);
    this.setState({ 
      center: locations[0].geometry.location
     })

    event.preventDefault();
  }

  render() {
    return (
      <div className="cont">  
      <div className= "item">
        <div>Ingrese la direccion</div>    
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <div className="item2">
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${keyMap}&callback=iniciarMap`}
            loadingElement={<div style={{height:"100%"}}/>}
            containerElement={<div style={{height:"100%"}}/>}
            mapElement={<div style={{height:"100%"}}/>}
            center={this.state.center}
          />
        </div>
        <button className="btn" onClick={this.fetch_data}>Capture</button>
      </div>
      </div>

    );
  }
}

export default App;
