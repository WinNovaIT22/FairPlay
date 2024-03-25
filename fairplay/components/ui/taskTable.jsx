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
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddTask from "@/components/modals/addNewTask";


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
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

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

  const openNewTask= () => {
    setIsNewTaskOpen(true);
  };
  const closeNewTask = () => {
    setIsNewTaskOpen(false);
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

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-center mt-4">
        <Button variant="bordered" onClick={() => openNewTask()} startContent={<HiOutlinePlus size={23} />}>Lisää uusi suoritus</Button>
      </div>
    );
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Table
        aria-label="Taskstable"
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
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
      {isNewTaskOpen && (
          <AddTask
            isOpen={isNewTaskOpen}
            onClose={closeNewTask}
          />
        )}
    </div>
  );
}