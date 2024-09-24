import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "src/libs";
import { Provider } from "react-redux";
import { store } from "src/libs/redux";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

ReactDOM.createRoot(document.getElementById("root")!).render(
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
);
