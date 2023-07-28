import { useState } from "react";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";

import "./App.scss";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [currentProvider, setCurrentProvider] = useState(null);

  const onWalletConnect = async (provider: any) => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        console.log("Please connect to MetaMask!");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const accBalanceEth = web3.utils.fromWei(
          await web3.eth.getBalance(accounts[0]),
          "ether"
        );

        setBalance(accBalanceEth);
        setIsConnected(true);
        setCurrentProvider(web3);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Header
        onWallConnect={onWalletConnect}
        currentAccount={currentAccount}
        balance={balance}
        isConnected={isConnected}
      />
      <main>
        <Form
          currentAccount={currentAccount}
          balance={balance}
          currentProvider={currentProvider}
          isConnected={isConnected}
        />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
