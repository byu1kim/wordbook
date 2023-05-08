import { useContext } from "react";
import { GlobalContext } from "./Context";

export default function Pagination() {
  const { page, setPage, pageSize, setPageSize, total } = useContext(GlobalContext);

  const totalPages = Math.ceil(total / pageSize);

  console.log("TotAL : ", total);
  console.log("PAGEs: ", totalPages);

  const changePageSize = (e) => {
    console.log("changeSize:", e.target.value);
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
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
