import React, { useState, useEffect } from "react";
import axios from "axios";
import * as cognito from "../cognito";
import Word from "../components/Word";
const PAGE_SIZE = 20;

function LazyLoading() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const [memo, setMemo] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const token = await cognito.getAccessToken();
      const result = await fetch(
        `https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word?page=${page}&pageSize=${PAGE_SIZE}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      ).then((res) => res.json());

      setData(result);
    }
    fetchData();
    console.log(data);
  }, [page]);

  return (
    <div>
      <button onClick={() => setMemo(!memo)}>Click here</button>
      {!!data && data.map((item) => <Word item={item} />)}

      <button onClick={() => setPage(page + 1)}>Next page</button>
      <button onClick={() => setPage(page - 1)}>Prev page</button>
      <h1>{page}</h1>
    </div>
  );
}

export default LazyLoading;
