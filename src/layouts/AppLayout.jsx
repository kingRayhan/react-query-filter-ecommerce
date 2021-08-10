import React from "react";
import Navbar from "../components/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <Navbar />
      <main className="my-20">{children}</main>
    </div>
  );
};

export default AppLayout;
