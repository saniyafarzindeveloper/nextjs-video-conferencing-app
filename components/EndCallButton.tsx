'use client'
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


export default function EndCallButton() {
    const call = useCall();
    const router = useRouter();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isMeetingOwner = localParticipant && call?.state.createdBy &&  localParticipant.userId === call.state.createdBy.id //checking whether the local participant is the same as the onne who created this meeting
    if(!isMeetingOwner) return null; // dont show the button if not owner

  return (
    <Button onClick={async () => {
        await call.endCall(); 
        router.push('/'); 
    }} className="bg-red-600">
        End Call for Everyone
    </Button>
  )
}
