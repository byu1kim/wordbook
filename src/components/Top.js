import { useState, useContext } from "react";
import { GlobalContext } from "../components/Context";
import Search from "./Search";

const Top = () => {
  const { data, isKnown, setIsKnown, setPage, sort, setSort } = useContext(GlobalContext);
  const [hideEng, setHideEng] = useState(false);
  const [hideKor, setHideKor] = useState(false);

  const options = ["Unknown", "Known"];
  const sorts = ["sort", "latest", "oldest", "a-z", "z-a"];

  const showHide = (lan) => {
    const english = document.getElementsByClassName("eng");
    const korean = document.getElementsByClassName("kor");

    if (lan === "eng") {
      for (let i = 0; i < english.length; i++) {
        english[i].classList.toggle("white");
        setHideEng(!hideEng);
      }
    } else if (lan === "kor") {
      for (let i = 0; i < korean.length; i++) {
        korean[i].classList.toggle("white");
        setHideKor(!hideKor);
      }
    }
  };

  const handleChange = (e) => {
    setPage(1);
    if (e.target.value === "Unknown") {
      setIsKnown("Unknown");
    } else {
      setIsKnown("Known");
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap text-sm justify-between gap-3 items-center mt-1 mb-2 sm:flex-nowrap">
        <div className="w-full sm:w-fit">
          <Search />
        </div>
        <div className="flex gap-3 text-gray-500 sm:w-full">
          <select className="border px-1" value={isKnown} onChange={handleChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select className="border px-1" value={sort} onChange={handleSort}>
            {sorts.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {!hideEng ? (
            <div className="border p-1 hover:cursor-pointer" onClick={() => showHide("eng")}>
              Hide English
            </div>
          ) : (
            <div className="border p-1 bg-rose-300 text-white hover:cursor-pointer" onClick={() => showHide("eng")}>
              Show English
            </div>
          )}
          {!hideKor ? (
            <div className="border p-1 hover:cursor-pointer" onClick={() => showHide("kor")}>
              Hide Meaning
            </div>
          ) : (
            <div className="border p-1 bg-rose-300 text-white hover:cursor-pointer" onClick={() => showHide("kor")}>
              Show Meaning
            </div>
          )}
        </div>

        <div className="data sm:w-full sm:text-right">Total : {data && data.length}</div>
      </div>
    </>
  );
};

export default Top;
