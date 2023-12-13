import { useContext } from 'react';
import { FirebaseContext } from '../components/FirebaseProvider';

export const useFirebase = () => useContext(FirebaseContext);
