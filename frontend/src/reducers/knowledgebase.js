import {
    FETCH_KNOWLEDGE_BASE_REQUEST,
    FETCH_KNOWLEDGE_BASE_SUCCESS,
    FETCH_KNOWLEDGE_BASE_FAILURE,
  } from '../actions/types';
  
  const initialState = {
    isLoading: false,
    knowledgeBase: null,
    error: null,
  };
  
  const knowledgeBase = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_KNOWLEDGE_BASE_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case FETCH_KNOWLEDGE_BASE_SUCCESS:
        return {
          isLoading: false,
          knowledgeBase: action.knowledgeBase,
          error: null,
        };
      case FETCH_KNOWLEDGE_BASE_FAILURE:
        return {
          ...initialState,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default knowledgeBase;
  