
import React, { useState } from 'react';
import Pagination from '../components/Pagination';

export default function Example() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page
  
    // Dummy array of items
    const items = Array.from({ length: 100 }, (v, i) => `Item ${i + 1}`);
  
    // Calculate current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    return (
        <div className='container'>
          <h1>Items</h1>
          <ul className='list-group mb-4'>
            {currentItems.map((item, index) => (
              <li key={index} className='list-group-item'>
                {item}
              </li>
            ))}
          </ul>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={items.length}
            paginate={paginate}
          />
        </div>
      );
}

