import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarDetails from "./CarDetails";
import { React, axios } from "react";

const DisplayData = () => {
  const [cars, setCars] = useState([]);
  const [sorting, setSorting] = useState({ column: "id", order: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const columns = [
    "id",
    "make",
    "model",
    "year",
    "color",
    "kms",
    "vin",
    "price",
    "images",
  ];

  const [currentCar, setCurrentCar] = useState([]);

  const navigate = useNavigate();

  const navigateToCarDetails = () => {
    // 👇️ navigate to car details
    navigate("/cardetails");
  };

  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };

  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  useEffect(() => {
    const url = `http://localhost:8000/cars?_sort=${sorting.column}&_order=${sorting.order}&make_like=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((cars) => {
        setCars(cars);
      });
  }, [sorting, searchValue]);

  let temp = cars[0];

  const HeaderCell = ({ column }) => {
    const isDescSorting = sorting.column === column && sorting.order === "desc";
    const isAscSorting = sorting.column === column && sorting.order === "asc";
    const futureSortingOrder = isDescSorting ? "asc" : "desc";

    return (
      <th
        key={column}
        className="px-6 py-3 first:rounded-tl-md last:rounded-tr-md cursor-pointer"
        onClick={() => sortTable({ column, order: futureSortingOrder })}
      >
        {column}
        {isDescSorting && <spam>▼</spam>}
        {isAscSorting && <spam>▲</spam>}
      </th>
    );
  };

  const Header = ({ columns, sorting, sortTable }) => {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
        <tr className="text-center">
          {columns.map((column) => (
            <HeaderCell
              column={column}
              sorting={sorting}
              key={column}
              sortTable={sortTable}
            />
          ))}
        </tr>
      </thead>
    );
  };

  const Content = ({ entries, columns }) => {
    return (
      <tbody>
        {entries.map((record) => (
          <tr
            className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 dark:text-black cursor-pointer"
            key={record.id}
            onClick={() => {
              setCurrentCar(record);
            }}
          >
            {columns.map((column, i, arr) => {
              if (i === arr.length - 1) {
                return (
                  <td key={column} className="px-6 py-4 ">
                    <img
                      src={record[column]}
                      alt={column}
                      className="object-cover w-24 h-24 rounded-lg"
                    />
                  </td>
                );
              } else {
                return (
                  <td
                    key={column}
                    className="px-6 py-4 first:rounded-bl-sm last:rounded-br-sm"
                  >
                    {record[column]}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  const SearchBar = ({ searchTable }) => {
    const [searchValue, setSearchValue] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      searchTable(searchValue);
    };
    console.log("Searchvalue", searchValue);

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-1/2 px-4 py-2 rounded-md border-black border-2 text-gray-800 my-2
          "
          placeholder="Search by car name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-blue-500 w-20 h-12 text-white rounded-lg mx-3"
          onClick={handleSubmit}
        >
          Search
        </button>
        <button
          className="bg-blue-500 w-20 h-12 text-white rounded-lg mx-3"
          onClick={() => setSearchValue("")}
        >
          Show All
        </button>
      </form>
    );
  };

  return (
    <div className="w-full text-center p-4">
      <p className="text-xl font-bold mt-3">List of vehicles</p>
      <SearchBar searchTable={searchTable} />
      <p className="text-md font-bold mt-3 text-start my-2">
        To sort each column data, just click on column name
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md border">
          <Header columns={columns} sorting={sorting} sortTable={sortTable} />
          <Content entries={cars} columns={columns} />
        </table>
      </div>
      <CarDetails fetchData={currentCar} />
    </div>
  );
};

export default DisplayData;
