import React from 'react';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Leaflet, { LatLngTuple } from 'leaflet';
import contactsMap from '../../../../assets/img/marker.png';

const COORDINATES: LatLngTuple = [59.968353, 30.317575];

const icon = new Leaflet.Icon({
  iconUrl: contactsMap,
  iconAnchor: [23.79, 61.06],
});

const ContactsMap = () => {
  return (
    <MapContainer
      center={COORDINATES}
      zoom={16}
      style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={COORDINATES} icon={icon}>
      </Marker>
    </MapContainer>
  );
};

export default ContactsMap;
