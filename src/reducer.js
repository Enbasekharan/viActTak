import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_PAGE_INDEX,
  SET_SORT_BY_DATE,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 1 };
    case SET_SORT_BY_DATE:
      const { hits, sortByDate } = state;
      if (hits) {
        let tempArticles = [...hits];
        if (sortByDate) {
          tempArticles = tempArticles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
          return { ...state, sortByDate: false, hits: tempArticles };
        } else {
          tempArticles = tempArticles.sort(
            (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
          );
          return { ...state, sortByDate: true, hits: tempArticles };
        }
      } else {
        return { ...state };
      }
    case HANDLE_PAGE_INDEX:
      return { ...state, page: action.payload + 1 };
    case HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage >= state.nbPages) {
          nextPage = 1;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage <= 0) {
          prevPage = state.nbPages;
        }
        return { ...state, page: prevPage };
      }
    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
};
export default reducer;
