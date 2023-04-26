import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../components/Context";

import * as cognito from "../cognito";

export default function Nav() {
  const { user, setUser } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState();

  const navigate = useNavigate();

  async function handleLogout() {
    console.log("CLick!");
    cognito.signOut();
    setUser();
    setIsOpen(false);
    navigate("/");
  }

  const showHideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative text-rose-300 z-20">
      <nav className="px-5 py-3 flex justify-between">
        <Link to="/" className="text-2xl logo">
          Wordbook
        </Link>
        <button onClick={showHideNav}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <ul className={`${isOpen ? "w-1/2" : "w-0 -mr-10"} p-3 fixed h-full bg-rose-300 top-0 right-0 text-white`}>
          {isOpen ? (
            <>
              <button onClick={showHideNav} className="fixed right-0 pr-5">
                <i className="fa-solid fa-x"></i>
              </button>
              {user && <li className="font-bold px-4 py-3">Hello, {user.username}!</li>}

              <li className="px-4 py-3 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                <Link to="/" className="block w-full">
                  <i className="fa-solid fa-house mr-2"></i>Home
                </Link>
              </li>
              {user ? (
                <>
                  <li className="px-4 py-3 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                    <Link to="/words" className="block w-full">
                      <i className="fa-solid fa-book-open mr-2"></i>Words
                    </Link>
                  </li>
                  <li className="px-4 py-3 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                    <Link to="/profile" className="block w-full">
                      <i className="fa-solid fa-user mr-2"></i>Profile
                    </Link>
                  </li>
                  <li onClick={handleLogout} className="px-4 py-3 hover:bg-white/20 hover:cursor-pointer">
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>Log out
                  </li>
                </>
              ) : (
                <>
                  <li className="px-4 py-3 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                    <Link to="/signup" className="block w-full">
                      <i className="fa-solid fa-user-plus mr-2"></i> Signup
                    </Link>
                  </li>
                  <li className="px-4 py-3 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                    <Link to="/login" className="block w-full">
                      <i className="fa-solid fa-right-to-bracket mr-2"></i>Login
                    </Link>
                  </li>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
}
