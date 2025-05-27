import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";

// Assets
import CommonIcons from "../../assets/CommonIcons";

// Custom Hook
import useChat from "../../Hooks/useChat";
import Messages from "../Messages/Messages";

const Chat = () => {
  const { user } = useChat();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [id, setId] = useState("");
  const scrollRef = useRef<null | HTMLElement>(null);
  const ENDPOINT = "http://localhost:5000/";
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

  const handleSend = () => {
    socket.emit("message", { message, id });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      console.log(data.user, data.message);
      setUserMessages([...userMessages, data]);
    });

    socket.on("userjoined", (data) => {
      console.log(data.user, data.message);
      setUserMessages([...userMessages, data]);
    });

    socket.on("leave", (data) => {
      console.log(data.user, data.message);
      setUserMessages([...userMessages, data]);
    });

    return () => {
      socket.on("disconnect", () => {});
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setUserMessages([...userMessages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.off();
    };
  }, [userMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [userMessages]);

  const isFirst =
    "bg-slate-50  p-3  rounded-tr-md rounded-br-2xl rounded-tl-2xl rounded-bl-2xl text-black text-base font-normal";

  const isSec =
    "bg-[#3B414A]  p-3 text-white rounded-tr-2xl rounded-br-2xl rounded-tl-md rounded-bl-2xl";

  return (
    <div className="w-1/3 h-4/5 bg-slate-50 overflow-y-auto">
      <div className="bg-slate-300 w-full h-[13%] flex items-center justify-between font-semibold text-lg px-4">
        Messages
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          {CommonIcons.close}
        </div>
      </div>
      <div className="bg-blue-100 h-[73%] p-4 w-full overflow-y-auto">
        {userMessages.map((item, idx) => (
          <Messages
            key={idx}
            user={item.id === id ? "" : item.user}
            className={item.id === id ? isFirst : isSec}
            message={item.message}
          />
        ))}
      </div>
      <div className="flex items-center h-[14%] bg-slate-300">
        <input
          value={message}
          type="text"
          className=" w-full ml-4 p-4 border-none outline-none rounded-lg"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="mx-4" onClick={handleSend}>
          {CommonIcons.send}
        </button>
        <span ref={scrollRef} />
      </div>
    </div>
  );
};

export default Chat;
