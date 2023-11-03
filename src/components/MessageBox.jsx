import React, { useState, useCallback } from "react";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase/Firebase";
import { useAppStore } from "../store/AppStore";

export default function MessageBox() {
  const [message, setMessage] = useState("");
  const [user] = useAppStore((state) => [state.user]);
  const db = getFirestore(app);
  const onSend = useCallback(async () => {
    setMessage("");
    if (user) {
      try {
        const colRef = collection(db, "messages");
        await addDoc(colRef, {
          text: message,
          uid: user.uid,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        alert(error);
      }
    }
  }, [db, user, message]);
  return (
    <div className="msg-box">
      <input
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
}
