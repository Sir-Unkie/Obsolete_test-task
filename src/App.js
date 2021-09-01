import './App.scss';
import Contacts from './Components/Contacts/Contacts';
import AddNewContactForm from './Components/AddNewContactForm/AddNewContactForm';
import CustomButton from './Components/CustomButton/CustomButton';
import { useState } from 'react';
import InfoBlock from './Components/InfoBlock/InfoBlock';

function App() {
  const [newContactVisible, setNewContactVisible] = useState(false);
  const toggleForm = () => {
    setNewContactVisible(prevState => !prevState);
  };
  return (
    <div className='App'>
      <div className='AppContainer'>
        <InfoBlock></InfoBlock>
        <CustomButton type={'button'} clickHandler={toggleForm}>
          Add new contact
        </CustomButton>
        {newContactVisible && (
          <AddNewContactForm toggleForm={toggleForm}></AddNewContactForm>
        )}
        <Contacts />
      </div>
    </div>
  );
}

export default App;
