import React from "react";
import { ReactComponent as SearchIcon } from "assets/icons/search-normal.svg"; // Impor SVG sebagai komponen React

const SearchInput = ({ className, handleSearch, name, value }) => {
  return (
    <div
      className={`flex flex-row items-center rounded-md border p-2 ${className}`}>
      <SearchIcon className="w-6 h-6 text-gray-500 ml-4" />
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleSearch}
        placeholder="Search"
        className={`w-full h-full ml-4 mr-4 text-gray-700 bg-transparent rounded-lg focus:outline-none`}
      />
    </div>
  );
};

export default SearchInput;
