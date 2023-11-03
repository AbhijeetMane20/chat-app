import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  getFirestore,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Message from "./Message";
import { app } from "../firebase/Firebase";
import { useAppStore } from "../store/AppStore";

export default function Content() {
  const [messages, setMessages] = useState([]);
  const [user] = useAppStore((state) => [state.user]);
  const db = getFirestore(app);
  const contentRef = useRef(null);
  const collecQuery = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc")
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(collecQuery, (snapshot) => {
      let allMessages = [];
      snapshot.forEach((doc) => {
        allMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(allMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="content" ref={contentRef}>
      {messages.map((message) => (
        <Message
          text={message.text}
          user={message.uid === user.uid ? "me" : "other"}
          photoURL={user ? user.photoURL : ""}
        />
      ))}
    </div>
  );
}
