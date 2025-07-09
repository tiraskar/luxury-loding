import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ListingItem from "./ListingItem"; // Import the new component
import clsx from 'clsx'; // A utility for conditionally joining class names

const RenderListings = ({ listingList }) => {
  const { isMapViewOpen } = useSelector(state => state.listing);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const containerRef = useRef(null); // Use a ref for the container

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      // After 250ms of no scroll, consider scrolling stopped
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250); // Shorter, more responsive timeout
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);
  // Empty dependency array as containerRef is stable

  // Use clsx for cleaner dynamic class names
  const containerClasses = clsx(
    "gap-x-4 gap-y-[56px]",
    {
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col lg:space-y-4 lg:gap-y-4": isMapViewOpen,
      "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": !isMapViewOpen
    }
  );

  return (
    <div id="listings-container" className={containerClasses}>
      {listingList?.map((listing, index) => (
        <ListingItem
          index={index}
          key={listing.id} // Always use a stable, unique ID for the key
          listing={listing}
          isMapViewOpen={isMapViewOpen}
          isScrolling={isScrolling}
        />
      ))}
    </div>
  );
};

RenderListings.propTypes = {
  listingList: PropTypes.array.isRequired,
};

export default RenderListings;