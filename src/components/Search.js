import { useState, useContext } from "react";
import { GlobalContext } from "./Context";

export default function Search() {
  const { searchWord } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  return (
    <form
      className="border flex p-1"
      onSubmit={(e) => {
        e.preventDefault();
        searchWord(query);
      }}
    >
      <input
        className="p-1 border border-none active:border-none active:outline-none focus:border-none focus:outline-none"
        placeholder="Search word.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
