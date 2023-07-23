import React, { useState } from "react";
import styles from "./Form.module.scss";

import Button from "../Button/Button";

interface FormState {
  input1: string;
  input2: number | "";
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    input1: "",
    input2: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Виконати дії, пов'язані зі збереженням даних форми
    console.log("Дані з форми:", formState.input1, formState.input2);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Поле 1:
          <input
            className={styles.input}
            type="text"
            name="input1"
            value={formState.input1}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className={styles.label}>
          Поле 2:
          <input
            className={styles.input}
            type="number"
            name="input2"
            value={formState.input2}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <Button type="submit">Send</Button>
      </form>
      <br />
    </div>
  );
};

export default Form;
