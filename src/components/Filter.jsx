import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Select from "react-select";

const categoriesAPI = async () => {
  const res = await axios.get("categories");
  return res.data;
};

const Filter = ({ onChangeCategories, onChangeMaxPrice, onChangeMinPrice }) => {
  const { isLoading: loadingCategories, data: categories } = useQuery(
    "categories",
    categoriesAPI
  );

  return (
    <div className="flex space-x-5 items-center bg-gray-200 p-2 px-4 my-10 rounded-md">
      <p>Filter</p>
      <Select
        className="flex-1"
        getOptionLabel={(v) => v.name}
        getOptionValue={(v) => v.id}
        isClearable
        isSearchable
        onChange={onChangeCategories}
        placeholder="Select category"
        options={categories}
        isLoading={loadingCategories}
      />
      <label className="flex items-center space-x-2">
        <p>Min Price: </p>
        <input
          type="text"
          className="p-2 rounded-md focus:outline-none w-20"
          type="number"
          onChange={(e) => onChangeMinPrice(e.target.value)}
          placeholder="$0"
        />
      </label>

      <label className="flex items-center space-x-2">
        <p>Max Price: </p>
        <input
          type="text"
          className="p-2 rounded-md focus:outline-none w-20"
          type="number"
          onChange={(e) => onChangeMaxPrice(e.target.value)}
          placeholder="$0"
        />
      </label>
    </div>
  );
};

export default Filter;
