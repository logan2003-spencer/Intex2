import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React from "react";

const MainLayout: React.FC = () => {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    );
  };
  

export default MainLayout;
