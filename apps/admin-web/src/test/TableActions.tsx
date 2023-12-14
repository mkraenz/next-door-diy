import { HStack, Icon, IconButton, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBell, FiBellOff, FiTrash } from 'react-icons/fi';
import { User } from '../api/database.types';

type Props = {
  user: User;
};

const TableActions: FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const deleteUser = (username: string, id: string) => {
    confirm(
      `Delete: Are you sure you want to delete user '${username}' (ID ${id}) and all associated data to the user? This can not be undone!`
    );
  };
  const subscribeUser = (username: string, id: string) => {
    confirm(
      `Subscribe: Are you sure you want to subscribe user '${username}' (ID ${id})?`
    );
  };
  const unsubscribeUser = (username: string, id: string) => {
    confirm(
      `Unsubscribe: Are you sure you want to unsubscribe user '${username}' (ID ${id})?`
    );
  };

  return (
    <HStack>
      {user.subscribed ? (
        <Tooltip label={t('Unsubscribe user')}>
          <IconButton
            onClick={() => unsubscribeUser(user.username, user.id)}
            colorScheme="orange"
            icon={<Icon as={FiBellOff} />}
            aria-label={t('Unsubscribe user')}
          />
        </Tooltip>
      ) : (
        <Tooltip label={t('Subscribe user')}>
          <IconButton
            onClick={() => subscribeUser(user.username, user.id)}
            icon={<Icon as={FiBell} />}
            aria-label={t('Subscribe user')}
          />
        </Tooltip>
      )}

      <Tooltip label={t('Delete user')}>
        <IconButton
          onClick={() => deleteUser(user.username, user.id)}
          colorScheme="red"
          icon={<Icon as={FiTrash} />}
          aria-label={t('Delete user')}
        />
      </Tooltip>
    </HStack>
  );
};

export default TableActions;
