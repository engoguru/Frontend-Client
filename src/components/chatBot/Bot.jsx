import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function Bot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // unified array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatContainerRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:3000/chat", { message });
      const reply = res?.data?.reply ?? "No reply from server";

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: message },
        { sender: "bot", text: reply },
      ]);

      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Error: Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black w-full max-w-md mx-auto px-4 py-8 mt-5 flex flex-col border rounded-lg shadow-lg">
      <marquee behavior="alternate" direction="left">
        <p className="font-bold text-blue-600">Arattai Chat-bot Welcomes You!</p>
      </marquee>

      {/* Hidden scrollbar chat area */}
      <div
        ref={chatContainerRef}
        style={{
          backgroundColor: "black",
          borderRadius: "0.5rem",
          padding: "1rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          height: "500px",
          overflowY: "scroll",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        <style>
          {`
            .chat-scroll::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="flex flex-col gap-2 chat-scroll">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                maxWidth: "80%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: msg.sender === "user" ? "#3b82f6" : "#e5e7eb",
                color: msg.sender === "user" ? "white" : "black",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                display: "flex",
                gap: "0.5rem",
                fontFamily: "",
              }}
            >
              {msg.sender === "user" ? "" : "🤖"}
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg shadow bg-red-200"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Bot;
