import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";

import styles from "./Map.module.css";

import Button from "./Button";

import { useGeolocation } from "../hooks/useGeolocation";
import { useURLPosition } from "../hooks/useURLPosition";
import { useCities } from "../contexts/CitiesContext";
import { flagEmojiToImg } from "../helpers/flagEmojiToImg";

function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState<LatLngTuple>([49.2827, -123.1207]);
  const {
    isLoading,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();

  useEffect(() => {
    if (!lat && !lng) return;
    setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (!geoLocationPosition) return;
    setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "Loading..." : "Use your current location"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagEmojiToImg(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngTuple }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;
