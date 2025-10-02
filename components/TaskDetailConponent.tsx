"use client";

import { useState } from "react";
import { Task } from "@/data/tasks";
import Button from "@/components/ButtonComponent";
import CodeEditorComponent from "@/components/CodeEditorComponent";
import { motion, AnimatePresence } from "framer-motion";

interface Example {
  input: unknown;
  output: unknown;
  testInput: unknown;
}

interface Props {
  task: Task & { examples?: Example[] };
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: (taskId: number) => void;
}

export default function TaskDetailConponent({ task, onNext, onBack }: Props) {
  const [code, setCode] = useState<string>(
    "function solution(arr) {\n  // твій код тут\n}"
  );
  const [result, setResult] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleRun = () => {
    try {
      const fn = new Function("return " + code)() as (
        ...args: unknown[]
      ) => unknown;

      const args = Array.isArray(task.testInput)
        ? task.testInput
        : [task.testInput];

      const output = fn(...args);

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
    setShowDetail(false);
    onNext?.();
  };

  const variants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", overflow: "visible" },
  };

  return (
    <div className="mt-4 space-y-3 text-white">
      {onBack && <Button onClick={onBack} text="Повернутись до списку задач" />}

      <h1 className="text-[32px] text-center font-black mb-4">{task.title}</h1>

      <AnimatePresence>
        {task.examples && task.examples.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="mt-2"
          >
            <h3 className="font-semibold">Приклади:</h3>
            <ul className="list-disc list-inside text-gray-200">
              {task.examples.map((ex, i) => (
                <li key={i}>
                  <pre className="bg-white/5 p-2 rounded">
                    Вхід: {JSON.stringify(ex.input)}
                    {"\n"}
                    Вихід: {JSON.stringify(ex.output)}
                  </pre>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-[30%_70%] gap-4">
        <div className="bg-[#1e1e1e] flex flex-col justify-between border border-white/20 rounded-[20px] text-gray-100 whitespace-pre-wrap p-4">
          <p>{task.description}</p>

          <div className="bg-white text-[#1e1e1e] font-bold border-white/20 rounded-[20px] px-4 py-2">
            {result ? (
              <p className="whitespace-pre-wrap">{result}</p>
            ) : (
              "Очікуємо результат"
            )}
          </div>
        </div>

        <CodeEditorComponent code={code} setCode={setCode} />
      </div>

      <div
        className={`flex gap-2 flex-wrap ${
          showDetail || showHints ? "mb-10" : ""
        }`}
      >
        <Button onClick={handleRun} bgColor="bg-red-500" text="Запустити" />

        {task.detailedDescription && (
          <Button
            onClick={() => setShowDetail(!showDetail)}
            text={
              showDetail ? "Сховати детальний опис" : "Показати детальний опис"
            }
          />
        )}

        <Button
          onClick={() => setShowHints(!showHints)}
          text={showHints ? "Сховати підказки" : "Показати підказки"}
        />

        {onNext && <Button onClick={handleNext} text="Наступна задача" />}
      </div>

      <div className="grid md:flex justify-between gap-[20px]">
        <AnimatePresence>
          {showDetail && (
            <motion.p
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              className="bg-[#1e1e1e] border rounded-[20px] text-gray-100 whitespace-pre-wrap p-4 w-full"
            >
              {task.detailedDescription}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHints && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              className="bg-[#1e1e1e] border rounded-[20px] text-gray-100 whitespace-pre-wrap p-4 w-full"
            >
              {task.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
