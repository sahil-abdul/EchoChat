import { SignUp } from "../component/index";
import { useEffect,useState } from "react";
import userService from "../services/user.service";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../store/authSlice";

function SignupPage() {
  const [loading, setLoading] = useState(true);
  const dispatach = useDispatch();

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
    <SignUp />
  );
 
}

export default SignupPage;
