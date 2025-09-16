import axios from "axios";

class AuthService {
  async loginUser({ email, password }) {
    try {
      const user = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (user) {
        return user.data.data.logInUser;
      }
      return null;
    } catch (error) {
      console.log(
        "error in auth service || logInUser || ",
        error.response.data.data
      );
    }
  }

  async registerUser({ username, email, password }) {
    try {
      const user = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (user) {
        return await this.loginUser({ email, password });
      }
      return null;
    } catch (error) {
      console.log("error in auth service || registerUser || ", error);
    }
  }

  async logout() {
    try {
      await axios.get("http://localhost:8080/api/v1/user/logout", {
        withCredentials: true,
      });
      console.log("user logout successfully");
    } catch (error) {
      console.log(
        "error in auth service || logout || ",
        error.response.data.data
      );
    }
  }
}

const authService = new AuthService();
export default authService;
