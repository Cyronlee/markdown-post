import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

import { Provider } from "./provider.tsx";
// eslint-disable-next-line import/order
import App from "./App.tsx";
import "@/css/globals.css";

import "./lib/i18n.ts";
import { ToolbarState } from "./state/toolbarState.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ToolbarState.Provider>
          <Analytics />
          <Toaster />
          <App />
        </ToolbarState.Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
