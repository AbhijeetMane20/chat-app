import React from "react";
import { useAppStore } from "../store/AppStore";
export default function Message({ text, user }) {
  const userState = useAppStore((state) => state.user);
  return (
    <div
      className="message-container"
      style={{ justifyContent: user === "me" ? "end" : "" }}
    >
      <div>
        <label>{text} </label>
        {user !== "me" && <img src={userState.photoURL} alt="" />}
      </div>
    </div>
  );
}
