import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

import TodoApp from "./TodoApp";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
);
