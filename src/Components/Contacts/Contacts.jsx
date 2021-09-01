import React, { useState, useEffect } from 'react';
import styles from './Contacts.module.scss';
import ContactCard from '../ContactCard/ContactCard';
// import useFirestore from '../../hooks/useFirestore';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase/config';

const Contacts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Contacts'), snapshot => {
      let arr = [];
      snapshot.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setData(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.contactsContainer}>
      {data.map(contact => {
        return (
          <ContactCard
            key={contact.id}
            id={contact.id}
            url={contact.URL}
            name={contact.Name}
            phone={contact.Phone}
            group={contact.Group}
          ></ContactCard>
        );
      })}
    </div>
  );
};

export default Contacts;
