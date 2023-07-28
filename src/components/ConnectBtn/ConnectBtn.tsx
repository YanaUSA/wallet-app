import React, { useState } from "react";
import Button from "../Button/Button";

import styles from "./ConnectBtn.module.scss";

interface ConnectBtnProps {
  onWallConnect: (provider: any) => void;
}

const ConnectBtn: React.FC<ConnectBtnProps> = ({ onWallConnect }) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Please install MetaMask");
    }

    return provider;
  };

  const connectBtnHandler = async () => {
    try {
      const provider = detectProvider();

      if (provider) {
        if (provider !== window.ethereum) {
          console.error(
            "Not window.ethereum provider. Do you have multiple wallet installed?"
          );
        }
        setIsConnecting(true);
        await provider.request({
          method: "eth_requestAccounts",
        });
        setIsConnecting(false);
      }

      onWallConnect(provider);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Button
      type="button"
      text={!isConnecting ? "Connect wallet" : "Loading..."}
      onClick={connectBtnHandler}
    ></Button>
  );
};

export default ConnectBtn;
