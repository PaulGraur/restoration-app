import { Task } from "@/data/tasks";

interface Props {
  tasks: Task[];
  completed: number[];
  onSelect: (task: Task) => void;
}

export default function TaskList({ tasks, completed, onSelect }: Props) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => onSelect(task)}
          className={` cursor-pointer rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-200 text-white ${
            completed.includes(task.id) ? "opacity-50 line-through" : ""
          }`}
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
