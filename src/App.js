/*Analisis para proyecto tienda casas - Platzi
Creado por: Andrés Alba
15 febrero 2021*/

/*global google*/

import { MAP } from 'react-google-maps/lib/constants';
import React, { Component } from 'react';
import './App.css';
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';
import {keyMap} from './constants'
import {getLocations} from './geocoding/index'


//const latlng = {lat:4.6560663,lng:-74.0595918};
const latlng = {lat:50.1,lng:-97.3};

function Map() {
  return (
	<GoogleMap defaultZoom={10} defaultCenter={latlng} onReady={console.log}/>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', requestedAddress: []};

    this.handleChange = this.handleChange.bind(this);
    this.fetch_data = this.fetch_data.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentDidMount () {
    this.mapInstance = this.mapNode.context[MAP]
    console.log(this.MAP)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async fetch_data(event){
    const locations = await getLocations(this.state.value);
    console.log(MAP);
    this.setState({requestedAddress: locations})

    event.preventDefault();
  }
  
  handleLocation(location){
    console.log(location, this._map)
  }

  render() {
    return (
      <div className="cont">  
      <div className= "item">
        <div>Ingrese la direccion</div>    
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        {this.state.requestedAddress.map((location)=>{
          return <li onClick={()=>this.handleLocation(location)}>{location.formatted_address}</li>
        })}
        <div className="item2">
          <
            WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${keyMap}&callback=iniciarMap`}
            loadingElement={<div style={{height:"100%"}}/>}
            containerElement={<div style={{height:"100%"}}/>}
            mapElement={<div style={{height:"100%"}}/>}
            ref={(el) => { this.mapNode = el }}
          />
        </div>
        <button className="btn" onClick={this.fetch_data}>Capture</button>
      </div>
      </div>

    );
  }
}

export default App;
