import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { IoSearch } from "react-icons/io5";

const SearchBar = (props) => {
    const data = []
  const items = [
    '"kurkure"',
    '"apple juice"',
    '"cheese slices"',
    '"chacolate box"',
    '"amul butter"',
    '"banana"',
  ];
  const [dynamicTextIndex, setDynamicTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicTextIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);
  
  return (
    <div className="searchBarLink">
      <IoSearch className="searchIcon" />
      <input
        className="search-bar"
        placeholder="Search for over 5000 products.."
        onChange={props.inputChange}
      />
    </div>
  );
};

export default SearchBar;
