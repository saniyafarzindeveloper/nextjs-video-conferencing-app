// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck



"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

export default function CallList({
  type,
}: {
  type: "upcoming" | "ended" | "recordings";
}) {
  const { endedCalls, upcomingCalls, isLoading, callRecordings } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecording] = useState<CallRecording[]>([]);
  const{ toast } = useToast();

  //call based calling
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls";
      case "recordings":
        return "No recordings";
      case "upcoming":
        return "No upcoming calls";

      default:
        return "";
    }
  };

  //logic for extracting call recordings
  useEffect(() => {
    const fetchRecordings = async () => {
      //for handling: too many req handling error
      try {
        //get access to the meeting people were in
      const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

      //extracting recordings
      const recordings = callData
      .filter(call => call.recordings.length > 0)
      .flatMap(call => call.recordings) //if there are nested arrays it will put every array in a single array/list
      setRecording(recordings); 

      } catch (error) {
        console.log("fetchRecordings error", error)
        toast({title : 'Try again later'})
      }
      
    }
    if(type === 'recordings') fetchRecordings();
  }, [type, callRecordings]);

  if(isLoading) return <Loader />

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'Personal Meeting Room'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};