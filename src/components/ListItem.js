import { useState, useContext } from "react";
import { GlobalContext } from "../components/Context";

const ListItem = ({ item }) => {
  const { editWord, deleteWord } = useContext(GlobalContext);
  const [isEdit, setIsEdit] = useState(false);
  const [eng, setEng] = useState(item.eng);
  const [kor, setKor] = useState(item.kor);

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = {
      wordId: item.id,
      eng: eng.trim(),
      kor: kor.trim(),
    };

    editWord(data);
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
            <i className="fa-solid fa-check"></i>
          </button>
        </form>
      )}
      <div className="btns">
        <button>
          <a href={`https://en.dict.naver.com/#/search?range=all&query=${item.eng}`}>Dic</a>
        </button>
        <button onClick={() => setIsEdit(true)}>Edit</button>
        <button onClick={() => deleteWord(item.id)}>Del</button>
      </div>
    </div>
  );
};

ListItem.defaultProps = {
  item: [],
};

export default ListItem;
