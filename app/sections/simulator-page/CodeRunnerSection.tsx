"use client";

import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type LogType = "log" | "warn" | "error";

type Log = {
  type: LogType;
  message: string;
};

export default function CodeRunnerSection() {
  const [code, setCode] = useLocalStorage<string>(
    "code",
    "// Напиши свій код тут"
  );
  const [logs, setLogs] = useLocalStorage<Log[]>("logs", []);

  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const runCode = () => {
    setLogs([]);

    const logHandler =
      (type: LogType) =>
      (...args: unknown[]) => {
        const message = args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
          )
          .join(" ");
        setLogs((prev) => [...prev, { type, message }]);
      };

    console.log = logHandler("log");
    console.warn = logHandler("warn");
    console.error = logHandler("error");

    try {
      const jsCode = code;

      if (!jsCode.trim())
        throw new Error("Код порожній або не вдалося скомпілювати");

      eval(jsCode);
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object"
          ? JSON.stringify(err, null, 2)
          : String(err);
      setLogs((prev) => [...prev, { type: "error", message: errMessage }]);
    }
  };

  const clearConsole = () => setLogs([]);
  const resetCode = () => setCode("// Напиши свій код тут");

  const buttonClass =
    "border border-[#3b3b3b] px-[12px] py-[6px] border-b-0 cursor-pointer";

  const buttonData: { text: string; func: () => void }[] = [
    { text: "Run", func: runCode },
    { text: "Clear Console", func: clearConsole },
    { text: "Reset", func: resetCode },
  ];

  return (
    <>
      <div className="container h-[400px] mb-[20px]">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      <div className="container flex gap-2 mb-2">
        {buttonData.map((item, idx) => (
          <button key={idx} className={buttonClass} onClick={item.func}>
            {item.text}
          </button>
        ))}
      </div>

      <div className="border-t border-t-[#3b3b3b] mb-2" />

      <div
        ref={consoleRef}
        className="container text-white h-60 overflow-y-scroll font-mono mt-[12px] w-full"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {logs.length === 0 ? (
          <div className="text-gray-500">Консоль пуста</div>
        ) : (
          logs.map((log, idx) => (
            <div
              key={idx}
              className={
                log.type === "warn"
                  ? "text-yellow-400"
                  : log.type === "error"
                  ? "text-red-500"
                  : "text-white"
              }
            >
              {log.message}
            </div>
          ))
        )}
      </div>
    </>
  );
}
