"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination } from "@nextui-org/react";
import { columns } from "@/utils/data";
import { capitalize } from "@/utils/utils";

const statusColorMap = {
    admin: "success",
    käyttäjä: "default",
};  

const INITIAL_VISIBLE_COLUMNS = ["firstname", "lastname", "email", "vehicle", "role"];

export default function App() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [sortDescriptor, setSortDescriptor] = useState({
      column: "firstname",
      direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const [usersData, setUsersData] = useState([]);
  
    const hasSearchFilter = Boolean(filterValue);
  
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`/api/users`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const userData = await response.json();
                const mappedUsers = userData.user.map(user => ({
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    vehicle: user.vehicle || '',
                    role: user.role,
                }));
                setUsersData(mappedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);
    
  
    const headerColumns = useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
  
    const filteredItems = useMemo(() => {
      let filteredUsers = [...usersData];
  
      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
          user.firstname.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
  
      return filteredUsers;
    }, [usersData, filterValue]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = useMemo(() => {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
      
        switch (columnKey) {
          case "role":
            return (
                <Chip className="capitalize" color={statusColorMap[user.role]} size="sm" variant="flat">
                    {cellValue}
                </Chip>
            );
          default:
            return cellValue;
        }
      }, []);
  
    const onNextPage = useCallback(() => {
      if (page < pages) {
        setPage(page + 1);
      }
    }, [page, pages]);
  
    const onPreviousPage = useCallback(() => {
      if (page > 1) {
        setPage(page - 1);
      }
    }, [page]);
  
    const onRowsPerPageChange = useCallback((e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }, []);
  
    const onSearchChange = useCallback((value) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    }, []);
  
    const onClear = useCallback(()=>{
      setFilterValue("")
      setPage(1)
    },[])
  
    const topContent = useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="primary">
                Add New
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Yhtensä {usersData.length} käyttäjää</span>
          </div>
        </div>
      );
    }, [
      filterValue,
      visibleColumns,
      onRowsPerPageChange,
      usersData.length,
      onSearchChange,
      hasSearchFilter,  
    ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Kaikki käyttäjät valittu"
            : `${selectedKeys.size} / ${filteredItems.length} valittu`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Edellinen
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Seuraava
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Userstable"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Ei käyttäjiä löydetty"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}