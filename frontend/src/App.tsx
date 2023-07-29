import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import no_image from "./img/no-image.png";
interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  image_url: string;
}

function App() {
  // State management
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [baseExperienceMin, setBaseExperienceMin] = useState("");
  const [baseExperienceMax, setBaseExperienceMax] = useState("");
  const [heightMin, setHeightMin] = useState("");
  const [heightMax, setHeightMax] = useState("");
  const [weightMin, setWeightMin] = useState("");
  const [weightMax, setWeightMax] = useState("");
  const [sortingColumn, setSortingColumn] = useState("name");
  const [sortingOrder, setSortingOrder] = useState("asc");

  // Functions
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterName: string
  ) => {
    const value = event.target.value;
    switch (filterName) {
      case "baseExperienceMin":
        setBaseExperienceMin(value);
        break;
      case "baseExperienceMax":
        setBaseExperienceMax(value);
        break;
      case "heightMin":
        setHeightMin(value);
        break;
      case "heightMax":
        setHeightMax(value);
        break;
      case "weightMin":
        setWeightMin(value);
        break;
      case "weightMax":
        setWeightMax(value);
        break;
      default:
        break;
    }
  };

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortingColumn(value);
  };

  const handleSortingOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSortingOrder(value);
  };

  // Fetching the data from the backend
  useEffect(() => {
    fetchPokemons();
  }, [
    searchQuery,
    pageNumber,
    baseExperienceMin,
    baseExperienceMax,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    sortingColumn,
    sortingOrder,
  ]);
  const fetchPokemons = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pokemons`, {
        params: {
          page: pageNumber + 1,

          search: searchQuery,
          base_experience_min: baseExperienceMin,
          base_experience_max: baseExperienceMax,
          height_min: heightMin,
          height_max: heightMax,
          weight_min: weightMin,
          weight_max: weightMax,
          sort: sortingColumn,
          order: sortingOrder,
        },
      });
      setPokemons(response.data.data);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="block px-6 overflow-auto rounded-lg shadow">
      <div className="flex justify-between w-full px-4 py-6">
        <div className="flex flex-col p-2">
          <label className="mb-1">Search: </label>
          <input
            type="text"
            placeholder="Name"
            className="pl-2 border-2 border-gray-200 rounded-lg"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Base Experience:</label>
          <input
            type="number"
            placeholder="Min xp"
            className="w-full pl-2 mb-2 border-2 border-gray-200 rounded-lg"
            value={baseExperienceMin}
            onChange={(e) => handleFilterChange(e, "baseExperienceMin")}
          />
          <input
            type="number"
            className="w-full pl-2 border-2 border-gray-200 rounded-lg"
            placeholder="Max xp"
            value={baseExperienceMax}
            onChange={(e) => handleFilterChange(e, "baseExperienceMax")}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Height:</label>
          <input
            className="w-full pl-2 mb-2 border-2 border-gray-200 rounded-lg"
            type="number"
            placeholder="Min height"
            value={heightMin}
            onChange={(e) => handleFilterChange(e, "heightMin")}
          />
          <input
            type="number"
            className="w-full pl-2 border-2 border-gray-200 rounded-lg"
            placeholder="Max height"
            value={heightMax}
            onChange={(e) => handleFilterChange(e, "heightMax")}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Weight:</label>
          <input
            className="w-full pl-2 mb-2 border-2 border-gray-200 rounded-lg"
            type="number"
            placeholder="Min weight"
            value={weightMin}
            onChange={(e) => handleFilterChange(e, "weightMin")}
          />
          <input
            className="w-full pl-2 border-2 border-gray-200 rounded-lg"
            type="number"
            placeholder="Max weight"
            value={weightMax}
            onChange={(e) => handleFilterChange(e, "weightMax")}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Sort By/Order By:</label>
          <select
            value={sortingColumn}
            onChange={handleSortingChange}
            className="w-full mb-2 border-2 border-gray-200 rounded-lg p-0.5"
          >
            <option value="name">Name</option>
            <option value="base_experience">Base Experience</option>
            <option value="height">Height</option>
            <option value="weight">Weight</option>
          </select>
          <select
            value={sortingOrder}
            onChange={handleSortingOrderChange}
            className="w-full border-2 border-gray-200 rounded-lg p-0.5"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <table className="w-full">
        <thead className="border-b-2 border-gray-200 bg-gray-50">
          <tr>
            <th className="w-20 p-3 text-sm font-bold tracking-wide text-left">
              Name
            </th>
            <th className="w-20 p-3 text-sm font-bold tracking-wide text-left">
              Base Experience
            </th>
            <th className="w-20 p-3 text-sm font-bold tracking-wide text-left">
              Height
            </th>
            <th className="w-20 p-3 text-sm font-bold tracking-wide text-left">
              Weight
            </th>
            <th className="w-20 p-3 text-sm font-bold tracking-wide text-left">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon, i) => (
            <tr
              key={pokemon.id}
              className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-1 text-gray-700 whitespace-nowrap">
                {pokemon.name}
              </td>
              <td className="px-4 py-1 text-gray-700 whitespace-nowrap">
                {pokemon.base_experience}
              </td>
              <td className="px-4 py-1 text-gray-700 whitespace-nowrap">
                {pokemon.height}
              </td>
              <td className="px-4 py-1 text-gray-700 whitespace-nowrap">
                {pokemon.weight}
              </td>
              <td className="px-4 py-1 text-gray-700 whitespace-nowrap">
                <img
                  src={pokemon.image_url ? pokemon.image_url : no_image}
                  alt={pokemon.name}
                  onError={(e) => {
                    e.currentTarget.src = "fallback-image-url.png";
                  }}
                  className="w-24 h-24 rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="flex justify-between p-8 border-b-2 border-gray-200"
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages} // Replace with the total number of pages from the API response
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"bg-black text-white px-3 rounded-full"}
      />
    </div>
  );
}

export default App;
