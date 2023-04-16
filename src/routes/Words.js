import React, { useEffect, useState, useContext } from "react";
import Form from "../components/Form";
import ListItem from "../components/ListItem";
import Pagination from "../components/Pagination";
import Top from "../components/Top";
import { GlobalContext } from "../components/Context";

export default function Words() {
  const { handleGetWords, data } = useContext(GlobalContext);

  // Pagination, 200 words per page
  const [page, setPage] = useState(1);
  const limit = 200;
  const offset = (page - 1) * limit;

  useEffect(() => {
    document.title = `Byul's Wordsbook`;
    handleGetWords();
  });

  return (
    <main className="p-5">
      <Form />

      <Top />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {data &&
          data.slice(offset, offset + limit).map((item, index) => (
            <div key={index}>
              <ListItem item={item} />
            </div>
          ))}
      </div>
      <Pagination total={data && data.length} limit={limit} page={page} setPage={setPage} />
    </main>
  );
}
