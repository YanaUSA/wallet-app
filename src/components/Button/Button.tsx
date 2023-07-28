import { ReactComponent as LoaderIcon } from "../../assets/icons/loader.svg";

import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  text,
  type,
  loading = false,
  disabled,
}) => {
  return (
    <button
      className={`${styles.submitBtn} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {!loading ? text : <LoaderIcon className={styles.submitBtn__spinner} />}
    </button>
  );
};

export default Button;
