import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Chat = () => {
  const [messages,setmessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const fromUserId = user?._id;
 

  useEffect(()=>{

    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    const socket = createSocketConnection();
    socket.emit("joinChat",{firstName:user?.firstName,fromUserId,targetUserId});

    socket.on("messageRecieved",({text,firstName})=>{
        setmessages((messages)=>[...messages,{firstName,text}]);
      console.log(firstName + " : " + text);
    });

    return ()=>{socket.disconnect()};
  },[targetUserId,fromUserId]);

  const sendMessage = ()=>{

  
    const socket = createSocketConnection();
    socket.emit("sendMessage",{fromUserId,targetUserId,text:newMessage,firstName:user?.firstName}); 

    setNewMessage("");
    };
  

  return (
    <div className="text-black w-full md:w-1/2 border border-gray-300 mx-auto flex flex-col m-5 h-[70vh] rounded-xl shadow bg-white">
      
      {/* Header */}
      <h1 className="p-4 text-lg font-semibold border-b bg-gray-100 rounded-t-xl flex justify-center">
        Chat
      </h1>

      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg,index)=>{

          return (
               <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
      />
    </div>
  </div>
  <div className="chat-header">
    {msg.firstName }
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
          );

        })}
        {/* Messages will go here */}
       
</div>

      {/* Input Section */}
      <div className="p-4 border-t flex gap-2 bg-gray-50 rounded-b-xl">
        <input
          value={newMessage}
          onChange={(e)=>{setNewMessage(e.target.value)}}
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button 
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
