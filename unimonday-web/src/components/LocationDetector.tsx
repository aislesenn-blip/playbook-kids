"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/lib/store/location-store";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// A mock geofencing/location database mapping coordinates to campuses
const CAMPUSES = [
  { name: "UDSM", lat: -6.780, lng: 39.206, radiusKm: 5 }, // Approx UDSM coords
  { name: "Moshi Co-op", lat: -3.334, lng: 37.339, radiusKm: 5 }, // Approx Moshi coords
  { name: "UDOM", lat: -6.216, lng: 35.794, radiusKm: 10 },
];

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function LocationDetector() {
  const { campus, setCampus, isDetecting, setIsDetecting, error, setError } = useLocationStore();

  useEffect(() => {
    // Only run if campus is not yet determined
    if (campus || isDetecting) return;

    setIsDetecting(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        let detectedCampus = null;
        let minDistance = Infinity;

        for (const camp of CAMPUSES) {
          const distance = getDistance(userLat, userLng, camp.lat, camp.lng);
          if (distance <= camp.radiusKm && distance < minDistance) {
            detectedCampus = camp.name;
            minDistance = distance;
          }
        }

        if (detectedCampus) {
          setCampus(detectedCampus);
        } else {
          // Fallback or let them select
          setError("No campus detected nearby.");
        }
        setIsDetecting(false);
      },
      (err) => {
        setError("Unable to retrieve your location");
        setIsDetecting(false);
      },
      { timeout: 10000 }
    );
  }, [campus, isDetecting, setCampus, setIsDetecting, setError]);

  if (!campus && !isDetecting && !error) return null;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground transition-all",
      isDetecting && "animate-pulse"
    )}>
      <MapPin className="w-3.5 h-3.5 text-primary" />
      {isDetecting ? "Detecting campus..." : campus ? campus : "Select Campus"}
    </div>
  );
}
