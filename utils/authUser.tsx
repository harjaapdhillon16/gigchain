import { useEffect, useState } from "react";
import { useInitalizeNear } from "./initializeNear";
import { useAccount } from "wagmi";
import axios from "axios";

export const useUser = () => {
  const { currentUser } = useInitalizeNear();
  const account = useAccount();
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    (async () => {
      const address = currentUser?.[0]?.accountId ?? account?.address;
      if (address) {
        const {
          data: { data },
        } = await axios.post("/api/supabase/select", {
          table: "users",
          match: {
            wallet: address,
          },
        });
        setUserDetails(data?.[0]);
      }
    })();
  }, [account?.address, currentUser]);

  return account.isConnected
    ? { isNear: false, ...account, supabaseUser: userDetails }
    : Array.isArray(currentUser) && currentUser.length !== 0
    ? {
        isConnected: true,
        isNear: true,
        address: currentUser[0].accountId,
        supabaseUser: userDetails,
      }
    : { isConnected: false };
};
