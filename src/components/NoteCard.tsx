export const NoteCard = () => {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400">
      <span className="text-sm font-medium text-slate-200">Lorem ipsum</span>
      <p className="text-sm  leading-6 text-slate-400 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        veritatis a iure sed, debitis ipsam aspernatur suscipit, deserunt eius
        doloribus adipisci autem quo dolorem, obcaecati culpa ut minus qui
        distinctio?
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0 pointer-events-none  " />
    </button>
  );
};
