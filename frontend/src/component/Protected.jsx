import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

function Protected({ children, authetication = true }) {
  const userStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authetication && authetication !== userStatus) {
      navigate("/login");
    } else if (!authetication && userStatus !== authetication) {
      navigate("/");
    }

    setLoading(false);
  }, [navigate, userStatus, authetication]);

  return loading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <div>{children}</div>
  );
}

export default Protected;
