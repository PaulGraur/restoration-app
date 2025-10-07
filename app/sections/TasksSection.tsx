"use client";

import { useState } from "react";
import TaskList from "@/components/TaskListComponent";
import TaskDetail from "@/components/TaskDetailConponent";
import { tasks, Task } from "@/data/tasks";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function TasksSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useLocalStorage<number[]>("completed", []);

  const handleSelect = (task: Task) => {
    const index = tasks.findIndex((t) => t.id === task.id);
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % tasks.length;
    setSelectedIndex(nextIndex);
  };

  const handleComplete = (taskId: number) => {
    if (!completed.includes(taskId)) {
      setCompleted([...completed, taskId]);
    }
  };

  return (
    <section className="container bg-white rounded-[48px] py-[60px]">
      {selectedIndex === null ? (
        <TaskList tasks={tasks} completed={completed} onSelect={handleSelect} />
      ) : (
        <TaskDetail
          task={{
            ...tasks[selectedIndex],
            examples: tasks[selectedIndex].examples?.map((ex) => ({
              ...ex,
              testInput: ex.input,
            })),
          }}
          onNext={handleNext}
          onComplete={handleComplete}
          onBack={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
