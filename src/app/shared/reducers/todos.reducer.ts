import { TODOS_LOADED, TODOS_LOADING } from '../actions/todos.types';
import * as actions from '../actions/todos.actions';

export type Action = actions.All;

const initialState = {
  list: [],
  error: {},
  loading: false,
  loaded: false,
};

export default function listReducer(state = initialState, action: Action) {
  switch (action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        error: {},
        loaded: false,
        loading: true,
      };

    case TODOS_LOADED:
      return {
        ...state,
        list: action.payload,
        loaded: true,
        loading: false,
      };

    default:
      return state;
  }
}
