import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_THREAD_REQUEST,
  DELETE_THREAD_SUCCESS,
  DELETE_THREAD_FAILURE,
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  CREATE_THREAD_SAVE,
  CREATE_THREAD_TOGGLE,
} from '../actions/types';

const threadInitialState = {
  isLoading: false,
  name: null,
  content: null,
  pinned: false,
  creator: null,
  createdt: null,
  posts: [],
  error: null,
};

const newPostInitialState = {
  newPostSuccess: false,
  newPostLoading: false,
  newPostError: null,
};

const deletePostInitialState = {
  deletePostList: [],
};

const deleteThreadInitialState = {
  isDeleting: false,
  deleteError: null,
};

const initialState = {
  ...threadInitialState,
  ...newPostInitialState,
  ...deletePostInitialState,
  ...deleteThreadInitialState,
};

const thread = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREAD_REQUEST:
      return {
        ...initialState,
        isLoading: true,
        error: null,
      };
    case FETCH_THREAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        name: action.thread.name,
        content: action.thread.content,
        pinned: action.thread.pinned,
        creator: action.thread.creator,
        createdAt: action.thread.created_at,
        posts: action.thread.posts,
        error: null,
      };
    case FETCH_THREAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case DELETE_THREAD_REQUEST:
      return {
        ...state,
        isDeleting: true,
        deleteError: null,
      };
    case DELETE_THREAD_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteError: null,
      };
    case DELETE_THREAD_FAILURE:
      return {
        ...state,
        isDeleting: false,
        deleteError: action.error,
      };
    case CREATE_POST_REQUEST:
      return {
        ...state,
        newPostLoading: true,
        newPostError: null,
        newPostSuccess: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        newPostLoading: false,
        newPostError: null,
        newPostSuccess: true,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        newPostLoading: false,
        newPostError: action.error,
        newPostSuccess: false,
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        deletePostList: [...state.deletePostList, action.id],
      };
    case DELETE_POST_SUCCESS:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostList: state.deletePostList.filter(id => id !== action.id),
      };
    case CREATE_THREAD_REQUEST:
      return {
        ...state,
        newThreadLoading: true,
        newThreadError: null,
        newThreadSuccess: false,
      };
    case CREATE_THREAD_SUCCESS:
      return {
        ...state,
        newThreadLoading: false,
        newThreadSuccess: true,
        newThreadId: action.newThread.id,
        newThreadName: action.newThread.name,
        newThreadContent: action.newThread.content,
        newThreadError: null,
      };
    case CREATE_THREAD_FAILURE:
      return {
        ...state,
        newThreadLoading: false,
        newThreadError: action.error,
        newThreadSuccess: false,
      };
    case CREATE_THREAD_SAVE:
      return {
        ...state,
        newThreadName: action.name,
        newThreadContent: action.content,
        newThreadId: action.id,
      };
    case CREATE_THREAD_TOGGLE:
      return {
        ...state,
        newThreadShow: !state.newThreadShow,
      };
    default:
      return state;
  }
};

export default thread;
