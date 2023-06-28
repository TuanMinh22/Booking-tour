import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8900');
const ChatWindow = ({ customerId }) => {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/getUser/${customerId}`);
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
      socket.emit('addUser', customerId, false);
    });

    socket.on('getMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      senderId: 1,
      receiverId: customerId,
      text: newMessage,
    };

    socket.emit('sendMessage', messageData);
    setMessages([...messages, messageData]);
    setNewMessage("");
    try {
      const res = await axios.post("/message/create", {
        Customer_ID: customerId,
        Admin_ID: 1,
        text: newMessage,
        sender: 1,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      {/* Chat messages */}
      <Box sx={{ height: '70vh', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            // textAlign={message.sender === 'User 1' ? 'right' : 'left'}
            textAlign={`${message.firstName} ${message.lastName}`}
            mt={2}
            mb={1}
          >
            <Typography variant="subtitle2" color="textSecondary">
              {message.sender === 1 ? 'minh nguyen' : `${message.firstName} ${message.lastName}`}
            </Typography>
            <Typography>{message.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Message input */}
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
