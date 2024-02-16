import React, { useEffect, useContext } from "react";
import Form from "../components/Form";
import Loader from "../components/Loader";
import Word from "../components/Word";
import Pagination from "../components/Pagination";
import Top from "../components/Top";
import { GlobalContext } from "../components/Context";

export default function Words() {
  const { data, loading } = useContext(GlobalContext);

  useEffect(() => {
    document.title = `Byul's Wordsbook`;
  }, []);

  return (
    <main className="p-5">
      <Form />
      <Top />

      {loading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {data &&
          data.result.map((word, index) => (
            <div key={index}>
              <Word item={word} />
            </div>
          ))}
      </div>
      <Pagination />
    </main>
  );
}
