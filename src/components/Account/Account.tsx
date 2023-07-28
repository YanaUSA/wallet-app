import styles from "./Account.module.scss";

interface AccountProps {
  currentAccount: string;
  balance: string;
}

const Account: React.FC<AccountProps> = (props) => {
  const acc = props.currentAccount;
  const formattedAcc = `${acc.slice(0, 5)}...${acc.slice(-4)}`;

  const formattedBalance = Number(props.balance).toFixed(3);

  return (
    <div>
      <ul className={styles.container}>
        <li className={styles.balance}>{formattedBalance}</li>
        <li>{formattedAcc}</li>
      </ul>
    </div>
  );
};

export default Account;
