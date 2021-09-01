import React, { useState } from 'react';
import styles from './EditContact.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import { storage, db } from '../../Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const EditContact = ({ toggleForm, id, name, phone, group, url }) => {
  const initialData = {
    Name: name,
    Phone: phone,
    Group: group,
    URL: url,
  };
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const dataChangeHandler = e => {
    switch (e.target.id) {
      case 'Name':
        setData(prevState => {
          return { ...prevState, Name: e.target.value };
        });
        break;
      case 'Phone':
        setData(prevState => {
          return { ...prevState, Phone: e.target.value };
        });
        break;
      case 'Group':
        setData(prevState => {
          return { ...prevState, Group: e.target.value };
        });
        break;

      default:
        break;
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (data.Name === '' || data.Phone === '' || data.Group === '') {
      alert('please fill all the fields');
      return;
    }
    const imageFile = e.target.querySelector('#Photo').files[0];
    if (!imageFile || allowedTypes.includes(imageFile.type)) {
      // send to firebase
      if (imageFile) {
        const storageRef = ref(storage, imageFile.name);
        await uploadBytes(storageRef, imageFile); //This one returns a snaphot
        // get the URL of the uploaded file
        url = await getDownloadURL(ref(storage, imageFile.name));
      }

      const contactRef = doc(db, 'Contacts', id);

      await updateDoc(contactRef, {
        Name: data.Name,
        Phone: data.Phone,
        Group: data.Group,
        URL: url,
      });

      // in the end close the form
      toggleForm();
    } else {
      setError('Please select an image file (png, jpeg or jpg)');
      return;
    }
  };

  return (
    <React.Fragment>
      <div onClick={toggleForm} className={styles.formBG}></div>
      <form onSubmit={submitHandler} action='' className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGroup}>
          <input type='file' id='Photo' />
          <label htmlFor='Photo'>Photo</label>
        </div>
        <div className={styles.formGroup}>
          <input
            value={data.Name}
            onChange={dataChangeHandler}
            type='text'
            id='Name'
          />
          <label htmlFor='Name'>Name</label>
        </div>
        <div className={styles.formGroup}>
          <input
            value={data.Phone}
            onChange={dataChangeHandler}
            type='phone'
            id='Phone'
          />
          <label htmlFor='Phone'>Phone</label>
        </div>

        <div className={styles.formGroup}>
          <input
            value={data.Group}
            onChange={dataChangeHandler}
            type='email'
            id='Group'
          />
          <label htmlFor='Group'>Email</label>
        </div>
        <CustomButton type={'submit'}>Update Contact</CustomButton>
      </form>
    </React.Fragment>
  );
};

export default EditContact;
