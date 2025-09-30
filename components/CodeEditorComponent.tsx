"use client";

import Editor from "@monaco-editor/react";

interface Props {
  code: string;
  setCode: (value: string) => void;
}

export default function CodeEditorComponent({ code, setCode }: Props) {
  return (
    <div className="h-[400px] border rounded-[20px] overflow-hidden shadow-lg">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: "on",
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          roundedSelection: true,
        }}
      />
    </div>
  );
}
