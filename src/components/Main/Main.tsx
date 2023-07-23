import React from "react";

import styles from "./Main.module.scss";
import Form from "../Form/Form";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
      <Form />
    </main>
  );
};

export default Main;
