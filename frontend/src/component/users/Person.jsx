import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router";
import { useSocketContext } from "../../context/socketContext";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

function Person({ data, chat = false }) {
  const { Socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(data._id);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#D0F4EA",
      color: "#0D1821",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <NavLink to={data._id}>
      <div
        className={`w-full flex items-center gap-2 px-2 mb-2 hover:bg-[#1b2c3a] transition-all duration-300  rounded-2xl overflow-hidden ${
          chat ? "bg-[#0D1821] text-[#D0F4EA]" : ""
        }`}
      >
        {isOnline ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar sx={{ bgcolor: "#F4CAE0" }}>
              <span className="text-black font-bold ">
                {data.name?.[0].toUpperCase()}
              </span>
            </Avatar>
          </StyledBadge>
        ) : (
          <Avatar sx={{ bgcolor: "#F4CAE0" }}>
            <span className="text-black font-bold ">
              {data.name?.[0].toUpperCase()}
            </span>
          </Avatar>
        )}

        <div className="p-1">
          <h1>{data.name}</h1>
          <span className="text-sm text-gray-500 text-wrap">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default Person;
