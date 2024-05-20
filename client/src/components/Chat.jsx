import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../config';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const toke=localStorage.getItem("token")

  useEffect(()=> {
    const fun= async()=> {
      try{
        const res= await fetch(`${BASE_URL}/chat`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            authorization: localStorage.getItem("token")
          }
        });
        if(!res.ok){
          throw new Error("Server Error!")
        }
        const data= await res.json()
        console.log(data);
      }catch(err){
        console.log(err);
      }
    }

    fun()
    
  },[])


  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { toke },
    });
    setSocket(newSocket);
    newSocket.on("connection",()=> console.log('connection made'))
    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => newSocket.close();
  }, [toke]);

  const sendMessage = async() => {
    if (message) {
      console.log(message);
      try{
        const res= await fetch(`${BASE_URL}/chat`,{
          method:"POST",
          headers:{
            'Content-Type':"application/json",
            authorization: localStorage.getItem('token')
          },
          body:JSON.stringify({message:message})
        });
        if(!res.ok){
          throw new Error("Server error!")
        }
        const data= await res.json();
        console.log(data);
      }catch(err){
        console.log(err);
      }
      socket.emit('message', message);
      setMessage('');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 rounded shadow-md mb-4">
        <div className="h-64 overflow-y-scroll mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.user}: </strong>{msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={sendMessage} className="w-full bg-blue-500 text-white py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
