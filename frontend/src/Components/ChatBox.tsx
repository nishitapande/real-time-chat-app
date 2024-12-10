import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatBox = ({ wsRef }) => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!wsRef.current) return;
    wsRef.current.onmessage = (e) => {
      setMessages((prevMessages) => [...prevMessages,(e.data.toString())]);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 py-4 px-6 shadow-lg">
        <h1 className="text-2xl font-semibold">Room {roomId}</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        ) : (
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message? 'bg-purple-600' : 'bg-gray-700'
                }`}
              >
                {message || 'Unknown message format'}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-gray-800 p-4 flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={() => {
            if (message.trim() === '') return;
            wsRef.current.send(
              JSON.stringify({
                type: 'chat',
                payload: {
                  message: message.trim(),
                },
              })
            );
            setMessage('');
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md font-semibold transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
