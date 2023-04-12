import { useState } from "react";
import axios from "axios";

const ListItem = ({ item, handleData, handleDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [eng, setEng] = useState(item.eng);
  const [kor, setKor] = useState(item.kor);

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = {
      id: item.id,
      eng: eng.trim(),
      kor: kor.trim(),
    };
    const result = await axios.post(`/api/words/edit/${item.id}`, data, {
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    handleData(result.data);
    setIsEdit(false);
  };

  const toggleWhite = (e) => {
    const element = e.target;
    element.classList.toggle("white");
  };

  return (
    <div className="list-item" key={item.id}>
      {!isEdit ? (
        <div className="words">
          <div className="eng" onClick={toggleWhite}>
            {item.eng}
          </div>
          <div className="kor" onClick={toggleWhite}>
            {item.kor}
          </div>
        </div>
      ) : (
        <form onSubmit={handleEdit} className="words">
          <input
            className="eng"
            type="text"
            value={eng}
            onChange={(e) => {
              setEng(e.target.value);
            }}
          ></input>
          <input
            className="kor"
            type="text"
            value={kor}
            onChange={(e) => {
              setKor(e.target.value);
            }}
          ></input>
          <button>
            <i class="fa-solid fa-check"></i>
          </button>
        </form>
      )}
      <div className="btns">
        <button>
          <a
            href={`https://en.dict.naver.com/#/search?range=all&query=${item.eng}`}
          >
            Dic
          </a>
        </button>
        <button onClick={() => setIsEdit(true)}>Edit</button>
        <button onClick={() => handleDelete(item.id)}>Del</button>
      </div>
    </div>
  );
};

ListItem.defaultProps = {
  item: [],
  handleData: [],
  handleDelete: 0,
};

export default ListItem;
