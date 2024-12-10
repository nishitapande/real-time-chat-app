import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Room = ({ wsRef }) => {
  const navigate = useNavigate();
  const [joinRoomId, setJoinRoomId] = useState('');
  const roomId = Math.floor(1000 + Math.random() * 9000);

  const handleCreateRoom = () => {
    if (wsRef.current) {
      wsRef.current.send(
        JSON.stringify({
          type: 'join',
          payload: { roomId },
        })
      );
    }
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim() !== '') {
      if (wsRef.current) {
        wsRef.current.send(
          JSON.stringify({
            type: 'join',
            payload: { roomId: parseInt(joinRoomId) },
          })
        );
      }
      navigate(`/chat/${joinRoomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Room {roomId}</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          This is a private room. Share the Room ID to let others join.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleCreateRoom}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
          >
            Create Room
          </button>

          <div className="flex flex-col gap-2">
            <label htmlFor="joinRoom" className="text-sm text-gray-300">
              Join an Existing Room
            </label>
            <input
              id="joinRoom"
              type="text"
              placeholder="Enter Room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={handleJoinRoom}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
