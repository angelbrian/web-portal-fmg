// import { firestore } from './firebase';
import { useEffect, useState } from 'react';
import { firestore } from '../../helpers/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ApproveUsers = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
  
    useEffect(() => {
      const fetchPendingUsers = async () => {
        try {
          const q = query(collection(firestore, 'pendingUsers'), where('approved', '==', false));
          const querySnapshot = await getDocs(q);
          setPendingUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching pending users: ", error);
        }
      };
  
      fetchPendingUsers();
    }, []);
  
    const approveUser = async (userId) => {
      try {
        await updateDoc(doc(firestore, 'pendingUsers', userId), { approved: true });
      } catch (error) {
        console.error("Error approving user: ", error);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            Aprobar Usuarios
          </Typography>
          <List>
            {pendingUsers.map(user => (
              <ListItem key={user.id} divider>
                <ListItemText primary={user.email} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="primary" onClick={() => approveUser(user.id)}>
                    <CheckIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    );
  };
  
  export default ApproveUsers;
