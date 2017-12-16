import { LIST_LOADED, LIST_LOADING } from './list.types';
import * as actions from './list.actions';

export type Action = actions.All;

const initialState = {
  list: [],
  listError: {},
  listLoading: false,
  listLoaded: false,
};

export default function listReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LIST_LOADING:
      return {
        ...state,
        listError: {},
        listLoaded: false,
        listLoading: true,
      };

    case LIST_LOADED:
      return {
        ...state,
        list: action.payload,
        listLoaded: true,
        listLoading: false,
      };

    default:
      return state;
  }
}
