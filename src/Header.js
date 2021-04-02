import React from "react";
import { useGlobalContext } from "./context";

const Header = () => {
  const {
    sortByDate,
    query,
    handleSearch,
    setSortByDate,
    hits,
    isLoading,
  } = useGlobalContext();

  const downHex = `&#x2193;`;
  const upHex = `&#8593;`;
  const parser = new DOMParser();
  const upArrow = parser.parseFromString(upHex, "text/html").body.textContent;
  const downArrow = parser.parseFromString(downHex, "text/html").body
    .textContent;

  return (
    <>
      {!hits?.length > 0 ? null : (
        <header className="story-header">
          <h4>Image</h4>
          <h4>Source</h4>
          <h4>Author</h4>
          <h4>Title</h4>
          <button className="sort-button" onClick={setSortByDate}>
            Date {sortByDate ? downArrow : upArrow}
          </button>
          <h4>Link</h4>
        </header>
      )}
    </>
  );
};

export default Header;
