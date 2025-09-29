"use client";

import { useState } from "react";
import { Task } from "@/data/tasks";
import CodeEditorComponent from "@/components/CodeEditorComponent";

interface Props {
  task: Task;
  onNext?: () => void;
  onComplete?: (taskId: number) => void;
}

export default function TaskDetail({ task, onNext }: Props) {
  const [code, setCode] = useState<string>(
    "function solution(arr) {\n  // твій код тут\n}"
  );
  const [result, setResult] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleRun = () => {
    try {
      const fn = eval(`(${code})`);
      const input = task.testInput ?? [];
      const output = fn(input);

      if (JSON.stringify(output) === JSON.stringify(task.expectedOutput)) {
        setResult("✅ Правильно!");
      } else {
        setResult(
          `❌ Неправильно.\nОчікувано: ${JSON.stringify(
            task.expectedOutput
          )}\nТвій результат: ${JSON.stringify(output)}`
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResult(`⚠️ ${err.name}: ${err.message}`);
      } else {
        setResult("⚠️ Сталася невідома помилка");
      }
    }
  };

  const handleNext = () => {
    setCode("function solution(arr) {\n  // твій код тут\n}");
    setResult(null);
    setShowHints(false);
    if (onNext) onNext();
  };

  return (
    <div className="mt-4 space-y-3 text-white">
      <h2 className="font-bold">{task.title}</h2>
      <p>{task.description}</p>

      <CodeEditorComponent code={code} setCode={setCode} />

      <div className="flex gap-2">
        <button
          onClick={handleRun}
          className="border-[1px] border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          Запустити
        </button>
        <button
          onClick={() => setShowHints(!showHints)}
          className="border-[1px] border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          {showHints ? "Сховати підказки" : "Показати підказки"}
        </button>
        {onNext && (
          <button
            onClick={handleNext}
            className="border-[1px] border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
          >
            Наступна задача
          </button>
        )}
      </div>

      {showHints && (
        <ul className="mt-2 list-disc list-inside text-gray-200">
          {task.hints.map((hint, i) => (
            <li key={i}>{hint}</li>
          ))}
        </ul>
      )}

      {result && <div className="mt-2 whitespace-pre-wrap">{result}</div>}
    </div>
  );
}
