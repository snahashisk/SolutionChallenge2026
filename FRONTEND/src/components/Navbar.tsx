import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-20 h-16 w-full">
      <nav className="flex justify-between items-center w-full">
        <div className="flex gap-2 justify-center items-center">
          <Image src="/logo-1.png" alt="Hero Background" width={60} height={60} />
          <h1 className="text-2xl font-bold text-green-900">GoodDeed Foundation</h1>
        </div>

        <ul className="flex items-center gap-10 text-gray-700 font-semibold text-lg">
          <li className="cursor-pointer hover:text-lime-800 transition-colors hover:border-b-2 hover:border-lime-800">
            Home
          </li>
          <li className="cursor-pointer hover:text-lime-800 transition-colors hover:border-b-2 hover:border-lime-800">
            About
          </li>
          <li className="cursor-pointer hover:text-lime-800 transition-colors hover:border-b-2 hover:border-lime-800">
            Donations
          </li>
          <li className="cursor-pointer hover:text-lime-800 transition-colors hover:border-b-2 hover:border-lime-800">
            Events
          </li>
          <li className="cursor-pointer hover:text-lime-800 transition-colors hover:border-b-2 hover:border-lime-800">
            Blog
          </li>
          <li className="cursor-pointer hover:text-lime-800 transition-colors hover:border-b-2 hover:border-lime-800">
            Contact Us
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
