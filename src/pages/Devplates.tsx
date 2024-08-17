import * as React from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar";

const Devplates = () => {
  return (
    <>
      <div className="container text-left">
        <Navbar />
      </div>
    </>
  );
};

export default Devplates;
const root = document.getElementById("root");
createRoot(root).render(<Devplates />);
