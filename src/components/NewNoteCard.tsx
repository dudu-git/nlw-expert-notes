import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export const NewNoteCard = () => {
  const [showOnBord, setShowOnBord] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShowOnBord(false);
  }
  function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") setShowOnBord(true);
  }

  function handleSalveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(content);
    setShowOnBord(true);

    toast.success("Nota criada com sucesso.");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md  bg-slate-700  p-5 flex flex-col gap-3 text-left outline-none  hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm  leading-6 text-slate-400 ">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 px-1.5 py-1 text-slate-400 text-xs rounded-bl-md hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form onSubmit={handleSalveNote} className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-200">
                  Adicionar nota
                </span>
                {showOnBord ? (
                  <p className="text-sm  leading-6 text-slate-400 ">
                    {"Comece "}
                    <button className="font-medium text-lime-400 hover:underline">
                      gravando uma nota
                    </button>
                    {" em áudio ou se prefirir "}
                    <button
                      onClick={handleStartEditor}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      utilize apenas texto.
                    </button>
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    value={content}
                    onChange={handleChangeText}
                  />
                )}
              </div>
              <button
                type="submit"
                className=" w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
