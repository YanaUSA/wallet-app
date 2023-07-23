import React from "react";
import styles from "./Layout.module.scss";

import Header from "../Header/Header";
import Main from "../Main/Main";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header sum={0} walletNumber={""} />
      <Main>{children}</Main>
      <footer className={styles.footer}>
        <p>
          &copy; 2023 Developed by Yana Usatiuk | <a href="github"></a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
