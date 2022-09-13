import { useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
export default function LeafletMap() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) =>
      console.log(location)
    );
  }, []);
  return (
    <div className="h-96 w-96 container mx-auto mt-12">
      <MapContainer
        center={[35.5632375,45.3076142]}
        zoom={10}
        style={{ height: '100%', width: 'auto' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[35.5632375,45.3076142]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  );
}
