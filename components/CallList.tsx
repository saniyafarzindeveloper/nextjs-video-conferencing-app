'use client'
import { useGetCalls } from "@/hooks/useGetCalls"
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/router";
import { useState } from "react";


export default function CallList({type}: {type: 'upcoming' | 'ended' | 'recordings'}) {
  const {endedCalls, upcomingCalls, isLoading, callRecordings} = useGetCalls();
  const router = useRouter();
  const [recordings, setRecording] = useState<CallRecording[]>([]);

  //call based calling
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings' :
      return recordings; 
      case 'upcoming':
        return upcomingCalls;
    
      default:
       return [];
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No previous calls';
      case 'recordings' :
        return 'No recordings';
      case 'upcoming':
        return 'No upcoming calls';
    
      default:
       return "";
    }
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* {calls && calls.length > 0 ? calls.map((meeting : Call | CallRecording) => (
          <MeetingCard />
        ))} */}
    </div>
  )
}
