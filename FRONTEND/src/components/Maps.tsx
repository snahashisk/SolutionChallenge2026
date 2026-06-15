"use client";
import React, { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

interface MapsProps {
  lat?: number | string;
  lng?: number | string;
}

const Maps = ({ lat, lng }: MapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const parsedLat = typeof lat === "string" ? parseFloat(lat) : lat;
  const parsedLng = typeof lng === "string" ? parseFloat(lng) : lng;

  const isValid =
    parsedLat !== undefined &&
    parsedLat !== null &&
    !isNaN(parsedLat) &&
    isFinite(parsedLat) &&
    parsedLng !== undefined &&
    parsedLng !== null &&
    !isNaN(parsedLng) &&
    isFinite(parsedLng);

  useEffect(() => {
    if (!isValid) return;

    const initMap = async () => {
      console.log("Map init");

      setOptions({
        key: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        v: "weekly",
      });

      try {
        const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
          importLibrary("maps"),
          importLibrary("marker"),
        ]);

        if (!mapRef.current) return;

        const center = { lat: parsedLat, lng: parsedLng };

        if (!mapInstance.current) {
          mapInstance.current = new Map(mapRef.current, {
            center,
            zoom: 14,
            mapId: "DEMO_MAP_ID",
          });
        } else {
          mapInstance.current.setCenter(center);
        }

        new AdvancedMarkerElement({
          map: mapInstance.current,
          position: center,
          title: "Selected Location",
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [parsedLat, parsedLng, isValid]);

  if (!isValid) {
    return (
      <div
        className="rounded-md flex items-center justify-center border bg-muted text-muted-foreground text-sm"
        style={{ width: "100%", height: "200px" }}
      >
        Location coordinates not available
      </div>
    );
  }

  return (
    <div
      className="rounded-md"
      ref={mapRef}
      style={{ width: "100%", height: "200px" }}
    />
  );
};

export default Maps;
