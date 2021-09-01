import React from 'react';
import styles from './CustomButton.module.scss';
const CustomButton = ({ children, clickHandler, type, red }) => {
  const onClickHandler = () => {
    if (clickHandler) {
      clickHandler();
    } else {
      return;
    }
  };
  return (
    <button
      onClick={onClickHandler}
      className={
        red ? `${styles.button} ${styles.buttonred}` : `${styles.button}`
      }
      type={`${type}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
