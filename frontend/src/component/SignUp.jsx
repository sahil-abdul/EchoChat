import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../store/authSlice";

function SignUp() {
  const { register, handleSubmit, reset } = useForm();
  const dispathch = useDispatch();

  const Signup = async (data) => {
    const val = await authService.registerUser(data);
    if (val) {
      dispathch(logIn(val));
    }
    reset();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-[#F4CAE0] mx-auto w-full max-w-sm gap-3 rounded-xl p-10 bg-[#0D1821] text-[#D0F4EA] shadow-[0_0_15px_#0D1821]">
        <h2 className="text-center text-2xl font-bold leading-tight text-[#F4CAE0]">
          SignUp
        </h2>
        <p className="mt-2 text-center text-base">
          Have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            login
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(Signup)}
          className="flex items-center gap-5 flex-col"
        >
          <TextField
            required
            id="standard-username"
            label="User name"
            variant="standard"
            sx={{
              input: { color: "#D0F4EA" },
              label: { color: "#D0F4EA" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#D0F4EA",
              },
            }}
            {...register("username", { required: true })}
          />
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
            className="p-2 bg-[#F4CAE0] rounded-2xl text-[#0D1821] w-3/4 font-medium"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
