import { useState, useContext } from "react";
import { GlobalContext } from "../components/Context";

export default function Form() {
  const { addWord, error, setError } = useContext(GlobalContext);
  const [eng, setEng] = useState("");
  const [kor, setKor] = useState("");

  // add > edit > delete

  const handleForm = async (e) => {
    e.preventDefault();

    const data = {
      eng: eng.trim(),
      kor: kor.trim(),
    };

    addWord(data);

    setEng("");
    setKor("");
  };

  return (
    <div className=" ">
      <form onSubmit={handleForm} className="bg-gray-200 p-2 flex gap-2 ">
        <input
          type="text"
          placeholder="English"
          value={eng}
          onChange={(e) => {
            setError(false);
            setEng(e.target.value);
          }}
          className="w-full p-2 border-2 active:border-rose-300 active:outline-none focus:border-rose-300 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Meaning"
          value={kor}
          onChange={(e) => setKor(e.target.value)}
          className="w-full p-2 border-2 active:border-rose-300 active:outline-none focus:border-rose-300 focus:outline-none"
          required
        />
        <button className="bg-rose-300 px-3 text-white font-bold hover:bg-rose-400 dark:bg-blue-300">Register</button>
      </form>
      <div className="error-msg">{error ? `${error}` : " "}</div>
    </div>
  );
}
