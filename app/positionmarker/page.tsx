"use client";
import { useEffect, useMemo } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface LocationData {
  latitude: number;
  longitude: number;
}
interface MarkerProps {
  data: LocationData;
}
export default function Postionmarker({ data }: MarkerProps) {
  const position: [number, number] = useMemo(() => {
    return [data.latitude, data.longitude];
  }, [data.latitude, data.longitude]);
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);
  return (
    <Marker
      icon={L.icon({
        iconUrl: "/icon-location.svg",
        iconSize: [32, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      })}
      position={position}
    >
      <Popup>This is the location of the IP address or Domain</Popup>
    </Marker>
  );
}
