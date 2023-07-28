import React, { useState } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import styles from "./Form.module.scss";

interface FormProps {
  currentAccount: string;
  balance: string;
  currentProvider: any;
  isConnected: boolean;
}

const Form: React.FC<FormProps> = ({
  currentAccount,
  balance,
  currentProvider,
  isConnected,
}) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [amountToSend, setAmountToSend] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const web3 = new Web3(currentProvider);

  const handleInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case "walletAddress":
        setWalletAddress(value);
        break;
      case "amountToSend":
        setAmountToSend(value);
        break;
      default:
        return;
    }
  };

  const resetForm = () => {
    setWalletAddress("");
    setAmountToSend("");
  };

  const checkAddress = (walletAddress: string) => {
    const isAddressPattern = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);

    const isCheckSum = Web3.utils.checkAddressChecksum(walletAddress);

    if (!isAddressPattern || !isCheckSum) {
      return false;
    } else {
      return true;
    }
  };

  const sendTransaction = async (
    walletAddress: string,
    checkedValue: string
  ) => {
    try {
      setShowLoader(true);

      // Get the block number
      const currentBlockNumber = await web3.eth.getBlockNumber();
      console.log("Current block number:", currentBlockNumber);

      // Send transaction
      const transactionReceipt = await web3.eth.sendTransaction({
        from: currentAccount,
        to: walletAddress,
        value: checkedValue,
      });
      console.log("Transaction Receipt:", transactionReceipt);

      // Get the updated block number
      const updatedBlockNumber = await web3.eth.getBlockNumber();
      console.log("Updated block number:", updatedBlockNumber);

      setShowLoader(false);
      toast.success("Eth are successfully send");
    } catch (error) {
      setShowLoader(false);
      toast.error("Opps..! Transaction canceled.");
      console.error(error);
    }
  };

  //========= submit ===========//
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidAddress = checkAddress(walletAddress);

    if (!isValidAddress) {
      return toast.warn(
        "Please insert valid Ether address according to pattern"
      );
    }

    if (Number(amountToSend) >= Number(balance)) {
      return toast.warn("You don't have enough ETH on balance");
    } else if (Number(amountToSend) <= 0) {
      return toast.warn("Amount can not be negative value or 0");
    }

    // checked different multiples transfer amounts
    try {
      const checkedValue = web3.utils.toWei(amountToSend.toString(), "ether");

      sendTransaction(walletAddress, checkedValue);
    } catch (error) {
      toast.warn("Please, enter correct number");
      console.log(error);
    }
    resetForm();
  };

  return (
    <>
      <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset} disabled={!isConnected}>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="walletAddress"
              placeholder="wallet address"
              value={walletAddress}
              pattern="^0x[a-fA-F0-9]{40}$"
              title="Wallet address example: 0x111111111ef11bFaF11111111C11111c1f111111"
              required
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="amountToSend"
              placeholder="0.000"
              value={amountToSend}
              onChange={handleInputChange}
            />
          </label>
          <Button
            type="submit"
            text={"Send tokens"}
            loading={showLoader}
            disabled={showLoader}
          />
        </fieldset>
      </form>
      <br />
    </>
  );
};

export default Form;
