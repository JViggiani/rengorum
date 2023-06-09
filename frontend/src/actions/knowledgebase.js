import {
    FETCH_KNOWLEDGE_BASE_REQUEST,
    FETCH_KNOWLEDGE_BASE_SUCCESS,
    FETCH_KNOWLEDGE_BASE_FAILURE,
  } from './types';
  import {fetchKnowledgeBaseApi} from '../api';
  import {apiErrorHandler} from '../utils/errorhandler';
  
  export const fetchKnowledgeBase = () => dispatch => {
    dispatch(fetchKnowledgeBaseRequest());
  
    fetchKnowledgeBaseApi()
      .then(response => {
        dispatch(fetchKnowledgeBaseSuccess(response.data));
      })
      .catch(error => {
        const errorMessage = apiErrorHandler(error);
        dispatch(fetchKnowledgeBaseFailure(errorMessage));
      });
  };
  
  export const fetchKnowledgeBaseRequest = () => {
    return {
      type: FETCH_KNOWLEDGE_BASE_REQUEST,
    };
  };
  
  export const fetchKnowledgeBaseSuccess = knowledgeBase => {
    console.log(`JOSH - data: ${JSON.stringify(knowledgeBase)}`)
    return {
      type: FETCH_KNOWLEDGE_BASE_SUCCESS,
      knowledgeBase,
    };
  };
  
  export const fetchKnowledgeBaseFailure = error => {
    return {
      type: FETCH_KNOWLEDGE_BASE_FAILURE,
      error,
    };
  };
  