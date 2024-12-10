import { useEffect, useRef, useState } from 'react';
import './App.css'
import Room from './Components/Room';
import ChatBox from './Components/ChatBox';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  const wsRef = useRef();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;
  },[])
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Room wsRef={wsRef} />} />
        <Route exact path="/chat/:roomId" element={<ChatBox wsRef = {wsRef} />} />
      </Routes>
    </>
  )
}

export default App
