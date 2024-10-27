import { Outlet } from "react-router-dom";
import { Navbar, Footer, Wrapper } from "../components";
import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import useScrollToTop from "../hooks/scrollTop";
import { LoadScript } from "@react-google-maps/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const SharedLayout = () => {
  useScrollToTop()
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <Footer />
      <LoadScript loadingElement={<LoadingSpinner />} googleMapsApiKey={import.meta.env.VITE_MAP_KEY} />
      <Wrapper>
      <div
        className={`fixed bottom-0 right-0 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={scrollToTop}
      >
        <BsFillArrowUpCircleFill color="#B69F6F" className="text-3xl cursor-pointer" />
      </div>
      </Wrapper>
    </div>
  );
};

export default SharedLayout;