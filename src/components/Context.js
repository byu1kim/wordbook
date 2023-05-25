import axios from "axios";
import { createContext, useState, useEffect } from "react";
import * as cognito from "../cognito";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [sort, setSort] = useState("sort");
  const [isKnown, setIsKnown] = useState("Unknown");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(1);

  const api = "https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word";

  // Update whenever dependency array item changes
  useEffect(() => {
    getUser();
  }, [darkMode, page, searchTerm, pageSize, isKnown, sort]);

  // Get user profile
  async function getUser() {
    const loginUser = await cognito.getCurrentUser();
    setUser(loginUser);
    getWords();
  }

  // Handle Light/Dark Mode
  const clickDarkMode = (e) => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  // Get all words from DB
  const getWords = async () => {
    setLoading(true);
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
          isKnown: isKnown,
          sort: sort,
        },
      })
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch((e) => console.log("Error during getting data: ", e))
      .finally(() => {
        setLoading(false);
      });
  };

  // Add word to DB
  const addWord = async (newData) => {
    // Validate
    const duplicated = data && data.result.filter((item) => item.eng === newData.eng);
    if (duplicated.length > 0) {
      setError(`${newData.eng} is already registered`);
      return;
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
      .then((res) => {
        if (isKnown) {
          setIsKnown(false);
        } else {
          setData({ result: [res.data, ...data.result], length: parseInt(data.length) + 1 });
        }
      })
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
      .then(() => {})
      .catch((err) => setError(err));

    return result;
  };

  // DELETE : Delete word
  const deleteWord = async (id) => {
    setLoading(true);
    const token = await cognito.getAccessToken();

    const result = await fetch(api, {
      method: "DELETE",
      body: JSON.stringify({ wordId: id, page, pageSize, searchTerm, isKnown }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .finally(() => setLoading(false));

    setData(result);
    setTotal(result.length);
  };

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
        loading,
        setLoading,
        isKnown,
        setIsKnown,
        sort,
        setSort,

        page,
        setPage,
        pageSize,
        setPageSize,
        searchTerm,
        setSearchTerm,
        total,

        user,
        setUser,
        getUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
