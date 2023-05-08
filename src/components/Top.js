import { useState, useContext } from "react";
import { GlobalContext } from "../components/Context";
import Search from "./Search";

const Top = () => {
  const { data } = useContext(GlobalContext);
  const [hideEng, setHideEng] = useState(false);
  const [hideKor, setHideKor] = useState(false);

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

  return (
    <>
      <div className="top">
        <Search />
        <div className="toggle-btn">
          {!hideEng ? (
            <div className="hide" onClick={() => showHide("eng")}>
              Hide English
            </div>
          ) : (
            <div className="show" onClick={() => showHide("eng")}>
              Show English
            </div>
          )}
          {!hideKor ? (
            <div className="hide" onClick={() => showHide("kor")}>
              Hide Korean
            </div>
          ) : (
            <div className="show" onClick={() => showHide("kor")}>
              Show Korean
            </div>
          )}
        </div>

        <div className="data">Total : {data && data.length}</div>
      </div>
    </>
  );
};

export default Top;
