import io from "socket.io-client";
import { createContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SoketProvider = ({ children }) => {
  const [Socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const user = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (user) {
      console.log("runnin");
      const socket = io("http://localhost:8080/", {
        query: {
          userId: user?._id,
        },
      });

      setSocket(socket);
      socket.on("getonline", (users) => {
        setOnlineUsers(users);
        console.log("sokect disconnected!!!");
      });

      return () => socket.close();
    } else {
      if (Socket) {
        Socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ Socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
