'use client'

import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Search } from 'react-bootstrap-icons';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/search?paramName=${query}`);
      const responseData = await response.json();
      
      if (responseData && Array.isArray(responseData.data)) {
        setSearchResults(responseData.data);
      } else {
        console.error('Invalid API response format:', responseData);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length >= 2) {
      handleSearch(value);
    }
  };
  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Etsi ajoneuvosi"
          onChange={handleInputChange}
          className="max-w-xs" 
            startContent={
              <Search className="mr-2" size={20} />
            }
          />
      </div>
      <ul>
        <div className="max-h-60 overflow-y-auto">
          {searchResults.map((row) => (
            <div key={row.id} className="py-2">
              {row.merkkiSelvakielinen} {row.kaupallinenNimi}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
