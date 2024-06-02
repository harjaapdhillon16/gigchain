import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import GigList from "@/components/giglist/list";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useInitalizeNear } from "@/utils/initializeNear";
import { Button } from "@nextui-org/react";
import "@near-wallet-selector/modal-ui/styles.css";
import { useUser } from "@/utils/authUser";
import { ProfileFormModal } from "../components/profileFormModal";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {
  const { signIn } = useInitalizeNear();
  const { isConnected, ...allData } = useUser();
  const [showModal, setShowModal] = useState(false);

  console.log(allData);

  useEffect(() => {
    (async () => {
      if (isConnected) {
        const { address } = allData;
        const {
          data: { data },
        } = await axios.post("/api/supabase/select", {
          table: "users",
          match: {
            wallet: address,
          },
        });
        if (Boolean(data?.[0]?.wallet) === false) {
          setShowModal(true);
        }
      }
    })();
  }, [isConnected, allData]);

  return (
    <DefaultLayout>
      <div className=" pt-16">
        <section className="flex  flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>Find&nbsp;</h1>
            <h1 className={title({ color: "violet" })}>Gigs&nbsp;</h1>
            <h1 className={title()}>On Chain</h1>
            <h4 className={subtitle({ class: "mt-4 text-xs" })}>
              Fiverr for NEAR is here
            </h4>
          </div>
          <ProfileFormModal visible={showModal} />
          {!isConnected && (
            <div className="flex gap-3">
              <Button
                className={buttonStyles({
                  color: "primary",
                  radius: "md",
                  variant: "shadow",
                  size: "md",
                  class: "w-[fit-content] font-bold",
                })}
                onClick={() => {
                  signIn();
                }}
              >
                Connect To NEAR Wallet
              </Button>
              <ConnectButton label="Connect Ethereum Wallet" />
            </div>
          )}

          <div className="mt-2">
            <Snippet hideSymbol hideCopyButton variant="bordered">
              <span>
                Find work and get paid in <Code color="primary">web3</Code>
              </span>
            </Snippet>
          </div>
        </section>
        <GigList />
      </div>
    </DefaultLayout>
  );
}
