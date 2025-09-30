"use client";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  bgColor?: string;
}

export default function TaskButton({ onClick, children, bgColor }: Props) {
  return (
    <button
      onClick={onClick}
      className={`border-[1px] border-white/20 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-[20px] font-semibold transition duration-200 ${
        bgColor ? bgColor : "bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
