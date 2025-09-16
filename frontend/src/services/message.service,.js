import axios from "axios";

class MessageService {
  async sendMsg({ message }, { receiverId }) {
    try {
      const msg = await axios.post(
        `http://localhost:8080/api/v1/msg/${receiverId}`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      );

      if (!msg) {
        console.log("message not send");
      }
    } catch (error) {
      console.log("error in msg service || sendMsg ", error);
    }
  }

  async getAlluserMsg({ receiverId }) {
    try {
      const msgs = await axios.get(
        `http://localhost:8080/api/v1/msg/${receiverId}`,
        {
          withCredentials: true,
        }
      );
      if (msgs) {
        return msgs.data.data;
      }
      return null;
    } catch (error) {
      console.log(
        "error in msg service || sendMsg || ",
        error.response.data.data
      );
    }
  }

  async msgCount(receiverId) {
    try {
      const msgs = await axios.get(
        `http://localhost:8080/api/v1/msg/unRead${receiverId}`,
        {
          withCredentials: true,
        }
      );
      if (msgs) {
        return msgs;
      }
      return null;
    } catch (error) {
      console.log(
        "error in msg service || msgCount || ",
        error.response.data.data
      );
    }
  }
}

const msgService = new MessageService();
export default msgService;
