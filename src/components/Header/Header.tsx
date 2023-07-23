import React, { useState } from "react";
import styles from "./Header.module.scss";

import Button from "../Button/Button";

interface HeaderProps {
  sum: number;
  walletNumber: string;
}

const Header: React.FC<HeaderProps> = ({ sum, walletNumber }) => {
  const [showSum, setShowSum] = useState(false);

  const handleButtonClick = () => {
    setShowSum(!showSum);
  };

  return (
    <header className={styles.header}>
      {/* <img className={styles.logo} src="/logo.svg" alt="Logo" /> */}
      <span className={styles.logo} />
      {walletNumber ? (
        <div>
          <p>Sum: {sum}</p>
          <p>Wallet: {walletNumber}</p>
        </div>
      ) : (
        <Button onClick={handleButtonClick}>Connect wallet</Button>
      )}
    </header>
  );
};

export default Header;
