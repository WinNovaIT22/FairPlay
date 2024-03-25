"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Loading from "@/app/loading";
import { HiOutlineDotsVertical } from "react-icons/hi";


const columns = [
  { name: "TEHTÄVÄ", uid: "task" },
  { name: "PISTEET", uid: "points" },
  { name: "HALLITSE", uid: "action" },
];

const INITIAL_VISIBLE_COLUMNS = ["task", "points", "action"];

export default function TasksTable() {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "firstname",
    direction: "ascending",
  });
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "action":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <HiOutlineDotsVertical size={22} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Muokkaa</DropdownItem>
                <DropdownItem>Poista</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex flex-col items-center">
          <span className="text-default-500 text-small mt-6">
            {usersData.length} tehtävää
          </span>
        </div>
      </>
    );
  }, [visibleColumns, usersData.length]);

  return (
    <div className="flex items-center justify-center">
      <Table
        aria-label="Taskstable"
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="md:w-3/6 w-full"
        >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "action" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          emptyContent={
            isLoading ? <Loading /> : "Ei suorituksia valitulle vuodelle"
          }
          items={usersData}
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
