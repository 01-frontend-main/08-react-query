import * as React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toast } from "@usy-ui/base";
import * as ReactDOM from "react-dom/client";

import "@usy-ui/base/dist/styles.css";
import { TodoList } from "./pages/todo-list";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast />
      <TodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
