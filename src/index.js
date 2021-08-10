import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./index.css";
import App from "./pages/Home";

axios.defaults.baseURL = "https://dummy-store-api.herokuapp.com";

ReactDOM.render(
  <QueryClientProvider client={new QueryClient()}>
    <React.StrictMode>
      <App />
      <ReactQueryDevtools />
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById("root")
);
