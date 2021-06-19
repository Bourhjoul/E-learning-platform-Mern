import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import { Input, Popover, Drawer, Badge, Button, Dropdown } from "antd";
import {
  CgShoppingCart,
  AiOutlineSearch,
  AiOutlineClose,
  RiArrowDropDownLine,
} from "react-icons/all";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../useWindowDimensions";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useSelector, useDispatch } from "react-redux";
const Navbar = ({ match, history }) => {
  const { height, width } = useWindowDimensions();
  const [showsearch, setshowsearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showicons, setshowicons] = useState(false);
  const { Search } = Input;
  const auth = useSelector((state) => state.auth);
  const { user, isLogged, loading } = auth;

  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;

  const handleSearch = () => {
    if (keyword) {
      history.push(`/search/${keyword}`);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
  const contentProfile = (
    <div className="Profilepobover">
      <Link to="/profile">Profile</Link> <br />
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
      <br />
    </div>
  );
  const contentProfilephone = (
    <div className="Profilepobover phonedropdown">
      <Link to="/profile">Profile</Link> <br />
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
  const userLink = () => {
    return (
      <Popover content={contentProfile} style={{ cursor: "pointer" }}>
        <Link to="/" className="avatar">
          <div className="dropdownic">
            {loading ? (
              <div className="loadingNav">
                <PropagateLoader color={"#1B78CA"} loading={loading} size={3} />
              </div>
            ) : (
              <>
                {" "}
                <img src={user.avatar} className="profile_pic" />
                {user.name} <RiArrowDropDownLine size="24" />
              </>
            )}
          </div>
        </Link>
      </Popover>
    );
  };
  const userLinkDrawer = () => {
    return (
      <Dropdown overlay={contentProfilephone} trigger={["click"]}>
        <div className="dropdownic" style={{ margin: "20px 0px" }}>
          <img src={user.avatar} className="profile_pic" alt="profilpic" />{" "}
          {user.name}
          <RiArrowDropDownLine size="24" />
        </div>
      </Dropdown>
    );
  };

  const [visbile, setvisbile] = useState(false);
  const showDrawer = () => {
    setvisbile(true);
  };

  const onClose = () => {
    setvisbile(false);
  };

  const content = (
    <div className="Categoriespobover">
      <Link to="/coursesfilter/development">Development</Link> <br />
      <Link to="/coursesfilter/marketing">Marketing</Link>
      <br />
      <Link to="/coursesfilter/design">Design</Link>
      <br />
      <Link to="/coursesfilter/education">Education</Link>
      <br />
      <Link to="/coursesfilter/photography">Photography</Link>
      <br />
      <Link to="/coursesfilter/music">Music</Link>
      <br />
      <Link to="/coursesfilter/Self-Dev">Self Devlopement</Link>
      <br />
      <Link to="/coursesfilter/business">Business</Link>
      <br />
    </div>
  );
  useEffect(() => {
    if (width < 788) {
      setshowicons(true);
    } else {
      setvisbile(false);
      setshowicons(false);
    }
    return () => {};
  }, [width]);
  const Activateburger = () => {
    showDrawer();
  };
  return (
    <>
      <nav className="navbar">
        <div className="burger" onClick={Activateburger}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="logo">
          <Link to="/">
            <img
              src="https://i.imgur.com/4jq68uE.png"
              alt="Logo"
              className="logo_header"
            />
          </Link>
        </div>
        {showicons && (
          <div className="Phoneonright">
            {showsearch ? (
              <AiOutlineClose
                size="24"
                color="#1890ff"
                onClick={() => setshowsearch(!showsearch)}
              />
            ) : (
              <AiOutlineSearch
                size="24"
                color="#1890ff"
                onClick={() => setshowsearch(!showsearch)}
              />
            )}
            <Link to="/cart">
              <Badge
                style={{ backgroundColor: "#FF9F3E" }}
                count={cartItems.length}
                showZero
              >
                <CgShoppingCart size="24" color="#1890ff" />
              </Badge>
            </Link>
            <div className={showsearch ? "searchactive" : "searchphone"}>
              <Search
                placeholder="Search"
                allowClear
                enterButton
                size="large"
                onPressEnter={handleSearch}
                onSearch={handleSearch}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="search_box">
          <Search
            placeholder="Search"
            allowClear
            enterButton
            size="large"
            onPressEnter={handleSearch}
            onSearch={handleSearch}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        {!showicons && (
          <div className="Onright">
            <Link to="/register">
              <Button
                disabled={isLogged}
                className="Navbarbtns"
                id="Teacherbtn"
              >
                Become a Teacher
              </Button>
            </Link>
            <Popover content={content} style={{ cursor: "pointer" }}>
              <button className="Navbarbtns" id="Categoriesbtn">
                Categories
              </button>
            </Popover>
            <Link to="/cart">
              <Badge
                style={{ backgroundColor: "#FF9F3E" }}
                title="Your Cart"
                count={cartItems.length}
                showZero
              >
                <CgShoppingCart size="25" />
              </Badge>
            </Link>

            {isLogged ? (
              userLink()
            ) : (
              <button className="Btn" id="SignInbtn">
                <div id="spin"></div>
                <Link to="/login" className="linkinbtn">
                  {" "}
                  Log in
                </Link>
              </button>
            )}
            {/* </ul> */}
          </div>
        )}
      </nav>
      {showicons && (
        <Drawer
          title="EDUSPACE"
          placement={"left"}
          closable={true}
          onClose={onClose}
          visible={visbile}
          key={"left"}
        >
          <div className={isLogged ? "" : "onRightphone"}>
            <Link to="/register">
              <Button
                className="Navbarbtns"
                disabled={isLogged}
                id="Teacherbtn"
              >
                Become a Teacher
              </Button>
            </Link>
            <br />
            {isLogged ? (
              userLinkDrawer()
            ) : (
              <button className="Btn" id="SignInbtn">
                <div id="spin"></div>
                <Link to="/login" className="linkinbtn">
                  {" "}
                  Log in
                </Link>
              </button>
            )}
            <br />
            <h4>Most visited :</h4> <hr />
            {content}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default withRouter(Navbar);
