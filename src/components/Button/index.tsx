import { MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  onClick: MouseEventHandler;
  theme: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`w-full sm:w-28 border border-zinc-200 px-3 py-2 rounded-lg sm:hover:border-none text-zinc-400 active:bg-purple-600 active:text-white sm:hover:bg-purple-600 sm:hover:text-white cursor-pointer ${props.theme ? "bg-zinc-900 " : ""}`}
    >
      {props.title}
    </button>
  );
}
