import { Box } from '@mui/system';
import React, { ReactElement, useEffect } from 'react';
import { Message } from './MessageItem';

interface MessagesProps {
  currentMessages: any;
  currentUser: any;
}

export function Messages({
  currentMessages,
  currentUser,
}: MessagesProps): ReactElement {
  //detect scroll
  const scrollRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);
  console.log({ hi: currentMessages });
  return (
    <Box>
      {currentMessages?.map((message: any, index: number) => (
        <div key={message?._id} ref={scrollRef}>
          <Message
            key={message?._id}
            own={currentUser?._id === message?.sender}
            message={message}
          />
        </div>
      ))}
    </Box>
  );
}
