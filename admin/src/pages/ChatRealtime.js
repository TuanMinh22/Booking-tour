import React, { useEffect, useState } from 'react';
import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import ChatWindow from './ChatWindow';

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [idSelected, setIdSelected] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/message/getUser");
        setConversations(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  const handleConversationSelect = (conversationId) => {
    // Update the selected conversation logic here
    setIdSelected(conversationId);
  };


  return (
    <Container>
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box sx={{ width: '25%', padding: 2, borderRight: '1px solid grey' }}>
          <Typography variant="h6" gutterBottom>
            Conversations
          </Typography>
          <List>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation.Customer_ID}
                button
                onClick={() => handleConversationSelect(conversation.Customer_ID)}
              >
                <ListItemText primary={`${conversation.firstName} ${conversation.lastName}`} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat window */}
        <Box sx={{ flex: 1, padding: 2 }}>
          {conversations.map((conversation) => (
            conversation.Customer_ID === idSelected && (
              <ChatWindow key={conversation.Customer_ID} customerId={idSelected} />
            )
          ))}
        </Box>
      </Box>
    </Container>
  );
}
