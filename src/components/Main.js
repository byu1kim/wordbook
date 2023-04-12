import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import Top from "./Top";

const Main = () => {
  const [data, setData] = useState([]);

  // Pagination, 200 words per page
  const [page, setPage] = useState(1);
  const limit = 200;
  const offset = (page - 1) * limit;

  useEffect(() => {
    document.title = `Byul's Wordsbook`;
    axios
      .get("/api/words")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddedData = (newData) => {
    setData([newData, ...data]);
  };

  const handleEditedData = (newData) => {
    setData(newData);
  };

  const handleDelete = async (id) => {
    const result = await axios.post(`/api/words/delete/${id}`);
    setData(result.data);
  };

  return (
    <main>
      <Form handleData={handleAddedData} />
      <Top data={data.length} />

      <div className="list">
        {data &&
          data.slice(offset, offset + limit).map((item) => (
            <div key={item.id} className="item-container">
              <ListItem
                item={item}
                handleData={handleEditedData}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </div>
      <Pagination
        total={data.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </main>
  );
};

export default Main;
