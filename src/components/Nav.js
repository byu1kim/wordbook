import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../components/Context";

import * as cognito from "../cognito";

export default function Nav() {
  const { user } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState();

  const navigate = useNavigate();

  async function handleLogout() {
    console.log("CLick!");
    navigate("/");
    cognito.signOut();
  }

  const showHideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative text-rose-300">
      <nav className="px-5 py-3 flex justify-between">
        <div className="text-2xl">Wordbook</div>
        <button onClick={showHideNav}>
          <i className="fa-solid fa-bars"></i>
        </button>
        {isOpen ? (
          <ul className="gap-3 p-3 borders fixed w-1/2 h-full bg-rose-300 top-0 right-0 text-white">
            <button onClick={showHideNav} className="fixed right-0">
              Close
            </button>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/words">Words</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={handleLogout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}
