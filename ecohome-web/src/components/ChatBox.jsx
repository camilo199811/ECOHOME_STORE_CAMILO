import { useEffect, useState } from "react";
import { connectSocket } from "../services/socket";

function ChatBox({ token, username }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const newSocket = connectSocket(token);
    setSocket(newSocket);

    newSocket.on("messages", (data) => {
      setMessages(data);
    });

    newSocket.on("new_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    if (!content.trim()) return;

    socket.emit("send_message", { content });
    setContent("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "20px" }}>
      <h2>Chat soporte</h2>

      <div style={{ height: "250px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "10px" }}>
            <strong>{msg.username}</strong>: {msg.content}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Escribe un mensaje"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatBox;