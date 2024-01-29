import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export const useTodoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO":
      return {
        todo: action.payload,
      };
    case "INSERT_TODO": {
      return {
        todo: [action.payload, ...state.todo],
      };
    }
    case "DELETE_TODO":
      return {
        todo: state.todo.filter(
          (element) => element._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(useTodoReducer, {
    todo: null,
  });

  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
