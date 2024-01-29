import { useContext } from "react";
import { TodoContext } from "../context/todoContext";

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    return "use context within its state child";
  }

  return context;
};
