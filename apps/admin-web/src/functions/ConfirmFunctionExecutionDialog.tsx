import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FirebaseFunctionsState } from '../api/FirebaseFunctionsProvider';
import { useFunctions } from '../hooks/functions';
import useFunctionCall from '../hooks/useFunctionCall';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  name: string;
  functionName: keyof FirebaseFunctionsState;
};

const ConfirmFunctionExecutionDialog: FC<Props> = ({
  functionName,
  isOpen,
  name,
  onClose,
}) => {
  const funcs = useFunctions();
  // TODO #4 move this one level higher, have a success dialog, and an error dialog
  const { func, loading, success } = useFunctionCall(funcs[functionName]);
  const cancelRef = useRef<any>();
  const { t } = useTranslation();

  const onConfirm = async () => {
    await func();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>
          {t('confirmFunctionExecutionDialogHeader', { name })}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {success
            ? t('executedSuccessfully')
            : t('confirmFunctionExecutionDialogBody', { name })}
        </AlertDialogBody>
        <AlertDialogFooter>
          {!loading && !success && (
            <Button ref={cancelRef} onClick={onClose}>
              {t('cancel')}
            </Button>
          )}
          {!success && (
            <Button
              colorScheme="red"
              ml={3}
              isLoading={loading}
              onClick={onConfirm}
            >
              {loading ? t('executing') : t('executeButton')}
            </Button>
          )}
          {success && (
            <Button colorScheme="green" onClick={onClose}>
              {t('hurray')}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmFunctionExecutionDialog;
