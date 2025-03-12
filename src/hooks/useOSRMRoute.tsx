import { useState } from "react";

function useOSRMRoute() {
  const [routeInfo, setRouteInfo] = useState<{ distance: number | null; duration: { hours: number; minutes: number } | null }>({
    distance: null,
    duration: null,
  });

  const fetchRoute = async (fromCoordinates:any, toCoordinates:any) => {
    if (fromCoordinates.lat && fromCoordinates.lon && toCoordinates.lat && toCoordinates.lon) {
      const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${fromCoordinates.lon},${fromCoordinates.lat};${toCoordinates.lon},${toCoordinates.lat}?overview=false&steps=false`;

      try {
        const response = await fetch(osrmUrl);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const distanceInKm = route.distance / 1000; 
          const durationInHours = Math.floor(route.duration / 3600); 
          const durationInMinutes = Math.floor((route.duration % 3600) / 60); 

          setRouteInfo({
            distance: distanceInKm, 
            duration: {
              hours: durationInHours,
              minutes: durationInMinutes,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching route from OSRM:", error);
      }
    }
  };

  return { routeInfo, fetchRoute };
}

export default useOSRMRoute;
