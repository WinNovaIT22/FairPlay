"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import { IoSearchOutline, IoEyeOutline } from "react-icons/io5";
import { roleColorMap } from "@/utils/rolecolormap.js";
import Loading from "@/app/loading";
import { MdBlock } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome } from "react-icons/fa";

const columns = [
  { name: "ETUNIMI", uid: "firstname" },
  { name: "SUKUNIMI", uid: "lastname" },
  { name: "SÄHKÖPOSTI", uid: "email" },
  { name: "ROOLI", uid: "role", sortable: true },
  { name: "TOIMINTO", uid: "action" },
];

const roleOptions = [
  { uid: "ylläpitäjä", name: "ylläpitäjä" },
  { uid: "valvoja", name: "valvoja" },
  { uid: "kilpailija", name: "kilpailija" },
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const INITIAL_VISIBLE_COLUMNS = ["firstname", "lastname", "email", "action"];

export default function Users() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "firstname",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`/api/admin/getBannedUserTable`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        const mappedUsers = userData.user.map((user) => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        }));
        setUsersData(mappedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const unblockUser = async (userId) => {
    try {
      const response = await fetch("/api/user/block/unblockUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        console.log("User unblocked successfully");
        window.location.reload(true);
      } else {
        console.error("Failed to unblock user");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...usersData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.lastname.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.vehicle.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      roleFilter !== "all" &&
      Array.from(roleFilter).length !== roleOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(roleFilter).includes(user.role)
      );
    }

    return filteredUsers;
  }, [usersData, filterValue, roleFilter, hasSearchFilter]);

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
      case "action":
        return (
          <Button
            key="block"
            color="danger"
            variant="flat"
            size="sm"
            onClick={() => unblockUser(user.id)}
            startContent={<MdBlock />}
          >
            Poista porttikielto
          </Button>
        );
      case "role":
        return (
          <Chip color={roleColorMap[user.role]} size="sm" variant="flat">
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

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="dark"
        />
        <div className="flex flex-col gap-4 mx-2">
          <div className="shadow-lg backdrop-blur-2xl text-2xl p-4 font-black rounded-lg flex justify-center items-center">
            <div className="absolute left-2">
              <a href="/yllapitaja" className="navigation-card">
                <FaHome size={24} color="black" />
              </a>
            </div>
            Kisasta poistetut - {usersData.length} poistettu
          </div>
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[36%]"
              placeholder="Etsi nimellä tai sähköpostilla"
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
              startContent={<IoSearchOutline size={22} className="mr-1" />}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="sm:flex">
                  <Button isIconOnly variant="solid">
                    <IoEyeOutline size={23} />
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
            </div>
          </div>
        </div>
      </>
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
      <div className="py-2 px-2 flex justify-between items-center mx-2">
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
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Edellinen
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Seuraava
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <div className="bg-gradient-to-b from-red-950 to-stone-900 min-h-screen w-full">
        <Table
          aria-label="Userstable"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
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
          <TableBody
            emptyContent={isLoading ? <Loading /> : "Ei estettyjä käyttäjiä"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id} className="cursor-pointer text-danger">
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
