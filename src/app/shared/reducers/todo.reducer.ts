import {
  TODO_CREATE,
  TODO_CREATED,
  TODO_LOADED,
  TODO_LOAD,
  TODO_UPDATED,
  TODO_UPDATE,
  RESET_TODO_STATE,
} from '../actions/todo.types';
import * as actions from '../actions/todo.actions';

export type Action = actions.All;

interface Todo {
  completed?:boolean;
  completed_at?:string;
  created_at?:string;
  description?:string;
  id?:number;
  modified_at?:string;
  title?:string;
}

const initialState = {
  data: {},
  createError: {},
  creating: false,
  created: false,
  loadError: {},
  loading: false,
  loaded: false,
  updateError: {},
  updating: false,
  updated: false,
};

export function todoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case TODO_CREATE:
      return {
        ...state,
        createError: {},
        created: false,
        creating: true,
      };

    case TODO_CREATED:
      return {
        ...state,
        data: action.payload,
        created: true,
        creating: false,
      };

    case TODO_LOAD:
      return {
        ...state,
        loadingError: {},
        loaded: false,
        loading: true,
      };

    case TODO_LOADED:
      return {
        ...state,
        data: action.payload,
        loaded: true,
        loading: false,
      };

    case TODO_UPDATE:
      return {
        ...state,
        updateError: {},
        updated: false,
        updating: true,
      };

    case TODO_UPDATED:
      let data:Todo = Object.assign({}, state.data);
      if (typeof data.id === 'number' && action.payload.id === data.id) {
        data = Object.assign({}, data, action.payload);
      }
      return {
        ...state,
        data,
        updated: true,
        updating: false,
      };

    case RESET_TODO_STATE:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
}
