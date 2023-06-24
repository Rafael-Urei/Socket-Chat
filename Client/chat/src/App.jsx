import "./styles/global.css";
import { Radio } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    socket.on("receive message", (data) => {});

    return () => {
      controller.abort();
    };
  }, [socket]);

  const messageRef = useRef();

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send message", {
      message: messageRef.current.value,
    });
  };

  return (
    <>
      <main className="bg-zinc-700 h-screen flex items-center justify-center">
        <div className="h-[450px] w-[350px] max-h-[450px] bg-zinc-900 rounded flex-col justify-between shadow-sm">
          <div className="w-full h-10 bg-zinc-800 rounded-tr rounded-tl flex items-center justify-between px-4">
            <MessageCircle className="h-4 w-4 text-violet-600"></MessageCircle>
            <Radio className="h-4 w-4 text-green-500" title="Online"></Radio>
          </div>
          <div className="h-5/6 bg-zinc-900"></div>
          <div className="w-full h-12 bg-zinc-800 rounded-br rounded-bl flex items-center justify-between px-4">
            <form className="flex justify-between items-center w-full gap-2">
              <input
                ref={messageRef}
                placeholder="Type your message..."
                className="rounded text-xs flex-1 bg-zinc-900 px-2 text-violet-500 h-8 placeholder-purple-700 placeholder-opacity-60"
              ></input>
              <button
                className="items-center justify-center"
                onClick={sendMessage}
              >
                <Send className="h-5 w-5 text-zinc-400"></Send>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
