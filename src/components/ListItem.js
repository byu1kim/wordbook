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
    <div className="flex border-b p-1 text-sm">
      {!isEdit ? (
        <div className="words w-full sm:flex">
          <div className="eng w-full font-bold" onClick={toggleWhite}>
            {item.eng}
          </div>
          <div className="kor w-full" onClick={toggleWhite}>
            {item.kor}
          </div>
        </div>
      ) : (
        <form onSubmit={handleEdit} className="word w-full gap-2 mr-2 sm:flex">
          <input
            className="eng w-full font-bold border p-1"
            type="text"
            value={eng}
            onChange={(e) => {
              setEng(e.target.value);
            }}
          ></input>
          <input
            className="kor w-full border p-1"
            type="text"
            value={kor}
            onChange={(e) => {
              setKor(e.target.value);
            }}
          ></input>
          <button className="bg-rose-300 text-white hover:bg-rose-400 px-2">
            <i className="fa-solid fa-check"></i>
          </button>
        </form>
      )}
      <div className="flex gap-3">
        <button className="btn text-rose-300">
          <a href={`https://en.dict.naver.com/#/search?range=all&query=${item.eng}`}>Dic</a>
        </button>
        <button className="btn text-gray-400" onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button className="btn text-gray-400" onClick={() => deleteWord(item.id)}>
          Del
        </button>
      </div>
    </div>
  );
};

ListItem.defaultProps = {
  item: [],
};

export default ListItem;
