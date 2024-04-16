import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { makeStyles } from '@mui/styles';

interface MessageProps {
  own: boolean;
  message: any;
}

export function Message({ own, message }: MessageProps): ReactElement {
  const useStyles = makeStyles((theme: any) => ({
    message_wrap: {
      display: 'flex',
      marginBottom: '7px',
      justifyContent: own ? 'flex-end' : 'flex-start',
    },
    message: {
      display: 'flex',
      flexDirection: own ? 'row-reverse' : 'row',
      maxWidth: '540px',
      alignItems: 'stretch',
    },
    avatar: {
      margin: '5px',
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.message_wrap} sx={{}}>
      <Box className={classes.message}>
        <Box>
          <Avatar
            className={classes.avatar}
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
          />
        </Box>
        <Box
          sx={{
            p: '7px 12px 8px 12px',
            backgroundColor: own ? 'var(--primary)' : 'var(--comment-receiver)',
            color: own ? 'var(--white)' : 'var(--black)',
            borderRadius: '15px',
          }}
        >
          {message?.text}
        </Box>
      </Box>
    </Box>
  );
}
