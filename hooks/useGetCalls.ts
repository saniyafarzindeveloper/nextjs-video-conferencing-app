import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]); //call is the type
  //keeping track of the loading state
  const [isLoading, setIsLoading] = useState(false);
  //fetching calls
  const client = useStreamVideoClient();
  //calls should be fetched for a particular user
  const { user } = useUser(); //getting users from clerk

  useEffect(() => {
    //creating an async function to fetch calls
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [
            {
              field: "starts_at",
              direction: -1, //sort by start date
            },
          ],
          filter_conditions: {
            //show the call if i have created it or if we're the member in the call
            starts_at: { $exists: true }, //checking if call exists
            $or: [
              {
                created_by_user_id: user.id, //currently logged in user
              },
              {
                members: { $in: [user.id] },
              },
            ],
          },
        }); //passing opt object

        setCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]); //need both to fetch calls

  const now = new Date();

  //filtering out calls - ended/upcoming/recording

  //logic for finding ended calls
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt; //date atm is lesser then the call is already ended (tym has already paased)
  });

  //logic for finding new/upcoming calls
  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now; //date atm is graeter then the call is upcoming (yet to happen)
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
  };
};
