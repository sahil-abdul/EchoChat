import { useEffect, useState } from "react";
import msgService from "../../services/message.service,";
import { useSocketContext } from "../../context/socketContext";

function Chats({ receiverId }) {
  // console.log(receiverId)
  const [msgs, setMsgs] = useState([]);
  const {Socket} = useSocketContext();

  useEffect(() => {
    msgService.getAlluserMsg(receiverId).then((msg) => {
      setMsgs(msg);
    });
  }, [receiverId]);

  useEffect(() => {
    if (!Socket) return;

    const handleNewMsg = (newMsg) => {
      setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
    };

    Socket.on("newMsg", handleNewMsg);

    return () => {
      Socket.off("newMsg", handleNewMsg); // Proper cleanup
    };
  }, [Socket]);
  // console.log(msgs)
  return (
    <div className="h-5/6 w-full overflow-y-auto flex flex-col">
      {msgs.length > 0 &&
        msgs.map((msg) => (
          <div
            className={`bg-[#0D1821] max-w-2/4 p-2 rounded-2xl mb-2 ${
              !(msg.sender == receiverId.receiverId) ? "self-end" : ""
            } `}
            key={msg._id}
          >
            <p className="text-[#D0F4EA]">{msg.message}</p>
          </div>
        ))}
      
    </div>
  );
}

export default Chats;
