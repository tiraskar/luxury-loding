import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
const ListingTabs = ({ tabs, activeTab, setActiveTab }) => {

  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);


  const handleTabClick = (tab) => {
    if (tab === activeTab) return setActiveTab('');
    setActiveTab(tab);
    if (tabsRef.current[tab]) {
      tabsRef.current[tab].scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const activeIndex = tabs?.indexOf(activeTab);
    if (tabsRef.current[activeIndex]) {
      const activeTabElement = tabsRef.current[activeIndex];
      setUnderlineStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div className="">
      <ul className="flex flex-wrap  relative sm:justify-between">
        {tabs?.map((tab, index) => (
          <a
            href={`#${tab == "Reviews" ? "listing_reviews" : (tab == "Booking Terms" ? 'listing_booking_terms' : tab)}`}
            key={tab}
            className={`py-2 sm:py-[14px] px-[10px] cursor-pointer text-[#333333] ${activeTab === tab ? 'font-semibold opacity-100' : 'opacity-40'}`}
            onClick={() => {
              setActiveTab(tab);
              handleTabClick(tab);
            }
            }
            ref={(el) => (tabsRef.current[index] = el)}
          >
            {tab}
          </a>
        ))}
      </ul>
      <div className="hidden sm:block relative min-w-full h-px bg-[#E0E0E0]">
        <div
          className="absolute h-[2px] bg-[#B69F6F] transition-all"
          style={underlineStyle}
        ></div>
      </div>
    </div>
  );
};

ListingTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default ListingTabs;
