import { useContext } from "react";
import { GlobalContext } from "./Context";

export default function Search() {
  const { searchTerm, setSearchTerm } = useContext(GlobalContext);

  return (
    <form className="border flex p-1">
      <input
        className="p-1 border border-none active:border-none active:outline-none focus:border-none focus:outline-none"
        placeholder="Search by English..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
