import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import authService from "../services/auth.service";
import { useDispatch,useSelector } from "react-redux";
import { logIn } from "../store/authSlice";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch()

  
  const login = async (data) => {
    const val = await authService.loginUser(data);
    if (val) {
      dispatch(logIn(val));
     
    }
    reset();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-[#F4CAE0] mx-auto w-full max-w-sm gap-3 rounded-xl p-10 bg-[#0D1821] text-[#D0F4EA] shadow-[0_0_15px_#0D1821]">
        <h2 className="text-center text-2xl font-bold leading-tight text-[#F4CAE0]">
          Login
        </h2>
        <p className="mt-2 text-center text-base">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signUp"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            SignUp
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(login)}
          className="flex items-center gap-5 flex-col"
        >
          <TextField
            required
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{
              input: { color: "#D0F4EA" },
              label: { color: "#D0F4EA" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#D0F4EA",
              },
            }}
            {...register("email", { required: true })}
          />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            variant="standard"
            type="password"
            sx={{
              input: { color: "#D0F4EA" },
              label: { color: "#D0F4EA" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#D0F4EA",
              },
            }}
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="p-2 bg-[#F4CAE0] rounded-2xl text-[#0D1821] w-3/4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
