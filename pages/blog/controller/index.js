export const useController = (options) => {
  const { dispatch } = options;

  const handlePageChange = (e, page) => {
    dispatch({ type: 'SET_TABULATION_PAGE', payload: page });
  };

  const handleFocus = () => {
    dispatch({ type: 'SET_SELECTED_TAG', payload: '' });
    dispatch({ type: 'SET_FOCUSED', payload: true });
  };

  const handleBlur = () => dispatch({ type: 'SET_FOCUSED', payload: false });

  return {
    handlePageChange,
    handleFocus,
    handleBlur,
  };
};
