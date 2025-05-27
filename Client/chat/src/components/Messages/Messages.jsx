import React from "react";

const Messages = ({ user, message, className }) => {
  if (user) {
    return (
      <div className={`flex  flex-col items-start mb-2 `}>
        <div>{user}</div>
        <div className={`${className}`}>{message}</div>
      </div>
    );
  }

  return (
    <div className={`flex  flex-col items-end  mb-2`}>
      <div>You</div>
      <div className={`${className}`}>{message}</div>
    </div>
  );
};

export default Messages;
