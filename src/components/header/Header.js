import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../assets/valmaras-logo.png"

import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";

import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { selectCartTotalQuantity } from "../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
        <img src={logoImg} alt="Valmaras" style={{ width: "150px"}} />
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const cartQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  // Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("User signed out...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className={styles.fixed}>
      <div className={styles.header}>
        <span className={styles.logoHeader}>{logo}</span>

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <AdminOnlyLink>
              <li>
                <Link to="/admin/home">
                  <button className="--btn --btn-danger">Admin</button>
                </Link>
              </li>
            </AdminOnlyLink>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/collection" className={activeLink}>
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <Link to="/profile" className={styles.usericon}>
                  <FaUserCircle size={16} />
                  <span>Hi, {displayName}</span>
                </Link>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Order
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink
                  href="#home"
                  className={styles.logout}
                  onClick={handleLogout}
                >
                  Sign out
                </NavLink>
              </ShowOnLogin>
            </span>

            <span className={styles.cart}>
              <Link to="/cart">
                <FaShoppingCart size={20} />
                <p>{cartQuantity}</p>
              </Link>
            </span>
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
