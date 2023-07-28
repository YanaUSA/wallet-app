import styles from "./Header.module.scss";
import ConnectBtn from "../ConnectBtn/ConnectBtn";
import Account from "../Account/Account";

interface HeaderProps {
  // onWallConnect: () => void;
  onWallConnect: any;
  currentAccount: string;
  balance: string;
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div>
      <header className={styles.header}>
        <img className={styles.logo} src="/MetaMask.png" alt="Logo MetaMask" />
        {!props.isConnected ? (
          <ConnectBtn onWallConnect={props.onWallConnect} />
        ) : (
          <Account
            balance={props.balance}
            currentAccount={props.currentAccount}
          />
        )}
      </header>
    </div>
  );
};

export default Header;
