import {
  FETCH_TODOS,
  ADD_TODO,
  SET_LOADING,
  SET_ERROR,
  UPDATE_TODO,
  REMOVE_TODO,
} from "../actions/types";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, data: action.payload, isLoading: false, error: null };
    case ADD_TODO:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_TODO:
      return {
        ...state,
        data: state.data.todos.map((todo, index) =>
          index === action.payload.index
            ? { ...todo, updatedTask: action.payload.data.updatedTask }
            : todo
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        data: state.data.todos.filter(
          (todo, index) => index !== action.payload
        ),
      };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
