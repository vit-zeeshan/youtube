import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import categories from "../utils/categories";
import Navbar from "./Navbar";
import { setSelectedCategory } from "../redux/categorySlice";
import Menu from "../assets/Menu";
import logo from "../assets/ytLogo.png";
import { Link } from "react-router-dom";
import { setSidebarExtendedValue } from "../redux/categorySlice";

function Sidebar() {
  const pageRoute = useNavigate();
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.category);
  const [sidebarExtended, setSidebarExtended] = useState(false);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleCategoryClick = (e) => {
    dispatch(setSelectedCategory(e.name));
    if (sidebarExtended) {
      dispatch(setSidebarExtendedValue(false));
      setSidebarExtended(false);
    }
    if (e.name === "Home") {
      pageRoute(`/`);
    } else {
      pageRoute(`/feed/${e.name}`);
    }
  };

  return (
    <>
      <Navbar
        sidebarExtended={sidebarExtended}
        setSidebarExtended={setSidebarExtended}
      />
      <div
        className={`absolute w-[10%] bg-[#fff] top-20 hidden sm:block ${
          darkMode ? "text-white" : ""
        }`}
      >
        <div className="flex flex-col gap-y-6 fixed z-20">
          {categories.map((e) => {
            if (sidebarExtended) {
              return (
                <button
                  onClick={() => handleCategoryClick(e)}
                  key={e.id}
                >
                  <div
                    style={{
                      backgroundColor:
                        selectedCategory === e.name
                          ? darkMode
                            ? "rgba(255,255,255,0.5)"
                            : "#f2f2f2"
                          : darkMode
                          ? "#131417"
                          : "#fff",
                      borderRadius:
                        selectedCategory === e.name ? "10px" : "0px",
                    }}
                    className="flex items-center gap-x-4 ml-2 px-2 py-2"
                  >
                    {selectedCategory === e.name ? e.active : e.icon}

                    <h4 className="text-md font-semibold tracking-wide">
                      {e.name}
                    </h4>
                  </div>
                </button>
              );
            } else {
              return (
                <button
                  onClick={() => handleCategoryClick(e)}
                  key={e.id}
                >
                  <div
                    style={{
                      backgroundColor:
                        selectedCategory === e.name
                          ? darkMode
                            ? "rgba(255,255,255,0.5)"
                            : "#f2f2f2"
                          : darkMode
                          ? "#131417"
                          : "#fff",
                      borderRadius:
                        selectedCategory === e.name ? "10px" : "0px",
                    }}
                    className="flex items-center gap-x-4 ml-2 px-2 py-2"
                  >
                    {selectedCategory === e.name ? e.active : e.icon}
                  </div>
                </button>
              );
            }
          })}
        </div>
      </div>
      <div className="block sm:hidden bg-[#ffff] top-0 fixed z-10 transition ease-in-out delay-150 h-[100vh]">
        <div
          className={`${
            sidebarExtended ? "block" : "hidden"
          } flex items-center space-x-4 ml-3 -mt-4 pl-2`}
        >
          <button
            onClick={() => {
              dispatch(setSidebarExtendedValue(!sidebarExtended));
              setSidebarExtended(!sidebarExtended);
            }}
          >
            <Menu />
          </button>
          <Link to="/">
            <img className="w-32" src={logo} alt="YouTube Logo" />
          </Link>
        </div>
        <div className="flex flex-col gap-y-6">
          {categories.map((e) =>
            sidebarExtended ? (
              <button
                onClick={() => handleCategoryClick(e)}
                key={e.id}
              >
                <div
                  style={{
                    backgroundColor:
                      selectedCategory === e.name
                        ? "#f2f2f2"
                        : darkMode
                        ? "#131417"
                        : "#fff",
                    borderRadius: selectedCategory === e.name ? "10px" : "0px",
                  }}
                  className="flex items-center gap-x-4 ml-2 px-2 py-2"
                >
                  {selectedCategory === e.name ? e.active : e.icon}

                  <h4 className="text-md font-semibold tracking-wide">
                    {e.name}
                  </h4>
                </div>
              </button>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
