import { Link } from "react-router-dom";

const Navbar = () => {

  const renderNavbar = navLinks?.map(navLink => {
    return (
      <Link key={navLink.to} to={navLink.to} className="text-lg no-underline">
        {navLink.label}
      </Link>
    );
  });
  return (
    <div className="text-center text-lg bg-cardBackground">
      <p className="font-onest font-medium text-2xl">
        Luxury Lodging
      </p>
      <div>
        {renderNavbar}
      </div>
      <div>
        button
      </div>
    </div>
  );
};

export default Navbar;

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
  { label: "Listing", to: "/listing" },
];