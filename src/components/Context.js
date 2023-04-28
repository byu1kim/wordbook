import { createContext, useState, useEffect } from "react";
import * as cognito from "../cognito";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState();

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
  const handleGetWords = async () => {
    try {
      const token = await cognito.getAccessToken();

      const result = await fetch("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((res) => res.json());

      setData(result);
    } catch (err) {
      setError(err);
    }
  };

  // Post word to DB
  const addWord = async (newData) => {
    try {
      // Get token
      const token = await cognito.getAccessToken();

      // Save to DB
      const result = await fetch("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((res) => res.json());

      // Set Data if successfully saved or set the error message
      if (result.rowCount) {
        setData([newData, ...data]);
      } else {
        setError(result.detail);
      }
    } catch (err) {
      setError(err);
    }
  };

  // PUT : Edit word
  const editWord = async (newData) => {
    try {
      // Get token
      const token = await cognito.getAccessToken();

      // Save to DB
      const result = await fetch("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word", {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((res) => res.json());

      // Error handle
      if (result.name === "error") {
        setError(result.detail);
      } else {
        setData(result);
      }
    } catch (err) {
      setError(err);
    }
  };

  // DELETE : Delete word
  const deleteWord = async (id) => {
    const token = await cognito.getAccessToken();

    const result = await fetch("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/word", {
      method: "DELETE",
      body: JSON.stringify({ wordId: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());

    setData(result);
  };

  // Search
  const searchWord = async (query) => {
    console.log("Search Function: ", query);
  };

  // Get user profile
  async function getUser() {
    const loginUser = await cognito.getCurrentUser();
    setUser(loginUser);
  }

  useEffect(() => {
    getUser();
  }, [darkMode]);
  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        clickDarkMode,
        addWord,
        handleGetWords,
        data,
        error,
        setError,
        editWord,
        deleteWord,
        searchWord,
        user,
        setUser,
        getUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
