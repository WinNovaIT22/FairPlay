"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Progress,
} from "@nextui-org/react";
import Loading from "@/app/loading";

const columns = [
  { name: "TEHTÄVÄ", uid: "tasktitle" },
  { name: "PISTEET", uid: "points" },
  { name: "TILA", uid: "status" },
];

const INITIAL_VISIBLE_COLUMNS = ["tasktitle", "points", "status"];

export default function TasksTable() {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "tasktitle",
    direction: "ascending",
  });
  const [tasksData, setTasksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`/api/user/getTasks`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const taskData = await response.json();
        // Map the tasks to include a status field based on the completed boolean
        const mappedTasks = taskData.task.map((task) => ({
          ...task,
          status: task.completed ? "Suoritettu" : "Suorittamatta",
        }));
        setTasksData(mappedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={task.completed ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const completedTasks = tasksData.filter((task) => task.completed).length;
  const progressValue =
    tasksData.length > 0 ? (completedTasks / tasksData.length) * 100 : 0;

  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex flex-col items-center">
          <span className="text-black text-small mt-6">
            {tasksData.length} tehtävää
          </span>
        </div>
      </>
    );
  }, [tasksData.length]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-center mt-4">
        <Progress
          aria-label="Task completion progress"
          size="md"
          value={progressValue}
          color="success"
          showValueLabel={true}
          className="max-w-md mt-2"
        />
      </div>
    );
  }, [progressValue]);

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
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          emptyContent={
            isLoading ? <Loading /> : "Ei suorituksia valitulle vuodelle"
          }
          items={tasksData}
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
