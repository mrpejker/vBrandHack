import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { Avalanche } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import App from "./App";
import("buffer").then(({ Buffer }) => {
  window.Buffer = Buffer;
});
ReactDOM.createRoot(document.getElementById("root")).render(
  _jsx(React.StrictMode, {
    children: _jsx(AuthCoreContextProvider, {
      options: {
        projectId: import.meta.env.VITE_APP_PROJECT_ID,
        clientKey: import.meta.env.VITE_APP_CLIENT_KEY,
        appId: import.meta.env.VITE_APP_APP_ID,
        erc4337: {
          name: "SIMPLE",
          version: "1.0.0",
        },
        wallet: {
          visible: true,
          customStyle: {
            supportChains: [Avalanche],
          },
        },
      },
      children: _jsx(App, {}),
    }),
  })
);