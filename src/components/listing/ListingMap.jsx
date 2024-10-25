import PropTypes from "prop-types";
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleIsSearchedOnSingleListing } from "../../redux/slices/listingSlice";
import { Link } from "react-router-dom";
import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const ListingMap = ({ listingList }) => {


  const mapRef = useRef(null);
  const [overlaysReady, setOverlaysReady] = useState(false);
  const [hoveredListingId, setHoveredListingId] = useState(null);
  const [clickedListingId, setClickedListingId] = useState(null);
  const [centerZoom, setCenterZoom] = useState({
    lat: 0,
    lng: 0,
    zoom: 13,
  });

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (listingList.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        listingList.forEach((listing) => {
          bounds.extend({ lat: listing.lat, lng: listing.lng });
        });
        map.fitBounds(bounds);
      }

      setTimeout(() => {
        setOverlaysReady(true);
      }, 200);
    },
    [listingList]
  );


  useEffect(() => {
    if (mapRef.current) {
      setOverlaysReady(true);
    }
  }, [mapRef]);

  const handleMouseEnter = (id) => {
    setHoveredListingId(id);
  };

  const handleMouseLeave = () => {
    setHoveredListingId(null);
  };

  const handleClick = (id, lat, lng) => {
    setClickedListingId(id === clickedListingId ? null : id);
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
    }
  };

  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(
    Array(listingList?.length).fill(0)
  );

  const handleSlide = (listingIndex, direction) => {
    const imagesCount = listingList[listingIndex].images.length;
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[listingIndex] =
        (newIndex[listingIndex] + direction + imagesCount) % imagesCount;
      return newIndex;
    });
  };

  const setSlide = (listingIndex, index) => {
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[listingIndex] = index;
      return newIndex;
    });
  };

  useEffect(() => {
    if (listingList.length > 0) {
      setCurrentIndex(Array(listingList?.length).fill(0));
      setCenterZoom({
        lat: listingList[0].lat,
        lng: listingList[0].lng,
        zoom: 13,
      });
    }
  }, [listingList]);


  const [mapStyle, setMapStyle] = useState({
    height: '80vh',
    width: '58.5vw',
    marginTop: '-47px'
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMapStyle({
          height: '70vh',
          width: '100vw',
          marginTop: '20px'
        });
      } else {
        setMapStyle({
          height: '80vh',
          width: '58.5vw',
          marginTop: '-47px'
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: mapStyle.height,
            width: mapStyle.width,
            marginTop: mapStyle.marginTop
          }}
          onLoad={onLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            keyboardShortcuts: false,
            gestureHandling: false,
            rotateControl: false,
            center: centerZoom,
            zoom: centerZoom.zoom,
          }}

        >
          {overlaysReady &&
            listingList.map((listing, listingIndex) => (
              <OverlayView
                key={listing.id}
                position={{ lat: listing.lat, lng: listing.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div
                  className="text-lg items-center bg-white w-[70px] p-2 rounded-lg shadow-lg font-bold relative"
                  onMouseEnter={() => {
                    handleMouseEnter(listing.id);
                  }}
                  onMouseOver={() => {
                    setCenterZoom({
                      lat: listing.lat,
                      lng: listing.lng,
                      zoom: 13,
                    });
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    handleClick(listing.id, listing.lat, listing.lng);
                  }}
                >
                  ${listing.price}

                  {hoveredListingId == listing.id &&
                    <div
                      key={listingIndex}
                      className={`absolute gap-y-4 w-[300px] bg-white rounded-2xl z-40`}
                    >
                      <div className="relative flex overflow-hidden col-span-2">
                        {listing?.images?.map((data, index) => (
                          <div
                            key={index}
                            className={`snap-start flex-shrink-0 w-full transition-transform duration-300
                        ${index === currentIndex[listingIndex] ? "block" : "hidden"
                              }`}
                          >
                            <img
                              className={` object-cover w-full rounded-xl `}
                              src={data.url}
                              alt=""
                            />
                          </div>
                        ))}

                        {listing?.images?.length > 1 && (
                          <div className="absolute inset-0 flex justify-between items-center">
                            <div
                              className="absolute left-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                              onClick={() => handleSlide(listingIndex, -1)}
                            >
                              <IoIosArrowBack size={14} />
                            </div>
                            <div
                              className="absolute right-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                              onClick={() => handleSlide(listingIndex, 1)}
                            >
                              <IoIosArrowForward size={14} />
                            </div>
                            <div className="absolute bottom-2 flex justify-center w-full">
                              {listing?.images?.map((_, index) => (
                                <GoDotFill
                                  key={index}
                                  size={14}
                                  onClick={() => setSlide(listingIndex, index)}
                                  className={`cursor-pointer text-white mx-px ${index == currentIndex[listingIndex]
                                    ? "opacity-100"
                                    : "opacity-60"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col col-span-3 py-2 px-2">
                        <div className="flex flex-col gap-4 text-[#333333] font-inter text-sm font-semibold">
                          <Link
                            to={`/listings/${listing.id}`}
                            onClick={() => dispatch(toggleIsSearchedOnSingleListing(false))}
                            className="text-sm font-inter tracking-[-1%] leading-6 line-clamp-2"
                          >
                            {listing.name}
                          </Link>
                        </div>

                        <div className="flex gap-x-3 text-[#7B6944] items-center font-inter tracking-[-1%]  text-[10px]">

                          <div className="flex gap-1 items-center">
                            <LuUsers size={14} /> {listing.personCapacity}
                            {listing.personCapacity > 1 ? " guests" : " guest"}
                          </div>

                          <div className="flex gap-1 items-center">
                            <TbBed size={14} /> {listing.bedroomsNumber}
                            {listing.bedroomsNumber > 1 ? " bedrooms" : " bedroom"}
                          </div>

                          <div className="flex gap-1 items-center">
                            <LuBath size={14} /> {listing.bathroomsNumber}
                            {listing.bathroomsNumber > 1 ? " baths" : " bath"}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </OverlayView>
            ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

ListingMap.propTypes = {
  listingList: PropTypes.array.isRequired,
};

export default ListingMap;
