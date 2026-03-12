import React from 'react';
import Bannerslider from '../../components/Bannerslider';
// import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/ProductCard';





export default function Home({searchText}) {
 

  
  return (
    <div>
        
        
        {/* Banner Section */}
      
      <Bannerslider />
      {/* Rest of the home page */}
      
      <h2 className="text-xl font-semibold mt-6 mb-4">Shop by Category</h2>
      <h2 className="text-xl font-semibold mt-6 mb-4">Best of Electronics</h2>
      {/* ... other sections ... */}
       {/* <SearchBar setSearchText={setSearchText} /> */}
      <ProductCard searchText={searchText} />
    </div>
  )
}
