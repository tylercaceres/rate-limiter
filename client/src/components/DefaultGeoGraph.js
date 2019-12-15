import React from "react";
import "./DefaultGeoGraph.css";
import {Map, TileLayer, Marker, Popup,CircleMarker} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import "react-leaflet-markercluster/dist/styles.min.css";
import { Button} from 'semantic-ui-react'

const DefaultGeoGraph = ({ data,markerData,...props }) => {
  const [markers,setMarkers] = React.useState([])
  const [selectedType,setSelectedType] = React.useState("events");
  const [currValueData,setCurrValueData] = React.useState([]);
  const [largestValue,setLargestValue]=React.useState(0);

  React.useEffect(()=>{
setMarkers(markerData);
  },[])

  React.useEffect(()=>{
  let tempData = data.map(record => {
    return {id:record.poi_id,value:Number(record[selectedType])}
  })
  let sumData = {}
  let largestNum = 0;
  for(const i in tempData){
    if(sumData[tempData[i].id]){
      sumData[tempData[i].id] += tempData[i].value;
      
    } else {
      sumData[tempData[i].id] = tempData[i].value;
    }

    if(sumData[tempData[i].id] > largestNum){
      largestNum = sumData[tempData[i].id];
    }
    setLargestValue(largestNum || 1);
  }
  setCurrValueData(sumData);
  },[selectedType])

  const buttonClickHandler =(e) => setSelectedType(e.target.name)

  return (
    <div>
    <Button.Group style={{margin:"2px"}}>
    <Button name="events" active={selectedType === "events"} onClick={buttonClickHandler}>Events</Button>
    <Button.Or />
    <Button name="impressions" active={selectedType==="impressions"} onClick={buttonClickHandler}>Impressions</Button>
    <Button.Or />
    <Button name="clicks" active={selectedType==="clicks"} onClick={buttonClickHandler}>Clicks</Button>
    <Button.Or />
    <Button name="revenue" active={selectedType==="revenue"} onClick={buttonClickHandler}>Revenue</Button>
  </Button.Group>

      {currValueData && markerData && (
    <Map center={[43.6708,-79.3899]} zoom={4} maxZoom={18}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
      {selectedType && markers.map((marker,index) => {
        let fraction=currValueData[marker.poi_id]/largestValue;
        return (
        <CircleMarker 
        key={marker.poi_id}
        center={[marker.lat,marker.lon]}
        color="red"
        radius={fraction*50}
        >
        <Popup>
          POI ID: {marker.poi_id}
          <br></br>
          Name: {marker.name}
          <br></br>
          Value: {currValueData[marker.poi_id]}
        </Popup>
      </CircleMarker>
        )
      })}
      </MarkerClusterGroup>
    </Map>)}
  </div>
  );
};

export default DefaultGeoGraph;

