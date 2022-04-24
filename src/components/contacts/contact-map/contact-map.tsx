import React from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet, { LatLngTuple } from 'leaflet';
import contactsMap from '../../../assets/img/marker.png';

const position:LatLngTuple = [59.968353, 30.317575]

const icon = new Leaflet.Icon({
  iconUrl: contactsMap,
  iconAnchor: [23.79, 61.06],

})

const ContactMap = () => {
  return (

    <MapContainer
      center={position}
      zoom={16}

      style={{ height: "100%", width: "100%", position: 'absolute', top: 0, left: 0, }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}  icon={icon}  >

      </Marker>
    </MapContainer>
  );
};

export default ContactMap;
