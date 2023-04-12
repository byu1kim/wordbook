import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import ListItem from "../components/ListItem";
import Pagination from "../components/Pagination";
import Top from "../components/Top";

const Main = () => {
  const [data, setData] = useState([]);

  // Pagination, 200 words per page
  const [page, setPage] = useState(1);
  const limit = 200;
  const offset = (page - 1) * limit;

  useEffect(() => {
    document.title = `Byul's Wordsbook`;
    axios
      .get("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com")
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
    const result = await axios.delete(`https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com`);
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
              <ListItem item={item} handleData={handleEditedData} handleDelete={handleDelete} />
            </div>
          ))}
      </div>
      <Pagination total={data.length} limit={limit} page={page} setPage={setPage} />
    </main>
  );
};

export default Main;
