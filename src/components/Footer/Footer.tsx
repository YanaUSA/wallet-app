import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerRights}>
          &copy; 2023 Developed by Yana Usatiuk
          <span className={styles.footerLinkSpan}>|</span>{" "}
          <a href="https://github.com/YanaUSA/Wall-app" target="blank">
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
