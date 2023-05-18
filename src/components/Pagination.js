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
    <div className="mt-5 flex gap-2 justify-between">
      <div className="text-sm hidden sm:flex">
        <span className="mr-2">Display</span>
        <select onChange={changePageSize} className="border px-2 py-1" defaultValue="100">
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
        </select>
      </div>

      <div className="flex gap-3 w-full justify-center sm:w-fit">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="disabled:text-gray-300 text-rose-300 hover:text-rose-500 border rounded px-1"
        >
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="disabled:text-gray-300 text-rose-300 hover:text-rose-500 border rounded px-2"
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className="mx-3 w-full text-center sm:w-fit">
          <span className="font-bold">{page}</span> of {totalPages}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="disabled:text-gray-300 text-rose-300 hover:text-rose-500 border rounded px-2"
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="disabled:text-gray-300 text-rose-300 hover:text-rose-500 border rounded px-1"
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
}
