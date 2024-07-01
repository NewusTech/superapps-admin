import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search-normal.svg'; // Impor SVG sebagai komponen React

const SearchInput = () => {
    return (
        <div className="relative flex items-center w-[655px] h-[52px] bg-white shadow-lg rounded-lg">
            <SearchIcon className="absolute left-4 w-6 h-6 text-gray-500" />
            <input
            
                type="text"
                placeholder="Search"
                className="w-full h-full pl-12 pr-4 text-gray-700 bg-transparent rounded-lg focus:outline-none"
            />
        </div>
    );
};

export default SearchInput;
