import React, { useState } from 'react';
import styles from './ContactCard.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import EditContact from '../EditContact/EditContact';

const ContactCard = ({ name, phone, group, url, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const removeHandler = async id => {
    await deleteDoc(doc(db, 'Contacts', id));
  };
  const editHandler = () => {
    setIsEditing(prevState => {
      return !prevState;
    });
  };
  return (
    <React.Fragment>
      {isEditing && (
        <EditContact
          id={id}
          name={name}
          phone={phone}
          group={group}
          url={url}
          toggleForm={editHandler}
        ></EditContact>
      )}
      <div className={styles.contactCard}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${url})` }}
        ></div>
        <div className={styles.textContent}>
          <div className={styles.name}>Name: {name}</div>
          <div className={styles.phone}>Phone: {phone}</div>
          <div className={styles.group}>Email: {group}</div>
          <div className={styles.buttonsContainer}>
            <CustomButton type={'button'} clickHandler={editHandler}>
              Edit
            </CustomButton>
            <CustomButton
              type={'button'}
              red={true}
              clickHandler={removeHandler.bind(null, id)}
            >
              Remove
            </CustomButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactCard;
