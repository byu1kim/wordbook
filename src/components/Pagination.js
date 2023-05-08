import { useContext } from "react";
import { GlobalContext } from "./Context";

export default function Pagination() {
  const { page, setPage, pageSize, setPageSize, total } = useContext(GlobalContext);

  const totalPages = Math.ceil(total / pageSize);

  const changePageSize = (e) => {
    setPageSize(e.target.value);
  };

  // need to add total pages
  return (
    <div className="flex gap-2 justify-between">
      <button onClick={() => setPage(1)} disabled={page === 1}>
        START
      </button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      {page} of {totalPages}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next
      </button>
      <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
        BEGIN
      </button>
      <select onChange={changePageSize} className="borders">
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="150">150</option>
        <option value="200">200</option>
      </select>
    </div>
  );
}
