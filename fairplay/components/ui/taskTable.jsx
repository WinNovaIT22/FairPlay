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
import EditTask from "@/components/modals/editTask";

const columns = [
  { name: "TEHTÄVÄ", uid: "task" },
  { name: "PISTEET", uid: "points" },
  { name: "HALLITSE", uid: "action" },
];

const INITIAL_VISIBLE_COLUMNS = ["task", "points", "action"];

export default function TasksTable({ year }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "task",
    direction: "ascending",
  });
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`/api/admin/getTasks?year=${year}`);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const taskData = await response.json();
        const mappedTasks = taskData.task.map((task) => ({
          id: task.id,
          task: task.task,
          points: task.points,
          taskdesc: task.taskdesc,
          image: task.image,
          text: task.text,
          again: task.again,
        }));
        setUsersData(mappedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, [year]);

  const openNewTask = () => {
    setIsNewTaskOpen(true);
  };
  const closeNewTask = () => {
    setIsNewTaskOpen(false);
  };

  const openEditTask = (task) => {
    setCurrentTask(task);
    setIsEditTaskOpen(true);
  };
  const closeEditTask = () => {
    setIsEditTaskOpen(false);
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];

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
                <DropdownItem onClick={() => openEditTask(task)}>Muokkaa</DropdownItem>
                <DropdownItem color="danger" className="text-danger">Poista</DropdownItem>
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
      <div className="flex flex-col items-center">
        <span className="text-default-500 text-small mt-6">
          {usersData.length} tehtävää
        </span>
      </div>
    );
  }, [visibleColumns, usersData.length]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-center mt-4">
        <Button variant="bordered" onClick={openNewTask} startContent={<HiOutlinePlus size={23} />}>Lisää uusi suoritus</Button>
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
              align="center"
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
          year={year}
        />
      )}
      {isEditTaskOpen && currentTask && (
        <EditTask
          isOpen={isEditTaskOpen}
          onClose={closeEditTask}
          taskData={currentTask}
          year={year}
        />
      )}
    </div>
  );
}
