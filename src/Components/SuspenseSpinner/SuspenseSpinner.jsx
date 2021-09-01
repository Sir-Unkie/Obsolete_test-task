import React from 'react';
import styles from './SuspenseSpinner.module.scss';

const SuspenseSpinner = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}></div>
    </div>
  );
};

export default SuspenseSpinner;
