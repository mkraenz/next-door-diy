import { useContext } from 'react';
import { FirebaseFunctionsContext } from '../api/FunctionsProvider';

export const useFunctions = () => useContext(FirebaseFunctionsContext);
