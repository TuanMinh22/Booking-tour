import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './ChatBox.css';
import { Avatar } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';

const ChatBox = () => {
  const socket = io('http://localhost:8900');
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const { user, dispatch } = useContext(AuthContext)
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/getUser/${user.Customer_ID}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('addUser', 1, true);
    });

    socket.on('getMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      senderId: user.Customer_ID,
      receiverId: 1,
      text: newMessage,
    };

    socket.emit('sendMessage', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
    try {
      const res = await axios.post("/message/create", {
        Customer_ID: user.Customer_ID,
        Admin_ID: 1,
        text: newMessage,
        sender: 2,
      });
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={toggleChat}>
        Hỗ trợ & Tư vấn
      </div>
      <div className="chat-body" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {
              message.sender === 1 ? (<Avatar src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" style={{ objectFit: 'cover', marginRight: '10px', width: '20px', height: '20px' }} />) : (user.Image && <Avatar src={user.Image} style={{ objectFit: 'cover', marginRight: '10px', width: '20px', height: '20px' }} />)
            }
            <span className='chat-message-text'>{message.text}</span>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        {
          user.Image && <Avatar src={user.Image} style={{ objectFit: 'cover', marginRight: '10px' }} />
        }
        <input type="text" name="message" placeholder="Nhập một tin nhắn..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default ChatBox;