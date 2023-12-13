import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../components/DataTable';
import TableActions from './TableActions';

type Subscriber = {
  id: string;
  username: string;
  createdAt: string;
  subscribedSince?: string;
  subscribed: boolean;
};

const data: Subscriber[] = [
  {
    id: 'asdf',
    username: 'peter',
    createdAt: '2021-01-01',
    subscribed: false,
  },
  {
    id: 'asdf',
    username: 'peter',
    createdAt: '2021-01-01',
    subscribedSince: '2021-02-02',
    subscribed: true,
  },
];

const columnHelper = createColumnHelper<Subscriber>();

const TableTest = () => {
  const { t } = useTranslation();
  const columns = useMemo<ColumnDef<Subscriber, string>[]>(
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
  return <DataTable columns={columns} data={data} />;
};

export default TableTest;
