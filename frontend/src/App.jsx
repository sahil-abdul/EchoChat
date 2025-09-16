import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import userService from "./services/user.service";
import { logIn, logOut } from "./store/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const dispatach = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getUser()
      .then((user) => {
        if (user) {
          dispatach(logIn(user));
        } else {
          dispatach(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <>
      {/* <LoginPage /> */}
      <div className="w-screen h-screen flex justify-center items-center">
        <Home />
      </div>
    </>
  );
}

export default App;
