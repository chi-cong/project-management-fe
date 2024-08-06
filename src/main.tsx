import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "src/libs";
import { Provider } from "react-redux";
import { store } from "src/libs/redux";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5030E5",
            fontFamily: "Poppins",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
