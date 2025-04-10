import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onMovieSelect={() => {}} />

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
