import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/Firebase";
import { useAppStore } from "../store/AppStore";

export default function Header() {
  const auth = getAuth(app);
  const setUser = useAppStore((state) => state.setUser);
  function onSignout() {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <header>
      <label>AS App</label>
      <button onClick={onSignout}>Logout</button>
    </header>
  );
}
