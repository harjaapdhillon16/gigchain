//@ts-nocheck
import * as nearAPI from "near-api-js";
import getConfig from "./nearConfig";
import { useEffect, useState } from "react";
import { viewMethodOnContract } from "./methods";
import { setupModal } from "@near-wallet-selector/modal-ui";
import LedgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";
import meteorIconUrl from "@near-wallet-selector/meteor-wallet/assets/meteor-icon.png";
// wallet selector options
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import nearWalletIconUrl from "@near-wallet-selector/near-wallet/assets/near-wallet-icon.png";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import senderIconUrl from "@near-wallet-selector/sender/assets/sender-icon.png";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import HereWalletIconUrl from "@near-wallet-selector/here-wallet/assets/here-wallet-icon.png";
import { connect, keyStores } from "near-api-js";

const sender = setupSender({
  iconUrl: "https://avatars.githubusercontent.com/u/93973527?s=280&v=4",
});

const hereWallet = setupHereWallet({
  iconUrl: "https://avatars.githubusercontent.com/u/104726061?s=200&v=4",
});

const meteorWallet = setupMeteorWallet({
  iconUrl: "https://avatars.githubusercontent.com/u/103883315?s=280&v=4",
});

const DEFAULT_TGAS = "90000000000000";
const NO_DEPOSIT = "0";

async function initNear() {
  const nearConfig = getConfig(process.env.NEAR_ENV || "mainnet");

  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig });
  const selector = await setupWalletSelector({
    network: "mainnet",
    modules: [
      meteorWallet,
      setupMyNearWallet({ iconUrl: 'https://avatars.githubusercontent.com/u/105006051?s=200&v=4' }),
      setupLedger({ iconUrl: 'https://preview.redd.it/x1lnyco3fbz61.png?width=200&format=png&auto=webp&s=d0191141a323fa61e04ccdd8c7700eaa54b81dd4' }),
      sender,
      hereWallet,
    ],
  });
  // Initialize wallet connection
  const wallet = await selector.wallet("my-near-wallet");
  const currentUser = await wallet.getAccounts();

  const signIn = async () => {
    const modal = setupModal(selector, {
      contractId: "test.near",
    });
    modal.show();
  };

  const signOut = async () => {
    await wallet.signOut();
  };

  return { nearConfig, currentUser, signIn, signOut };
}

export const useInitalizeNear = (): any => {
  const [loading, setLoading] = useState(true);
  const [dataReturned, setDataReturned] = useState({});
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allData = await initNear();
        setDataReturned(allData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return { loading, ...dataReturned };
};
