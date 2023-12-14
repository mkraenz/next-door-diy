import { Button, HStack, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useDb } from '../hooks/database';
import TableTest from './TableTest';

const Test = () => {
  const { t } = useTranslation();
  const { createUser } = useDb();

  const handlePress = async () => {
    await createUser({
      username: 'Hella Fella',
      subscribed: false,
    });
  };
  return (
    <VStack>
      <HStack width={'full'} justify={'flex-end'}>
        <Button onClick={handlePress}>{t('add user')}</Button>
      </HStack>
      <TableTest />;
    </VStack>
  );
};

export default Test;
