import { IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

interface ActivityProps {
  id: string;
  description: string;
  theme: boolean;
  editActivity: (id: string) => void;
  removeActivity: (id: string) => void;
  value: boolean;
  toggleStatus: MouseEventHandler;
}

export function ActivityDescription(props: ActivityProps) {
  return (
    <div className="w-full mb-2 flex flex-col justify-between gap-2 sm:gap-5 sm:flex-row">
      <p 
        className={`w-full h-11 sm:w-5/6 flex justify-between items-center px-3 py-2 border rounded-lg cursor-pointer border-purple-600 hover:bg-purple-600 hover:text-white ${props.value == true ? 'line-through italic bg-purple-600 text-white' : 'text-purple-600'}`}
        onClick={props.toggleStatus}
      >
        {props.description}
        <IconCheck color="white" className={`${props.value == true ? "block" : "hidden"}`} />
      </p>
      <div className="w-full flex gap-2 justify-end sm:justify-between sm:w-28">
        <button
          onClick={() => props.editActivity(props.id)}
          className="px-3 py-2 border border-purple-600 rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white"
        >
          <IconPencil strokeWidth={1} />
        </button>
        <button
          onClick={() => props.removeActivity(props.id)}
          className="px-3 py-2 border border-purple-800 rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white"
        >
          <IconTrash strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
