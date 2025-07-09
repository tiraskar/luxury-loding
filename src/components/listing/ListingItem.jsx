import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";

// Redux Actions
import { toggleHoverListing, toggleIsSearchedOnSingleListing } from "../../redux/slices/listingSlice";
import useInView from "../../hooks/userInView";

// Lazy-load image with blur effect
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ListingItem = ({ listing, isMapViewOpen, isScrolling }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();

    const [itemRef, isInView] = useInView();

    const handleSlide = (direction) => {
        const count = listing.images.length;
        const newIndex = (currentIndex + direction + count) % count;
        setCurrentIndex(newIndex);
    };

    const setSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleMouseEnter = () => {
        if (isMapViewOpen && !isScrolling) {
            // dispatch(toggleHoverListing(listing.id));
            itemRef.current = setTimeout(() => {
                dispatch(toggleHoverListing(listing.id));
            }, 1000);
        }
    };

    const handleMouseLeave = () => {
        if (isMapViewOpen) {
            clearTimeout(itemRef.current);
            dispatch(toggleHoverListing(null));
        }
    };

    const containerClasses = isMapViewOpen
        ? "relative lg:grid lg:grid-cols-5 gap-4 lg:space-y-0 space-y-4"
        : "relative flex flex-col xl:max-w-[318px] gap-y-4";

    return (
        <div
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={containerClasses}
        >
            {isInView ? (
                <>
                    {/* Image Carousel */}
                    <div className="relative flex overflow-hidden md:col-span-2">
                        <div className="flex-shrink-0 w-full transition-transform duration-300">
                            <LazyLoadImage
                                className={`object-cover w-full rounded-xl ${isMapViewOpen ? "lg:h-[150px]" : "md:h-[241px]"}`}
                                src={listing.images[currentIndex]?.url}
                                alt={listing.name}
                                effect="blur"
                                width="100%"
                                height="100%"
                            />
                        </div>

                        {listing.images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black h-6 w-6 bg-white/60 flex items-center justify-center rounded-full cursor-pointer"
                                    onClick={() => handleSlide(-1)}
                                >
                                    <IoIosArrowBack size={14} />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next image"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black h-6 w-6 bg-white/60 flex items-center justify-center rounded-full cursor-pointer"
                                    onClick={() => handleSlide(1)}
                                >
                                    <IoIosArrowForward size={14} />
                                </button>
                                <div className="absolute bottom-2 flex justify-center w-full">
                                    {listing.images.map((_, dotIndex) => (
                                        <button
                                            key={dotIndex}
                                            type="button"
                                            aria-label={`Go to image ${dotIndex + 1}`}
                                            onClick={() => setSlide(dotIndex)}
                                            className={`cursor-pointer text-white mx-px ${dotIndex === currentIndex ? "opacity-100" : "opacity-60"}`}
                                        >
                                            <GoDotFill size={14} />
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Listing Details */}
                    <div className="flex flex-col md:col-span-3 space-y-2">
                        <div className="flex flex-col gap-4 text-[#333333] font-inter text-lg font-semibold">
                            <Link
                                to={`/listings/${listing.id}`}
                                onClick={() => dispatch(toggleIsSearchedOnSingleListing(false))}
                                className="text-[18px] font-inter tracking-[-1%] leading-6 line-clamp-2"
                            >
                                {listing.name}
                            </Link>
                            <p className="line-clamp-2 text-[#8E8E80] leading-[20px] font-normal text-[13px] h-[40px]">
                                {listing.description}
                            </p>
                        </div>
                        <div className="flex gap-x-3 text-[#7B6944] items-center font-inter tracking-[-1%] text-[13px]">
                            <div className="flex gap-1 items-center">
                                <LuUsers size={14} />
                                {listing.personCapacity} {listing.personCapacity > 1 ? "guests" : "guest"}
                            </div>
                            <div className="flex gap-1 items-center">
                                <TbBed size={14} />
                                {listing.bedroomsNumber} {listing.bedroomsNumber > 1 ? "bedrooms" : "bedroom"}
                            </div>
                            <div className="flex gap-1 items-center">
                                <LuBath size={14} />
                                {listing.bathroomsNumber} {listing.bathroomsNumber > 1 ? "baths" : "bath"}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Placeholder when out of view
                <div className="w-full h-[250px] bg-gray-200 rounded-xl animate-pulse md:col-span-5" />
            )}
        </div>
    );
};

ListingItem.propTypes = {
    listing: PropTypes.object.isRequired,
    isMapViewOpen: PropTypes.bool.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    index: PropTypes.any,
};

export default ListingItem;
