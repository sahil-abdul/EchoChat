import axios from "axios";

class UserService {
  async getUser() {
    try {
      const user = await axios.get(
        "http://localhost:8080/api/v1/user/getUser",
        {
          withCredentials: true,
        }
      );
      if (user) {
        return user.data.data;
      }
      return null;
    } catch (error) {
      console.log(
        "error in user service || getUser || ",
        error.response.data.data
      );
    }
  }
  async getRecever({receiverId}) {
    try {
      const user = await axios.get(
        `http://localhost:8080/api/v1/user/getRecever/${receiverId}`,
        {
          withCredentials: true,
        }
      );
      if (user) {
        return user.data.data;
      }
      return null;
    } catch (error) {
      console.log(
        "error in user service || getRecever || ",
        error.response.data.data
      );
    }
  }

  async getAllUser() {
    try {
      const Allusers = await axios.get(
        "http://localhost:8080/api/v1/user/allUser",
        {
          withCredentials: true,
        }
      );
      if (Allusers) {
        return Allusers.data.data;
      }
      return null;
    } catch (error) {
      console.log(
        "error in user service || getAllusers || ",
        error.response.data.data
      );
    }
  }
}

const userService = new UserService();
export default userService;
