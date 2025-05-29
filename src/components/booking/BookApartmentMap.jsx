import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  height: "150px",
  borderRadius: "12px",
  width: "100%",
};

const BookApartmentMap = ({ listingInfo }) => {
  const mapRef = useRef(null);
  const [overlaysReady, setOverlaysReady] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
  });

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (listingInfo) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: listingInfo.lat, lng: listingInfo.lng });

        map.fitBounds(bounds);
        const lat = listingInfo.lat;
        const lng = listingInfo.lng;
        setTimeout(() => {
          setOverlaysReady(true);
          mapRef.current.setZoom(13); // Set a default zoom level
          mapRef.current.panTo({ lat, lng });
        }, 200);
      } else {
        // Default location if no listingInfo is provided
        const lat = 27.9944024;
        const lng = -81.7602544;
        setTimeout(() => {
          setOverlaysReady(true);
          mapRef.current.setZoom(13); // Set a default zoom level
          mapRef.current.panTo({ lat, lng });
        }, 200);
      }
    },
    [listingInfo]
  );

  if (!isLoaded) {
    return (
      <div
        style={containerStyle}
        className="flex items-center justify-center bg-gray-100 rounded-md"
      >
        <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></span>
      </div>
    );
  }


  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={{
          height: "150px",
          borderRadius: "12px",
          width: "100%",
        }}
        onLoad={onLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          keyboardShortcuts: false,
          gestureHandling: "none",
          rotateControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
        }}
        center={{
          lat: listingInfo?.lat || 27.9944024,
          lng: listingInfo?.lng || -81.7602544,
        }}
      >
        {overlaysReady && (
          <OverlayView
            position={{ lat: listingInfo.lat, lng: listingInfo.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="bg-cardBackgroundDark opacity-70 w-[100px] h-[100px] rounded-full border-2 border-buttonPrimary  shadow-lg border-opacity-60"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </OverlayView>
        )}
      </GoogleMap>
    );
  };

  return (
    <div className="">
      {renderMap()}
    </div>
  );
};

BookApartmentMap.propTypes = {
  listingInfo: PropTypes.object,
};

export default BookApartmentMap;