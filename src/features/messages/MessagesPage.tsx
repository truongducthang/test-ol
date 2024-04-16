import SendIcon from '@mui/icons-material/Send';
import { InputBase, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import MessagesApi from 'api/messages';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  messagesActions,
  messagesState,
} from 'features/messages/messagesSlice';
import { useAuth } from 'hooks/useAuth';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import {
  conversationsState,
  fetchThePrivateConversationOfAUser,
} from './conversationSlice';
import { DrawerMenuMessengerItem } from './DrawerMenuMessengerItem';
import { Messages } from './Messages';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: '40px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
}));

const SendIconWrapper = styled('div')(({ theme }) => ({
  // pointerEvents: 'none',
  right: 0,
  top: 0,
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
const drawerWidth = 240;
const smallDrawerWidth = 50;

export interface MessagesPageProps {
  [key: string]: any;
  window?: () => Window;
}
export default function MessagesPage(props: MessagesPageProps) {
  const { window } = props;
  const { currentUser } = useAuth();

  const dispatch = useAppDispatch();
  const { isOpenDrawer }: messagesState = useAppSelector(
    (state) => state.messages
  );
  // conversations
  const { conversations, filters }: conversationsState = useAppSelector(
    (state) => state.conversations
  );
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [currentMessages, setCurrentMessages] = useState<any>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const socket: any = useRef<any>(io('ws://localhost:8900'));
  //socket io
  useEffect(() => {
    console.log(io('ws://localhost:8900'));
    socket?.current?.on('getMessage', (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setCurrentMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    try {
      console.log({ currentUser_ID: currentUser._id });
      socket?.current?.emit('addUser', currentUser._id);
      socket?.current?.on('getUsers', (users: any) => {
        console.log({ users });
      });
    } catch (error) {}
  }, [currentUser?._id]);

  //end socket io
  useEffect(() => {
    function getThePrivateConversationOfAUser() {
      try {
        dispatch(
          fetchThePrivateConversationOfAUser({ userId: currentUser._id })
        );
      } catch (error) {}
    }
    getThePrivateConversationOfAUser();
  }, [filters, currentUser, dispatch]);

  // console.log({
  //   currentUser,
  //   currentChat,
  //   currentMessages,
  //   conversations,
  //   loading,
  //   filters,
  // });

  useEffect(() => {
    const getMessages = async () => {
      try {
        MessagesApi.getMessages(currentChat?._id).then((messages: any) => {
          setCurrentMessages(messages?.data?.conversations);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  //new message
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const onSubmit: SubmitHandler<{ message: string }> = async (data) => {
    const message = {
      text: data.message,
      conversationId: currentChat._id,
      sender: currentUser._id,
    };
    const receiverId: string = currentChat?.members?.find(
      (member: string[]) => member !== currentUser?._id
    );
    socket?.current.emit('sendMessage', {
      senderId: currentUser._id,
      receiverId,
      text: data.message,
    });
    const res = await MessagesApi.postMessage(message);
    setCurrentMessages((prev: any) => [...prev, res.data.doc]);
    //reset form
    reset();
    //end message
  };

  const drawerMenuMessenger = (
    <div>
      <Toolbar />
      <Divider />
      <Box>
        {conversations?.data?.conversations.map((conversation: any) => (
          <div key={conversation._id}>
            <DrawerMenuMessengerItem
              onClick={() => setCurrentChat(conversation)}
              currentUser={currentUser}
              conversation={conversation}
            />
          </div>
        ))}
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{
          width: { sm: smallDrawerWidth, md: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={isOpenDrawer}
          onClose={() => dispatch(messagesActions.toggleDrawer())}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerMenuMessenger}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { sm: smallDrawerWidth, md: drawerWidth },
            },
          }}
          open
        >
          {drawerMenuMessenger}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pb: 7 }}>
        <Toolbar />
        {currentChat ? (
          <Fragment>
            <Messages
              currentUser={currentUser}
              currentMessages={currentMessages}
            />

            <Paper
              sx={{
                position: 'fixed',
                bottom: 0,
                left: { sm: smallDrawerWidth, md: drawerWidth, xs: 1 },
                right: 0,
              }}
              elevation={3}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    height: '56px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Search
                    sx={{
                      backgroundColor: 'var(--comment-background)',
                    }}
                  >
                    <StyledInputBase
                      {...register('message', { required: true })}
                      placeholder="message..."
                      inputProps={{ 'aria-label': 'search' }}
                    />
                    <SendIconWrapper
                      sx={{
                        border: '1px solid #f6f6f6',
                        backgroundColor: 'var(--white)',
                      }}
                    >
                      <button type="submit">
                        <SendIcon
                          sx={{ color: 'var(--primary)' }}
                          onClick={() => console.log('hi')}
                        />
                      </button>
                    </SendIconWrapper>
                  </Search>
                </Box>
              </form>
            </Paper>
          </Fragment>
        ) : (
          'Open a conversation to start a chat.'
        )}
      </Box>
    </Box>
  );
}
