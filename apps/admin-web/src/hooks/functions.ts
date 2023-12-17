import { useContext } from 'react';
import { FirebaseFunctionsContext } from '../api/FirebaseFunctionsProvider';

export const useFunctions = () => useContext(FirebaseFunctionsContext);
