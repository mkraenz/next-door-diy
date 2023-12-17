import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../api/database.types';
import { DataTable } from '../components/DataTable';
import { useDb } from '../hooks/database';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { manyUsersUpserted, usersSelectors } from '../users/users.slice';
import TableActions from './TableActions';

const columnHelper = createColumnHelper<User>();

const TableTest = () => {
  const { t } = useTranslation();
  const { listUsers } = useDb();
  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelectors.selectAll);
  const columns = useMemo<ColumnDef<User, string>[]>(
    // TODO check whether this rerenders on language change
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: t('id'),
      }),
      columnHelper.accessor('username', {
        cell: (info) => <p>{info.getValue()}</p>,
        header: t('username'),
      }),
      columnHelper.accessor('createdAt', {
        cell: (info) => t('datetime', { val: new Date(info.getValue()) }),
        header: t('createdAt'),
      }),
      columnHelper.accessor('subscribedSince', {
        cell: (info) => info.getValue() ?? t('notAvailable'),
        header: t('subscribedSince'),
      }),
      columnHelper.display({
        cell: ({ row: { original: user } }) => <TableActions user={user} />,
        header: t('actions'),
      }),
    ],
    [t]
  );

  useEffect(() => {
    const loadUsers = async () => {
      const newUsers = await listUsers();
      dispatch(manyUsersUpserted(newUsers));
    };
    loadUsers().catch(console.error);
  }, [dispatch, listUsers]);
  return <DataTable columns={columns} data={users} />;
};

export default TableTest;
