import React, { useState } from 'react';
import styles from './AddNewContactForm.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import { storage, db } from '../../Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import SuspenseSpinner from '../SuspenseSpinner/SuspenseSpinner';
// i know that Add new contact form and Edit contact form could be created from one 'parent' component to eliminate repeating of the code
// but i didnt have time to rearrange the component so the faster solution here was to create 2 similar forms with a slightly different logic
const AddNewContactForm = ({ toggleForm }) => {
  const initialData = {
    Name: '',
    Phone: '',
    Group: '',
  };
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const imageFile = e.target.querySelector('#Photo').files[0];
    let url = '';
    if (!imageFile || allowedTypes.includes(imageFile.type)) {
      if (imageFile) {
        // send to firebase
        const storageRef = ref(storage, imageFile.name);
        await uploadBytes(storageRef, imageFile); //This one returns a snaphot
        // get the URL of the uploaded file
        url = await getDownloadURL(ref(storage, imageFile.name));
      }

      // now we need to store the data in the database
      await addDoc(collection(db, 'Contacts'), {
        Name: data.Name,
        Phone: data.Phone,
        Group: data.Group,
        URL: url,
      });
      // in the end close the form
      setLoading(false);
      toggleForm();
    } else {
      setError('Please select an image file (png, jpeg or jpg)');
      return;
    }
  };

  return (
    <React.Fragment>
      <div onClick={toggleForm} className={styles.formBG}></div>
      {loading && <SuspenseSpinner></SuspenseSpinner>}
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
        <CustomButton type={'submit'}>Add new contact</CustomButton>
      </form>
    </React.Fragment>
  );
};

export default AddNewContactForm;
