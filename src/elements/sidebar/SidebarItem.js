import React, { useState } from "react";
import { Link } from "react-router-dom";

function SidebarItem({
  text,
  menuIcon,
  active,
  link,
  space = "space-x-1",
  dropdown = false,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  if (dropdown) {
    return (
      <div className="mb-4" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className={`flex  items-center justify-between`}>
          <div className={`flex items-center ${space}`}>
            {menuIcon}
            <button className="text-sm text-textSecondary">{text}</button>
          </div>

          <svg
            className={`w-4 h-4 ml-2 fill-secondary ${
              isDropdownOpen ? "rotate-180" : ""
            } transition-transform duration-300`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <ul>
                        <div className='px-7 pt-[10px] space-y-1'>
                            <li><Link to={link} className={`text-sm ${active ? 'text-main' : 'text-secondary'}`}>Per-Rute</Link></li>
                            <li><Link to={link} className={`text-sm ${active ? 'text-main' : 'text-secondary'}`}>Per-Mobil</Link></li>
                        </div>
                    </ul>
                </div> */}
      </div>
    );
  } else {
    return (
      <div className={`flex ${space}`}>
        {menuIcon}
        <li className="mb-[10px]">
          <Link
            to={link}
            className={`text-sm ${
              active ? "text-main" : "text-textSecondary"
            } `}>
            {text}
          </Link>
        </li>
      </div>
    );
  }
}

export default SidebarItem;
