import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="fixed w-full h-full bg-rose-300 text-white top-0 center gap-3">
      <div className="text-5xl font-bold">Wordbook</div>
      <div>Create your own vocabulary list</div>
      <button className="bg-white text-rose-300 mt-10 px-10 py-2 rounded font-bold">
        <Link to="/words">Get Started!</Link>
      </button>
    </main>
  );
}
