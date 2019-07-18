import { actionTypes } from "./actionTypes";

const initialState = {
  activeUser: {},
  tasksList: [],
  activeTask: {}
};

export const reducer = (state = initialState, action) => {
  const { SET_USER, SET_LIST_OF_TASK, SET_TASK } = actionTypes;
  const { activeUser, tasksList, activeTask, type } = action;

  switch (type) {
    case SET_USER:
      return { ...state, activeUser };
    case SET_LIST_OF_TASK:
      return { ...state, tasksList };
    case SET_TASK:
      return { ...state, activeTask };
    default:
      return state;
  }
};
