import { useContext } from 'react';
import { DatabaseContext } from '../api/DatabaseProvider';

export const useDb = () => useContext(DatabaseContext);
