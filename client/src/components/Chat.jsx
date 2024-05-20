import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../config';
import Navbar from './Navbar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const token = localStorage.getItem("token");

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { toke:localStorage.getItem("token") },
    });
    setSocket(newSocket);
    newSocket.on("connection", () => console.log('connection made'));
    newSocket.on('message', (msg) => {
      console.log(msg);
      setMessages((prevMessages) => [...prevMessages, {chat:msg.text ,  senderId:{username:msg.user}}]);
    });
    return () => newSocket.close();
  }, [socket]);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token
          }
        });
        if (!res.ok) {
          throw new Error("Server Error!");
        }
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMessages();
  }, [socket]);



  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      try {
        const res = await fetch(`${BASE_URL}/chat`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            authorization: token
          },
          body: JSON.stringify({ message: message })
        });
        if (!res.ok) {
          throw new Error("Server error!");
        }
        const data = await res.json();
      } catch (err) {
        console.log(err);
      }
      setMessages([...messages, { chat: message, senderId: { username: localStorage.getItem("username") } }]);
      socket.emit('message', message);
      setMessage('');
    }
  };

  useEffect(() => {
    scrollToBottom();
  },[messages]);

  // console.log(messages);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[85vh] bg-gray-100">
        <form onSubmit={sendMessage} className="w-full max-w-4xl mt-16 bg-white p-4 rounded shadow-md mb-4">
          <div className="h-[70vh] overflow-y-scroll mb-4">
            {messages?.map((msg, index) => (
              <div key={index} className="mb-4">
                {msg?.senderId?.username !== localStorage.getItem("username") ? (
                  <div className="flex flex-col gap-1">
                    <div className="text-lg flex flex-col gap-2 bg-blue-300 w-96 py-3 px-5 rounded-2xl text-gray-900 break-words">
                      {console.log(msg?.senderId?.username , "ding dong")}
                      <div className="text-base font-medium">{msg.chat}</div>
                    </div>
                    <div className="text-sm  italic text-gray-800  ml-2">{msg?.senderId?.username}</div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="flex flex-col gap-1">
                      <div className="bg-lime-300 text-lg w-96 px-5 py-3 rounded-2xl text-gray-900 break-words">
                        <div className="text-base font-medium">{msg.chat}</div>
                      </div>
                      <div className="flex justify-end mr-2 italic text-gray-800 text-sm">
                        {console.log(msg?.senderId?.username)}
                        {msg?.senderId?.username}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <input
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full outline-none border-gray-800 border-solid p-2 border rounded mb-2"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
