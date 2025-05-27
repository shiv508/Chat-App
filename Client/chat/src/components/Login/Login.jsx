import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Context hooks
import useChat from "../../Hooks/useChat";

// Assets
import CommonIcons from "../../assets/CommonIcons";

const Login = () => {
  // Local States
  const { user, handleChange } = useChat();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleAdmit = (e) => {
    e.preventDefault();
    navigate("/chat");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="w-1/3 h-[40%] bg-[#C7BBCA] rounded-3xl flex items-center justify-center relative shadow-lg p-4 z-10">
      <div className="bg-[#01264E] rounded-full h-40 w-40 absolute -top-20 flex items-center justify-center z-20">
        {CommonIcons.user}
      </div>
      <div className="flex items-center   w-full">
        <span className="bg-[#01264E] p-2">{CommonIcons.userAdd}</span>
        <input
          ref={inputRef}
          value={user}
          type="text"
          className="bg-[#656b72] p-6 w-full border-none outline-none text-white focus:bg-[#5f7894]"
          placeholder="Enter your name !!"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        className={`absolute -bottom-14 w-2/4 h-20 z-0 rounded-br-3xl rounded-bl-3xl uppercase text-slate-50 font-medium ${
          user ? "bg-[#01264E]" : "bg-[#C7BBCA]"
        }`}
        onClick={(e) => handleAdmit(e)}
        disabled={!user}
      >
        LOGIN
      </button>
    </div>
  );
};
export default Login;
