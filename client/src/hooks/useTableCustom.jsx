import { useMemo } from "react";
import Toggle from "../components/contact/Toggle";
import RemoveContact from "../components/contact/RemoveContact";
import { COLUMNS } from "../components/shared/columns";
import {
  useTable,
  useRowSelect,
  usePagination,
  useFilters,
  useSortBy,
} from "react-table";
const useTableCustom = ({
  contacts,
  initialState = { pageSize: 5 },
  onChangeToggle,
  handleRemove,
}) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => contacts, [contacts]);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    getToggleAllRowsSelectedProps,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          disableFilters: true,
          Cell: ({ row }) => {
            const isIndeterminate =
              !!getToggleAllRowsSelectedProps().indeterminate;
            return (
              <Toggle
                {...row.getToggleRowSelectedProps()}
                onChangeToggle={onChangeToggle}
                row={row}
                id={row.cells[9].row.original.id}
                isDisabled={isIndeterminate}
              />
            );
          },
        },
        ...columns,
        {
          id: "selection2",
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }) => (
            <RemoveContact
              {...row.getToggleRowSelectedProps()}
              handleRemove={handleRemove}
              row={row}
              id={row.cells[9].row.original.id}
            />
          ),
        },
      ]);
    }
  );

  return {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    getToggleAllRowsSelectedProps,
  };
};

export default useTableCustom;
