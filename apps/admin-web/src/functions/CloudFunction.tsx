import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FirebaseFunctionsState } from '../api/FirebaseFunctionsProvider';
import { useFunctions } from '../hooks/functions';
import useFunctionCall from '../hooks/useFunctionCall';
import ConfirmFunctionExecutionDialog from './ConfirmFunctionExecutionDialog';
import FunctionExecutionSucceededDialog from './FunctionExecutionSucceededDialog';
import FunctionsExecutionFailedDialog from './FunctionsExecutionFailedDialog';

type Props = {
  name: string;
  description: string;
  functionName: keyof FirebaseFunctionsState;
};

const CloudFunction: FC<Props> = ({ name, description, functionName }) => {
  const { t } = useTranslation();
  const confirmDialog = useDisclosure();
  const successDialog = useDisclosure();
  const errorDialog = useDisclosure();
  const funcs = useFunctions();
  const { func, loading, error, success, reset } = useFunctionCall(
    funcs[functionName]
  );
  useEffect(() => {
    if (error) errorDialog.onOpen();
    if (success) successDialog.onOpen();
  }, [error, success, successDialog, errorDialog]);

  const onConfirm = async () => {
    await func();
    confirmDialog.onClose();
  };

  return (
    <HStack width={'full'} justify={'space-between'}>
      <ConfirmFunctionExecutionDialog
        onClose={confirmDialog.onClose}
        isOpen={confirmDialog.isOpen}
        name={name}
        onConfirm={onConfirm}
        executing={loading}
      />
      <FunctionExecutionSucceededDialog
        onClose={() => {
          successDialog.onClose();
          reset();
        }}
        isOpen={successDialog.isOpen}
        name={name}
      />
      <FunctionsExecutionFailedDialog
        onClose={() => {
          errorDialog.onClose();
          reset();
        }}
        isOpen={errorDialog.isOpen}
        name={name}
        error={error}
      />
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Button onClick={confirmDialog.onOpen}>{t('execute')}</Button>
    </HStack>
  );
};

export default CloudFunction;
