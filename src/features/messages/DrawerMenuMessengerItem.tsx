import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import userApi from 'api/userApi';
import React, { ReactElement, useEffect, useState } from 'react';
interface DrawerMenuMessengerItemProps {
  conversation: any;
  currentUser: any;
  onClick?: () => void;
}

export function DrawerMenuMessengerItem({
  conversation,
  currentUser,
  onClick,
}: DrawerMenuMessengerItemProps): ReactElement {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m: any) => m !== currentUser?._id
    );
    userApi.getUserById(friendId).then((user: any) => {
      setUser(user?.data?.doc);
    });

  }, [conversation?.members, currentUser]);
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={`${user?.name} + ${user?.email}` || ''} />
    </ListItem>
  );
}
