import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_PAGE_INDEX,
  SET_SORT_BY_DATE,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://newsapi.org/v2/everything?";
const API_KEY = "4c90da30ff424059a1a11b27628b4fd8";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 1,
  nbPages: 0,
  sortByDate: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: {
          hits: data.articles,
          nbPages: Math.min(10, Math.ceil(data.totalResults / 10)),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setSortByDate = () => {
    dispatch({ type: SET_SORT_BY_DATE });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  const handlePageIndex = (index) => {
    dispatch({ type: HANDLE_PAGE_INDEX, payload: index });
  };

  useEffect(() => {
    fetchStories(
      `${API_ENDPOINT}q=${state.query}&pageSize=10&page=${state.page}&apiKey=${API_KEY}`
    );
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleSearch,
        handlePage,
        handlePageIndex,
        setSortByDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
