import { useState } from "react";
import "./App.css";
import Join from "./components/join/Join.jsx";
import Chat from "./components/chat/chat"; 
import Navbar from "./components/navbar";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);

  return (
    <>
      <Navbar />

      <div className="App">
        {
          chatVisibility ? <Chat /> : <Join setChatVisibility={setChatVisibility} />
        }
      </div>
    </>
  );
}

export default App;