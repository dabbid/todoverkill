import { TODO_LOADED, TODO_LOADING, TODO_UPDATED, TODO_UPDATING } from '../actions/todo.types';
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
  loadingError: {},
  loading: false,
  loaded: false,
  updateError: {},
  updating: false,
  updated: false,
};

export default function detailReducer(state = initialState, action: Action) {
  switch (action.type) {
    case TODO_LOADING:
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

    case TODO_UPDATING:
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

    default:
      return state;
  }
}
