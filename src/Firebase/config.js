import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGX_j4v9pcLJ4MHjJwRnWop4crIWNfT6k',
  authDomain: 'test-task-724f6.firebaseapp.com',
  projectId: 'test-task-724f6',
  storageBucket: 'test-task-724f6.appspot.com',
  messagingSenderId: '599887250105',
  appId: '1:599887250105:web:ac754fb6131c467bb15168',
  measurementId: 'G-Y6RWMBXFR1',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore();

export { storage, db };
