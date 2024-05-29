"use client";

import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/react";

export default function ProgressBar() {
    const [tasksData, setTasksData] = useState([]);


  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`/api/user/getTasks`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const taskData = await response.json();
        const mappedTasks = taskData.task.map((task) => ({
          ...task,
          status: task.completed ? "Suoritettu" : "Suorittamatta",
        }));
        setTasksData(mappedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);
 
  const completedTasks = tasksData.filter((task) => task.completed).length;
  const progressValue = tasksData.length > 0 ? (completedTasks / tasksData.length) * 100 : 0;

  return (
    <Progress
    aria-label="Task completion progress"
    label="Suoritettu"
    size="md"
    value={progressValue}
    color="success"
    showValueLabel={true}
    className="w-44 md:w-64"
    />
  );
}
