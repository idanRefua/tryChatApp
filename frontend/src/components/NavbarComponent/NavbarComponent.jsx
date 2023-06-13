import { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { authUserActions } from "../../store/authUser";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import homeLogo from "../../images/koko chat.png";

import "./navbar.style.css";
export default function NavbarComponent() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logOut = () => {
    dispatch(authUserActions.logout());
    localStorage.clear();
  };
  return (
    <nav className="navbar navbar-expand-lg  ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/">
                <img src={homeLogo} alt="home logo" className="home-logo " />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/aboutus"
              >
                About Us
              </NavLink>
            </li>
            <div className="">
              <li className="nav-item dropdown person-menu">
                <Link
                  className="nav-link active dropdown-toggle my-profile"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={""}
                >
                  Products
                </Link>
                <ul
                  className="dropdown-menu drop-down-links"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/food"
                      activeclassname="activeLink"
                    >
                      Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/equip"
                      activeclassname="activeLink"
                    >
                      Equip
                    </NavLink>
                  </li>
                </ul>
              </li>
            </div>
            {!loggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-expanded="false"
                  to={"/login"}
                >
                  Login
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="icon-msg"
                  />
                </NavLink>
              </li>
            )}

            {loggedIn && (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-expanded="false"
                    to={"/chat"}
                  >
                    Chat
                    <FontAwesomeIcon icon={faMessage} className="icon-msg" />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-expanded="false"
                    onClick={logOut}
                    to={"/login"}
                  >
                    Log-Out
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="icon-msg"
                    />
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
