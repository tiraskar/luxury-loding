import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const SharedLayout = () => {
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
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
      <div
        className={`fixed bottom-0 right-0 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={scrollToTop}
      >
        <BsFillArrowUpCircleFill color="#B69F6F" className="text-3xl cursor-pointer" />
      </div>
    </div>
  );
};

export default SharedLayout;