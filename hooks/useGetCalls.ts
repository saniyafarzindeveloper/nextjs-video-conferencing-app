import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCalls = () =>{
    const [calls, setCalls] = useState<Call[]>([]); //call is the type
    //keeping track of the loading state
    const [isLoading, setIsLoading] = useState(false);
    //fetching calls
    const client = useStreamVideoClient();
    //calls should be fetched for a particular user
    const {user} = useUser(); //getting users from clerk

    useEffect(() => {
        //createing an async function to fetch calls
        const loadCalls = async () =>{
            if(!client || !user?.id) return;

            setIsLoading(true);
            // try {
                
            // } catch (error) {
                
            // }
        }
    }, [client, user?.id]); //need both to fetch calls

}