import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const {
    sortByDate,
    query,
    handleSearch,
    setSortByDate,
    hits,
    isLoading,
  } = useGlobalContext();

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>viAct Task</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {!hits?.length > 0
        ? null
        : !isLoading && (
            <button
              onClick={setSortByDate}
              className={`remove-btn ${!sortByDate ? null : "active"}`}
            >
              Sort By Date
            </button>
          )}
    </form>
  );
};

export default SearchForm;
