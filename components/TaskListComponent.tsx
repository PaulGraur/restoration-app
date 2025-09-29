import { Task } from "@/data/tasks";

interface Props {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

export default function TaskList({ tasks, onSelect }: Props) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => onSelect(task)}
          className="cursor-pointer rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-200 text-white"
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
