import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FirebaseFunctionsState } from '../api/FirebaseFunctionsProvider';
import ConfirmFunctionExecutionDialog from './ConfirmFunctionExecutionDialog';

type Props = {
  name: string;
  description: string;
  functionName: keyof FirebaseFunctionsState;
};

const CloudFunction: FC<Props> = ({ name, description, functionName }) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // const funcs = useFunctions();
  // const { func, loading, error } = useFunctionCall(funcs[functionName]);

  return (
    <HStack width={'full'} justify={'space-between'}>
      <ConfirmFunctionExecutionDialog
        onClose={onClose}
        isOpen={isOpen}
        name={name}
        functionName={functionName}
      />
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Button onClick={onOpen}>{t('execute')}</Button>
    </HStack>
  );
};

export default CloudFunction;
