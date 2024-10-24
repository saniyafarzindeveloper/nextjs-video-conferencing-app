"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

const MeetingTypeList = () => {
  const { toast } = useToast(); //shadcn toast
  const router = useRouter();
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  }); //getting values to get the meeting initialization details
  const [callDetails, setCallDetails] = useState<Call>(); //call details - get/create
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select date & time!",
        });
        return;
      }
      const id = crypto.randomUUID(); //generating random id's

      //once ID is generated, create a call
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a call!");

      //get tym of meeting started
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call); //setting all details to await call function

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      //post successfull meeting creation
      toast({
        title: "Meeting created successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create a meeting!",
      }); //shadcn toast call
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeeting("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeeting("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeeting("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModal
        isOpen={meeting === "isInstantMeeting"}
        onClose={() => setMeeting(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
