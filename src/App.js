import { useEffect } from "react";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Content from "./components/Content";
import Header from "./components/Header";
import MessageBox from "./components/MessageBox";
import { useAppStore } from "./store/AppStore";
import { app } from "./firebase/Firebase";

function App() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useAppStore((state) => [state.user, state.setUser]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth, setUser]);
  function onLoginButtonClicked() {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => alert(err));
  }
  return (
    <div
      className="app"
      style={{
        alignItems: !user ? "center" : "",
        justifyContent: !user ? "center" : "",
      }}
    >
      {user ? (
        <>
          <Header />
          <Content />
          <MessageBox />
        </>
      ) : (
        <button style={{ width: "5rem" }} onClick={onLoginButtonClicked}>
          Login
        </button>
      )}
    </div>
  );
}

export default App;
