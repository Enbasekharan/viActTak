import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const {
    isLoading,
    page,
    nbPages,
    handlePage,
    handlePageIndex,
    hits,
  } = useGlobalContext();

  return (
    <>
      {!hits?.length > 0 ? null : (
        <div className="btn-container">
          {!isLoading && (
            <button
              disabled={isLoading}
              onClick={() => handlePage("dec")}
              className="nxt-btn"
            >
              prev
            </button>
          )}
          {!isLoading &&
            nbPages &&
            [...Array(nbPages)].map((item, index) => (
              <button
                key={index}
                onClick={() => handlePageIndex(index)}
                className={`page-btn ${
                  index === page - 1 ? "active-btn" : null
                }`}
              >
                {index + 1}
              </button>
            ))}
          {!isLoading && (
            <button
              disabled={isLoading}
              onClick={() => handlePage("inc")}
              className="nxt-btn"
            >
              next
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Buttons;
