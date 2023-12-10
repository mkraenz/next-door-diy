import { Icon, IconButton } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { FiBell, FiBellOff } from "react-icons/fi";
import { DataTable } from "../components/DataTable";

type Subscriber = {
  id: string;
  username: string;
  createdAt: string;
  subscribedSince?: string;
  subscribed: boolean;
};

const data: Subscriber[] = [
  {
    id: "asdf",
    username: "peter",
    createdAt: "2021-01-01",
    subscribed: false,
  },
  {
    id: "asdf",
    username: "peter",
    createdAt: "2021-01-01",
    subscribedSince: "2021-02-02",
    subscribed: true,
  },
];

const columnHelper = createColumnHelper<Subscriber>();

const TableTest = () => {
  const deleteUser = (username: string, id: string) => {
    confirm(
      `Unsubscribe: Are you sure you want to unsubscribe user '${username}' (ID ${id})?`
    );
  };
  const subscribeUser = (username: string, id: string) => {
    confirm(
      `Subscribe: Are you sure you want to subscribe user '${username}' (ID ${id})?`
    );
  };
  const columns = useMemo<ColumnDef<Subscriber, string>[]>(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "ID",
      }),
      columnHelper.accessor("username", {
        cell: (info) => <p>{info.getValue()}</p>,
        header: "Username",
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => info.getValue(),
        header: "Created At",
      }),
      columnHelper.accessor("subscribedSince", {
        cell: (info) => info.getValue() ?? "n/a",
        header: "Subscribed Since",
      }),
      columnHelper.display({
        cell: (info) =>
          info.row.original.subscribed ? (
            <IconButton
              onClick={() =>
                deleteUser(info.row.original.username, info.row.original.id)
              }
              colorScheme="red"
              icon={<Icon as={FiBellOff} />}
              aria-label="Delete"
            />
          ) : (
            <IconButton
              onClick={() =>
                subscribeUser(info.row.original.username, info.row.original.id)
              }
              icon={<Icon as={FiBell} />}
              aria-label="Delete"
            />
          ),
        header: "Actions",
      }),
    ],
    []
  );
  return <DataTable columns={columns} data={data} />;
};

export default TableTest;
