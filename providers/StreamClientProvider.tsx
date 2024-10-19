import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
  const StreamVideoProvider = ({children} : {children:ReactNode}) => {
    const [videoClient setVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser();
    useEffect(() => {
      if(!isLoaded || !user) return;
      if(!apiKey) throw new Error("API key is missing");

      const client = new StreamVideoClient({
        apiKey,
        user:{
          id: user?.id
        }
      })
    }, [user, isLoaded]);
    return (
      <StreamVideo client={videoClient}>
        
      </StreamVideo>
    );
  };

  export default StreamVideoProvider