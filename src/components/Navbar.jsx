import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setUser } from '../redux/slices/authSlice';
import toast from "react-hot-toast";
import { RiMenu2Line } from "react-icons/ri";
import { MdClose } from 'react-icons/md';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth); // Get the user from Redux store
  const [showProfile, setShowProfile] = useState(false); // State for showing/hiding the profile dropdown
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const dispatch = useDispatch();

  // Define the navigation links
  const links = [
    { id: 1, name: 'Customers', path: '/customers' },
    { id: 2, name: 'Coupons', path: '/coupons' },
    { id: 3, name: 'Orders', path: '/orders' }
  ];

  // Get the current path from react-router location
  const location = useLocation();
  const currentPath = location.pathname;

  // Handle user logout
  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('token')
     // Clear user state
    toast.success("Logout successful."); // Show success message
  };

  return (
    <nav className="bg-[var(--red)] text-white py-4 custom-shadow">
      <div className="container mx-auto flex items-center justify-between px-3">
        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(true)} className="md:hidden block">
          <RiMenu2Line size={25} />
        </button>

        {/* Left section: brand logo and navigation links (hidden on mobile) */}
        <div className="flex items-center gap-5">
          <div className="md:flex gap-5 items-center hidden">
            <Link className="text-2xl font-semibold" to="/">
              V Coupon
            </Link>

            {/* Render navigation links dynamically */}
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`${link.path === currentPath ? 'bg-white text-[var(--red)]' : ''
                  } px-3 py-2 rounded-md`} // Add padding and rounded corners for better UI
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Profile icon */}
        <div className="cursor-pointer relative" onClick={() => setShowProfile(!showProfile)}>
          <img
            src="/user.png"
            alt="profile"

            className="w-10 bg-white rounded-full"
          />
          {/* Profile dropdown (shown when showProfile is true) */}
          {showProfile && (
            <div className="flex flex-col items-start bg-white z-50 gap-2 custom-shadow absolute text-black rounded-lg p-3 top-12 right-5 border">
              <p>{user.username}</p>

              <hr className="w-full" />
              <Link to={"/settings"}>Settings</Link>
              <hr className="w-full" />
              <button
                className="bg-[var(--red)] w-full rounded-lg py-1 text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>



        {/* Mobile menu (shown when isOpen is true) */}
        <div
          className={`absolute w-full mobile-menu h-full bg-[var(--red)] top-0 ${isOpen ? 'left-0' : '-left-full'} z-50 gap-5 flex flex-col items-center justify-center md:hidden`}
        >
          <button onClick={() => setIsOpen(false)} className="absolute top-2 left-2">
            <MdClose size={25} />
          </button>
          <h2 className='text-2xl font-bold '>V Coupon</h2>
          {/* Render mobile navigation links */}
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close the mobile menu when a link is clicked
              className={`text-xl ${link.path === currentPath ? 'bg-white  text-[var(--red)]' : ''
                } px-3 py-2 rounded-md`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;