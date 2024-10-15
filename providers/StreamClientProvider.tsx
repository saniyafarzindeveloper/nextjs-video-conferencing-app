import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    
  } from '@stream-io/video-react-sdk';
import { ReactNode, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
  const StreamVideoProvider = ({children} : {children:ReactNode}) => {
    const [videoClient setVideoClient] = useState<StreamVideoClient>();
    return (
      <StreamVideo client={videoClient}>
        
      </StreamVideo>
    );
  };

  export default StreamVideoProvider