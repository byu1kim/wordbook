import { useState } from "react";
import axios from "axios";

const Form = ({ handleData }) => {
  const [eng, setEng] = useState("");
  const [kor, setKor] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    const data = {
      eng: eng.trim(),
      kor: kor.trim(),
    };
    const result = await axios.post("/api/words", data, {
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    if (!result.data) {
      setError(true);
    } else {
      handleData(result.data);
      setEng("");
      setKor("");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleAdd}>
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
        <input
          type="text"
          placeholder="Korean"
          value={kor}
          onChange={(e) => setKor(e.target.value)}
          required
        />
        <button>Register</button>
      </form>
      <div className="error-msg">
        {error ? `* ${eng} is already registered` : " "}
      </div>
    </div>
  );
};

Form.defaultProps = {
  handleData: [],
};

export default Form;
