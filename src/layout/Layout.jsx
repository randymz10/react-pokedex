import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Header />
      <SearchBar />
      <Outlet />
    </>
  );
}

export default Layout;
