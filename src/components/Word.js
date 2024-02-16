import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./Context";

export default function Word({ item }) {
  const { editWord, deleteWord } = useContext(GlobalContext);

  const [isEdit, setIsEdit] = useState(false);
  const [eng, setEng] = useState(item.eng);
  const [kor, setKor] = useState(item.kor);
  const [ex, setEx] = useState("");
  const [check, setCheck] = useState(item.checked);

  useEffect(() => {
    setEng(item.eng);
    setKor(item.kor);
    setEx(item.example);
    setCheck(item.checked);
  }, [item]);

  const handleEdit = async (e, checked = check) => {
    e.preventDefault();

    console.log("1 2 3", eng, kor, ex);
    const data = {
      checked: checked,
      wordId: item.id,
      eng: eng.trim(),
      kor: kor.trim(),
      ex: ex != null ? ex.trim() : "",
    };

    setEng(eng);
    setKor(kor);
    setIsEdit(false);

    await editWord(data);
  };

  const toggleWhite = (e) => {
    const element = e.target;
    element.classList.toggle("white");
  };

  const handleCheck = (e) => {
    setCheck(!check);
    handleEdit(e, !check);
  };

  return (
    <div className="border-b">
      <div className="flex px-1 py-2 text-sm">
        {!isEdit ? (
          <>
            <div className="flex w-full">
              {/* Check */}
              <button className="self-center w-10 h-6 mr-3" onClick={handleCheck}>
                {check ? (
                  <i className="fa-solid fa-check text-xs text-rose-300"></i>
                ) : (
                  <i className="fa-solid fa-check text-xs text-gray-200"></i>
                )}
              </button>

              {/* Words */}
              <div className="words w-full">
                <div className="w-full">
                  <div className="eng w-full font-bold" onClick={toggleWhite}>
                    {eng}
                  </div>
                  <div className="kor w-full" onClick={toggleWhite}>
                    {kor}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{ex}</div>
              </div>
            </div>
          </>
        ) : (
          // Edit
          <form onSubmit={handleEdit} className="word w-full gap-2 mr-2">
            <input
              className="eng w-full font-bold border p-1"
              type="text"
              value={eng}
              onChange={(e) => setEng(e.target.value)}
            ></input>
            <input
              className="kor w-full border p-1"
              type="text"
              value={kor}
              onChange={(e) => setKor(e.target.value)}
            ></input>
            <input
              className="kor w-full border p-1"
              type="text"
              value={ex}
              onChange={(e) => setEx(e.target.value)}
            ></input>
            <button className="bg-rose-300 text-white hover:bg-rose-400 px-2">
              <i className="fa-solid fa-check"></i>
            </button>
          </form>
        )}
        {/* Buttons */}
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
    </div>
  );
}

Word.defaultProps = {
  item: [],
};
