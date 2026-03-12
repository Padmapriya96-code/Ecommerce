import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";



function SearchBar({ setSearchText  }) {
  

  const handleChange = (e) => {
    setSearchText?.(e.target.value); // safe call
  };
  
  return (
    <div className="search-wrapper">
      <div className="search-box">
         <FaSearch className="search-icon" /> 

        <input
          type="text"
          
          onChange={handleChange}
          placeholder="Search for products..."
        />
      </div>
    </div>
  );
}


export default SearchBar