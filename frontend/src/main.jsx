import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import Protected from "./component/Protected.jsx";
import { LoginPage, SignupPage } from "./pages/index.js";
import ChatArea from "./component/chats/ChatArea.jsx";
import { SoketProvider } from "./context/socketContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected authetication={true}>
        <App />
      </Protected>
    ),
    children: [
      {
        path: "/:receiverId",
        element: <ChatArea />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Protected authetication={false}>
        <LoginPage />
      </Protected>
    ),
  },
  {
    path: "/signUp",
    element: (
      <Protected authetication={false}>
        <SignupPage />
      </Protected>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SoketProvider>
        <RouterProvider router={router} />
      </SoketProvider>
    </Provider>
  </StrictMode>
);
