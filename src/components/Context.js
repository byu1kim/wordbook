import axios from "axios";
import { createContext, useState, useEffect } from "react";
import * as cognito from "../cognito";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState();

  const api = "https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word";

  useEffect(() => {
    getUser();
    getWords();
  }, [darkMode, page, searchTerm, pageSize]);

  const clickDarkMode = (e) => {
    if (document.documentElement.classList.contains("dark")) {
      e.target.classList.add("rotate-180");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      e.target.classList.remove("rotate-180");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  // Get all words from DB
  const getWords = async () => {
    const token = await cognito.getAccessToken();

    await axios
      .get(api, {
        headers: {
          Authorization: token,
        },
        params: {
          page: page,
          pageSize: pageSize,
          searchTerm: searchTerm,
        },
      })
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch((e) => console.log("Error during getting data: ", e));
  };

  // Add word to DB
  const addWord = async (newData) => {
    // Validate
    const duplicated = data && data.filter((item) => item.eng === newData.eng);
    if (duplicated.length > 0) {
      setError(`${newData.eng} is already registered`);
    }

    // Add word to db
    const token = await cognito.getAccessToken();

    await axios
      .post(api, newData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => setData([res.data, ...data]))
      .catch((err) => setError(err));
  };

  // Edit word
  const editWord = async (newData) => {
    // Get token
    const token = await cognito.getAccessToken();

    // Save to DB
    const result = await axios
      .put(api, newData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => res.data)
      .catch((err) => setError(err));

    return result;
  };

  // DELETE : Delete word
  const deleteWord = async (id) => {
    const token = await cognito.getAccessToken();

    const result = await fetch(api, {
      method: "DELETE",
      body: JSON.stringify({ wordId: id, page, pageSize, searchTerm }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());

    console.log("REST:", result);
    setData(result);
  };

  // Get user profile
  async function getUser() {
    const loginUser = await cognito.getCurrentUser();
    setUser(loginUser);
  }

  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        clickDarkMode,

        getWords,
        addWord,
        editWord,
        deleteWord,

        data,
        setData,
        error,
        setError,

        page,
        setPage,
        pageSize,
        setPageSize,
        searchTerm,
        setSearchTerm,

        user,
        setUser,
        getUser,

        total,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
