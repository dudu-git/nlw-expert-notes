import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type Props = {
  onAddNote: (content: string) => void;
};

let speechRecognition: SpeechRecognition | null = null;

export const NewNoteCard = ({ onAddNote }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showOnBord, setShowOnBord] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShowOnBord(false);
  }
  function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") setShowOnBord(true);
  }

  function handleSalveNote(event: FormEvent) {
    event.preventDefault();
    if (content === "") return;
    onAddNote(content);
    setContent("");
    setShowOnBord(true);

    toast.success("Nota criada com sucesso.");
  }

  function handleStartRecord() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!isSpeechRecognitionAPIAvailable) {
      toast.error("Infelizmente seu navegador não suporta a API de gravação");
      return;
    }

    setIsRecording(true);
    setShowOnBord(false);
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.lang = "pt-BR";
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");
      setContent(transcription);
      // console.log(event.results);
    };
    speechRecognition.onerror = (event) => {
      console.log(event);
    };

    speechRecognition.start();
  }
  function handleStopRecord() {
    setIsRecording(false);    
    if (content === "") setShowOnBord(true);
    speechRecognition?.stop();
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
          <Dialog.Content className="fixed md:left-1/2 inset-0 md:inset-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 px-1.5 py-1 text-slate-400 text-xs rounded-bl-md hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-200">
                  Adicionar nota
                </span>
                {showOnBord ? (
                  <p className="text-sm  leading-6 text-slate-400 ">
                    {"Comece "}
                    <button
                      onClick={handleStartRecord}
                      type="button"
                      className="font-medium text-lime-400 hover:underline"
                    >
                      gravando uma nota
                    </button>
                    {" em áudio ou se prefirir "}
                    <button
                      type="button"
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
              {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecord}
                  className=" w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-350 outline-none font-medium hover:text-slate-100"
                >
                  <div className="size-3 rounded-full bg-red-700 animate-pulse" />
                  Gravando! (clique para interronper)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSalveNote}
                  className=" w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                >
                  Salvar nota
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
