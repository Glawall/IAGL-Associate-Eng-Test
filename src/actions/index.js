import axios from "axios";
import {
  FETCH_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SET_LOADING,
  SET_ERROR,
} from "./types";

export function fetchTodos() {
  return function (dispatch) {
    dispatch(setLoading(true));
    return axios
      .get("http://localhost:9091/api/todo")
      .then(({ data }) => {
        dispatch(setTodos(data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
}

export function addTodo(newTask) {
  return function (dispatch) {
    return axios
      .post("http://localhost:9091/api/todo", { task: newTask })
      .then(({ data }) => {
        dispatch(todoAdded(data));
        dispatch(fetchTodos());
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
}

export function updateTodo(index, updatedTask) {
  return function (dispatch) {
    return axios
      .put(`http://localhost:9091/api/todo/${index}`, {
        updatedTask: updatedTask,
      })
      .then(({ data }) => {
        dispatch(todoUpdated(index, data));
        dispatch(fetchTodos());
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
}

export function removeTodo(index) {
  return function (dispatch) {
    return axios
      .delete(`http://localhost:9091/api/todo/${index}`)
      .then(() => {
        dispatch(todoRemoved(index));
        dispatch(fetchTodos());
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
}

function setTodos(data) {
  return {
    type: FETCH_TODOS,
    payload: data,
  };
}

function todoAdded(data) {
  return {
    type: ADD_TODO,
    payload: data,
  };
}

function todoUpdated(index, data) {
  return {
    type: UPDATE_TODO,
    payload: { index, data },
  };
}

function todoRemoved(index) {
  return {
    type: REMOVE_TODO,
    payload: index,
  };
}

function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
}

function setError(error) {
  return {
    type: SET_ERROR,
    payload: error,
  };
}
