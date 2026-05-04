import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationaryName: string;
  lat: number;
  lng: number;
}

export function MapModal({ isOpen, onClose, stationaryName, lat, lng }: MapModalProps) {
  if (!isOpen) return null;

  // Using a rich OpenStreetMap style (Carto Voyager) that clearly shows roads, buildings, and POIs
  // It is free, open source, and does not require an API key
  const mapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {stationaryName} Location
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-grow relative bg-gray-100">
          <Map
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom: 16
            }}
            mapStyle={mapStyle}
          >
            <NavigationControl position="top-left" />
            <Marker longitude={lng} latitude={lat} color="#10B981" />
          </Map>
        </div>
        <div className="p-4 bg-gray-50 text-center text-sm font-medium text-gray-600">
          Showing live map data from OpenStreetMap (MapLibre)
        </div>
      </div>
    </div>
  );
}
