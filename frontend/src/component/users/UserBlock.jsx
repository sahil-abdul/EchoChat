import Person from "./Person";
import Head from "./Head";
import { useState } from "react";
import { useEffect } from "react";
import userService from "../../services/user.service";
import CircularProgress from "@mui/material/CircularProgress";

function UserBlock() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getAllUser()
      .then((users) => {
        if (users) {
          setAllUsers(users);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center h-full">
      <Head />
      <input
        type="text"
        placeholder="Search"
        className="mt-2 w-[95%] bg-[#F4CAE0] rounded-2xl p-1 text-black font-medium"
      />

      <div className="w-full flex-1 flex-grow p-2 mt-2 overflow-y-auto ">
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          allUsers.map((user) => (
            <Person
              key={user._id}
              data={{ _id: user._id, name: user.username, email: user.email }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UserBlock;
