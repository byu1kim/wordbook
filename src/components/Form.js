import { useState, useContext } from "react";
import { GlobalContext } from "../components/Context";

export default function Form() {
  const { addWord, error, setError } = useContext(GlobalContext);
  const [eng, setEng] = useState("");
  const [kor, setKor] = useState("");

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
    <div className="form">
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="English"
          value={eng}
          onChange={(e) => {
            setError(false);
            setEng(e.target.value);
          }}
          required
        />
        <input type="text" placeholder="Korean" value={kor} onChange={(e) => setKor(e.target.value)} required />
        <button>Register</button>
      </form>
      <div className="error-msg">{error ? `${error}` : " "}</div>
    </div>
  );
}
