import {
  SET_SEARCH_TERM,
  SET_FILTERED_POSTS,
  SET_FOCUSED,
  SET_SELECTED_TAG,
  SET_IS_ALL_TAG,
  SET_POSTS_COUNT,
  SET_TABULATION_PAGE,
  SET_TABULATION_POSTS,
} from './actions';

export const initialState = {
  searchTerm: '',
  filteredPosts: [],
  focused: false,
  selectedTag: '',
  isAllTag: true,
  postsCount: 0,
  tabulationPage: 1,
  tabulationPosts: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: payload };
    case SET_FILTERED_POSTS:
      return { ...state, filteredPosts: payload };
    case SET_FOCUSED:
      return { ...state, focused: payload };
    case SET_SELECTED_TAG:
      return { ...state, selectedTag: payload };
    case SET_IS_ALL_TAG:
      return { ...state, isAllTag: payload };
    case SET_POSTS_COUNT:
      return { ...state, postsCount: payload };
    case SET_TABULATION_PAGE:
      return { ...state, tabulationPage: payload };
    case SET_TABULATION_POSTS:
      return { ...state, tabulationPosts: payload };
    default:
      return state;
  }
};
