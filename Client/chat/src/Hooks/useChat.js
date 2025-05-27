import { chatContext } from "../Context/ChatContext";
import { useContext } from "react";

const useChat = () => {
  return useContext(chatContext);
};

export default useChat;
