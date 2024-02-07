import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

type Props = {
  note: {
    date: Date;
    content: string;
  };
};
export const NoteCard = ({ note }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className=" flex flex-col rounded-md text-left bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          {note.date?.toISOString()}
        </span>
        <p className="text-sm  leading-6 text-slate-400 ">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0 pointer-events-none  " />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 px-1.5 py-1 text-slate-400 text-xs rounded-bl-md hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                {formatDistanceToNow(note.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
              <p className="text-sm  leading-6 text-slate-400 ">
                {note.content}
              </p>
            </div>
            <button
              type="button"
              className=" w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
            >
              Deseja{" "}
              <span className="text-red-400 group-hover:underline">
                Apagar essa nota
              </span>
              ?
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
