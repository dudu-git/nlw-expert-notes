import { ChangeEvent, useId, useState } from "react";
import logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/NewNoteCard";
import { NoteCard, noteType } from "./components/NoteCard";

// const noteIni:noteType = {
//   date: new Date(),
//   content:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veritatis a iure sed, debitis ipsam aspernatur suscipit, deserunt eius doloribus adipisci autem quo dolorem, obcaecati culpa ut minus qui distinctio?",
// };

export function App() {
  const [filter, setfilter] = useState<string>("");
  const [notes, setNoteCard] = useState<noteType[]>(() => {
    const notesStore = localStorage.getItem("notes");
    return notesStore ? JSON.parse(notesStore) : [];
  });

  const onAddNote = (content: string) => {
    const newNote: noteType = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    };

    const notesArry = [newNote, ...notes];
    setNoteCard(notesArry);
    localStorage.setItem("notes", JSON.stringify(notesArry));
  };

  const onDeletedNode = (id: string) => {
    const notesArry = notes.filter((note) => note.id !== id);
    setNoteCard(notesArry);
    localStorage.setItem("notes", JSON.stringify(notesArry));
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setfilter(query);
  };

  const filteredNotes =
    filter !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="Expert notes" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none "
          onChange={handleFilter}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onAddNote={onAddNote} />
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDeletedNode={onDeletedNode} />
        ))}
      </div>
    </div>
  );
}
