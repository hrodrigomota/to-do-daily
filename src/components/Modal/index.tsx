import { ChangeEventHandler } from "react";
import { IconX } from "@tabler/icons-react";

interface ModalProps {
  id: string;
  isOpen: boolean;
  closeModal: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  saveChangeModal: () => void;
  theme: boolean;
}

export function Modal({
  id,
  isOpen,
  closeModal,
  saveChangeModal,
  onChange,
  value,
  theme,
}: ModalProps) {
  if (isOpen) {
    return (
      <div className="bg-black bg-opacity-50 z-10 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center">
        <div
          className={`flex flex-col rounded-lg p-4 w-[95%] sm:w-2/5 ${
            theme ? "bg-zinc-900" : "bg-white"
          }`}
        >
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="font-bold text-purple-600 border border-transparent hover:border-purple-600 rounded-lg p-1 leading-none"
            >
              <IconX strokeWidth={1} />
            </button>
          </div>
          <div className={`mb-8 ${theme ? "text-white" : "text-inherit"}`}>
            <h2 className="font-bold text-xl mb-2">Editar Atividade</h2>
            <p className="text-sm opacity-60">
              Altere a descrição da sua atividade e clique em confirmar para
              salvar.
            </p>
          </div>
          <div
            className={`flex items-center gap-2 mb-8 ${
              theme ? "text-white" : "text-inherit"
            }`}
          >
            <label htmlFor="editedActivity">Atividade: </label>
            <input
              onChange={onChange}
              value={value}
              className={`w-full border focus:border-purple-600 rounded-lg px-3 py-2 outline-none ${
                theme ? "bg-zinc-900" : "bg-inherit"
              }`}
              type="text"
              id="editedActivity"
              placeholder="ex.: Estudar React"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={saveChangeModal}
              className="w-full sm:w-1/4 px-3 py-2 rounded-lg bg-purple-600 text-white hover:opacity-75 cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
