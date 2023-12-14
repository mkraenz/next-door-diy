import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../api/database.types';
import { DataTable } from '../components/DataTable';
import { useDb } from '../hooks/database';
import TableActions from './TableActions';

// const data: User[] = [
//   {
//     id: 'asdf',
//     username: 'peter',
//     createdAt: '2021-01-01',
//     subscribed: false,
//   },
//   {
//     id: 'asdf',
//     username: 'peter',
//     createdAt: '2021-01-01',
//     subscribedSince: '2021-02-02',
//     subscribed: true,
//   },
// ];

const columnHelper = createColumnHelper<User>();

const TableTest = () => {
  const { t } = useTranslation();
  const { listUsers } = useDb();
  const [users, setUsers] = useState<User[]>([]);
  const columns = useMemo<ColumnDef<User, string>[]>(
    // TODO check whether this rerenders on language change
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: t('ID'),
      }),
      columnHelper.accessor('username', {
        cell: (info) => <p>{info.getValue()}</p>,
        header: t('Username'),
      }),
      columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: t('Created At'),
      }),
      columnHelper.accessor('subscribedSince', {
        cell: (info) => info.getValue() ?? t('n/a'),
        header: t('Subscribed Since'),
      }),
      columnHelper.display({
        cell: ({ row: { original: user } }) => <TableActions user={user} />,
        header: t('Actions'),
      }),
    ],
    [t]
  );

  useEffect(() => {
    const loadUsers = async () => {
      const newUsers = await listUsers();
      setUsers(newUsers);
    };
    loadUsers().catch(console.error);
  }, [setUsers, listUsers]);
  return <DataTable columns={columns} data={users} />;
};

export default TableTest;
