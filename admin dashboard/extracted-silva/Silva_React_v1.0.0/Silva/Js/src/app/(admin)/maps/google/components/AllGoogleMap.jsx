import CommonCard from '@/component/CommonCard';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker, OverlayView, Polygon, StreetViewPanorama } from '@react-google-maps/api';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
const containerStyle = {
  width: '100%',
  height: '400px'
};
const center = {
  lat: -12.043333,
  lng: -77.028333
};
const MarkerMap = () => {
  const handleMarkerClick = () => {
    alert('You clicked on this marker');
    console.log({
      lat: -12.043333,
      lng: -77.03,
      title: 'Lima',
      details: {
        database_id: 42,
        author: 'HPNeo'
      }
    });
  };
  return <CommonCard title="Marker Map">
      <div className="google-maps">
        <LoadScript googleMapsApiKey="AIzaSyAgIfLQi8KTxTJahilcem6qHusV-V6XXjw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            <Marker position={{
            lat: -12.043333,
            lng: -77.03
          }} onClick={handleMarkerClick} />
          </GoogleMap>
        </LoadScript>
      </div>
    </CommonCard>;
};
const OverlayMaps = () => {
  return <CommonCard title='Overlay Map'>
      <div className="google-maps">
        <LoadScript googleMapsApiKey="AIzaSyAgIfLQi8KTxTJahilcem6qHusV-V6XXjw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            <OverlayView position={{
            lat: -12.043333,
            lng: -77.03
          }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div>
                Lima
              </div>
            </OverlayView>
          </GoogleMap>
        </LoadScript>
      </div>
    </CommonCard>;
};
const StreetViewMap = () => {
  return <CommonCard title="Street View Panorama Map">
      <div className="google-maps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <LoadScript googleMapsApiKey="AIzaSyAgIfLQi8KTxTJahilcem6qHusV-V6XXjw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} options={{
          streetViewControl: false
        }}>
            <StreetViewPanorama options={{
            visible: true,
            position: center,
            pov: {
              heading: 100,
              pitch: 0
            },
            panControl: true,
            zoomControl: true,
            fullscreenControl: false
          }} />

          </GoogleMap>
        </LoadScript>
      </div>
    </CommonCard>;
};
const TypeMap = () => {
  const containerStyle = {
    width: '100%',
    height: '400px'
  };
  const center = {
    lat: 37.7749,
    lng: -122.4194
  };
  return <CommonCard title='Type Map'>
      <div className="google-maps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <LoadScript googleMapsApiKey="AIzaSyAgIfLQi8KTxTJahilcem6qHusV-V6XXjw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} options={{
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'osm']
          },
          mapTypeControl: true
        }}></GoogleMap>
        </LoadScript>
      </div>
    </CommonCard>;
};
const PolygonsMap = () => {
  const polygonPath = [{
    lat: -12.040397656836609,
    lng: -77.03373871559225
  }, {
    lat: -12.040248585302038,
    lng: -77.03993927003302
  }, {
    lat: -12.050047116528843,
    lng: -77.02448169303511
  }, {
    lat: -12.044804866577001,
    lng: -77.02154422636042
  }];
  const polygonOptions = {
    fillColor: '#BBD8E9',
    fillOpacity: 0.6,
    strokeColor: '#BBD8E9',
    strokeOpacity: 1,
    strokeWeight: 3,
    clickable: true,
    editable: false,
    draggable: false
  };
  return <CommonCard title="Polygons Map">
      <div className="google-maps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <LoadScript googleMapsApiKey="AIzaSyAgIfLQi8KTxTJahilcem6qHusV-V6XXjw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} options={{
          streetViewControl: false
        }}>
            <Polygon paths={polygonPath} options={polygonOptions} />
          </GoogleMap>
        </LoadScript>
      </div>
    </CommonCard>;
};
const origin = {
  lat: -12.044012922866312,
  lng: -77.02470665341184
};
const destination = {
  lat: -12.090814532191756,
  lng: -77.02271108990476
};
const RoutesMaps = () => {
  const [directions, setDirections] = useState(null);
  const [requestRoute] = useState(false);
  return <CommonCard title="Routes Map">
      <div className="google-maps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <LoadScript googleMapsApiKey="AIzaSyAgIfLQi8KTxTJahilcem6qHusV-V6XXjw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13} options={{
          streetViewControl: false
        }}>
            {requestRoute && <DirectionsService options={{
            destination,
            origin,
            travelMode: google.maps.TravelMode.DRIVING
          }} callback={(result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
              setDirections(result);
            } else {
              console.error('Error fetching directions:', result);
            }
          }} />}

            {directions && <DirectionsRenderer options={{
            directions: directions,
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#131540',
              strokeOpacity: 0.6,
              strokeWeight: 6
            }
          }} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </CommonCard>;
};
const GoogleMaps = () => {
  return <>
      <Row>
        <Col xl={6}>
          <MarkerMap />
        </Col>
        <Col xl={6}>
          <OverlayMaps />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <StreetViewMap />
        </Col>
        <Col xl={6}>
          <TypeMap />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <PolygonsMap />
        </Col>
        <Col xl={6}>
          <RoutesMaps />
        </Col>
      </Row>
    </>;
};
export default GoogleMaps;
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA",
// })(GoogleMaps);