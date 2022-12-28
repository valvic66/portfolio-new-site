export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_FILTERED_POSTS = 'SET_FILTERED_POSTS';
export const SET_FOCUSED = 'SET_FOCUSED';
export const SET_SELECTED_TAG = 'SET_SELECTED_TAG';
export const SET_IS_ALL_TAG = 'SET_IS_ALL_TAG';
export const SET_POSTS_COUNT = 'SET_POSTS_COUNT';
export const SET_TABULATION_PAGE = 'SET_TABULATION_PAGE';
export const SET_TABULATION_POSTS = 'SET_TABULATION_POSTS';

export const setSearchTerm = (dispatch, payload) =>
  dispatch({ type: SET_SEARCH_TERM, payload });
export const setFilteredPosts = (dispatch, payload) =>
  dispatch({ type: SET_FILTERED_POSTS, payload });
export const setFocused = (dispatch, payload) =>
  dispatch({ type: SET_FOCUSED, payload });
export const setSelectedTag = (dispatch, payload) =>
  dispatch({ type: SET_SELECTED_TAG, payload });
export const setIsAllTag = (dispatch, payload) =>
  dispatch({ type: SET_IS_ALL_TAG, payload });
export const setPostsCount = (dispatch, payload) =>
  dispatch({ type: SET_POSTS_COUNT, payload });
export const setTabulationPage = (dispatch, payload) =>
  dispatch({ type: SET_TABULATION_PAGE, payload });
  export const setTabulationPosts = (dispatch, payload) =>
  dispatch({ type: SET_TABULATION_POSTS, payload });