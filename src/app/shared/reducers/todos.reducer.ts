import { TODOS_LOADED, TODOS_LOADING } from '../actions/todos.types';
import { TODO_UPDATED } from '../actions/todo.types';
import * as actions from '../actions/todos.actions';
import { TodoUpdatedAction } from '../actions/todo.actions';
import Todo from '../models/todo.model';

export type Action = actions.All | TodoUpdatedAction;

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

    case TODO_UPDATED:
      // update targeted todo in list
      const list:Array<Todo> = state.list.slice(0);
      let updatedTodoIndex = -1;
      let updatedTodo = list.find((todo, index) => {
        if (todo.id === action.payload.id) {
          updatedTodoIndex = index;
          return true;
        }
        return false;
      });
      list[updatedTodoIndex] = Object.assign({}, updatedTodo, action.payload);
      return { ...state, list };

    default:
      return state;
  }
}
