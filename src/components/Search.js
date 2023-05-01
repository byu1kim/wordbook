import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./Context";

export default function Search() {
  const { data, setFilteredList } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFilteredList(data);
    const filtered = data && data.filter((item) => item.eng.toLowerCase().includes(query.toLowerCase()));
    setFilteredList(filtered);
  }, [query, data]);

  return (
    <form className="border flex p-1">
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
