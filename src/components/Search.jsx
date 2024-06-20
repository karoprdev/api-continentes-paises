import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ searchCountry, setSearchCountry }) => {
  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value);
  };

  return (
    <form className="flex items-center max-w-md mx-auto my-3" onSubmit={(e) => e.preventDefault()}>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Escribe el país que deseas ver"
          className="w-full px-3 py-3 border border-gray-300 rounded-3xl focus:outline-none shadow-lg shadow-gray-400"
          value={searchCountry}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 bottom-0 m-1 px-3 py-2 mr-2 my-1.5 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
        >
          <SearchIcon className="w-5 h-5" /> Buscar
        </button>
      </div>
    </form>
  );
};

export default Search;
