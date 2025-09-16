import { useParams } from "react-router";
import Chats from "./Chats";
import Header from "./Header";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import CircularProgress from "@mui/material/CircularProgress";
import msgService from "../../services/message.service,";

function ChatArea() {
  const { register, handleSubmit, reset } = useForm();
  const [receiver, setReceiver] = useState({});
  const [loading, setLoading] = useState(true);
  const receiverId = useParams();

  const sendMsg = async (data) => {
    await msgService.sendMsg(data, receiverId)
    getMsgs()
    reset();
  };

  const getMsgs = async () => {
     setLoading(true);
    userService
      .getRecever(receiverId)
      .then((receiver) => {
        if (receiver) {
          setReceiver(receiver);
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
   getMsgs();
  }, [receiverId]);

  return loading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="p-2 h-full">
      <Header receiver={receiver} />
      <Chats receiverId={receiverId} />
      <div>
        <form
          onSubmit={handleSubmit(sendMsg)}
          className="flex justify-around items-center"
        >
          <input
            type="text"
            placeholder="message"
            className="mt-2 w-[92%] bg-[#0D1821] rounded-2xl p-1 px-2 text-[#D0F4EA] font-medium"
            {...register("message", {
              required: true,
            })}
          />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatArea;
