import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

//custom hooks
export const useGetById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  //fetching currently active call
  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id, //filter by ID
        },
      });
      if (calls.length > 0) setCall(calls[0]); //if any calls are present
      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
