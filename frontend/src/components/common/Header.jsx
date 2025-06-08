import React from 'react';
import { FaBars } from 'react-icons/fa';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ toggleSidebar }) => (
  <header className="flex items-center justify-between bg-white shadow px-4 py-2">
    <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
      <FaBars />
    </button>
    <ProfileDropdown />
  </header>
);

export default Header;