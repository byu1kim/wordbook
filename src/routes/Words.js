import React, { useEffect, useContext } from "react";
import Form from "../components/Form";
import Word from "../components/Word";
import Pagination from "../components/Pagination";
import Top from "../components/Top";
import { GlobalContext } from "../components/Context";

export default function Words() {
  const { data } = useContext(GlobalContext);

  useEffect(() => {
    document.title = `Byul's Wordsbook`;
  }, []);

  return (
    <main className="p-5">
      <Form />
      <Top />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data
          ? data.result.map((word, index) => (
              <div key={index}>
                <Word item={word} />
              </div>
            ))
          : "Loading"}
      </div>
      <Pagination />
    </main>
  );
}
