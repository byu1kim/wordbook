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
  }, []);

  return (
    <main>
      <Form />

      <Top />
      <div className="list">
        {data &&
          data.slice(offset, offset + limit).map((item) => (
            <div key={item.id} className="item-container">
              <ListItem item={item} />
            </div>
          ))}
      </div>
      <Pagination total={data && data.length} limit={limit} page={page} setPage={setPage} />
    </main>
  );
}
