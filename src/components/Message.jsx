import React from "react";
export default function Message({ text, user, photoURL }) {
  return (
    <div
      className="message-container"
      style={{ justifyContent: user === "me" ? "end" : "" }}
    >
      <div>
        {user === "me" && <img src={photoURL} />}
        <label>{text} </label>
        {user !== "me" && <img src={photoURL} />}
      </div>
    </div>
  );
}
