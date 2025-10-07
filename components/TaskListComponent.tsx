"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Task } from "@/data/tasks";
import prog from "@/image/tasks/prog.svg";
interface Props {
  tasks: Task[];
  completed: number[];
  onSelect: (task: Task) => void;
}

export default function TaskList({ tasks, completed, onSelect }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => onSelect(task)}
          className={`cursor-pointer flex items-center gap-[12px] rounded-[48px] p-4 bg-[#EAF2F5] text-[#22253B] backdrop-blur-md border border-white hover:bg-white transition duration-200 ${
            completed.includes(task.id) ? "opacity-50 line-through" : ""
          }`}
        >
          <Image src={prog} alt="Progtamming" width={20} />

          {task.title}
        </li>
      ))}
    </ul>
  );
}
