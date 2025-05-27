import React, { createContext, useState } from "react";

export const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const handleChange = (e) => setUser(e.target.value);
  return (
    <chatContext.Provider value={{ user, handleChange }}>
      {children}
    </chatContext.Provider>
  );
};

export default ChatProvider;
