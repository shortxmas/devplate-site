import * as React from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar";
import Devplates from "../components/Devplates";

const Index = () => {
  return (
    <>
      <div className="container text-left">
        <Navbar />
        <Devplates/>
      </div>
    </>
  );
};

export default Index;
const root = document.getElementById("root");
createRoot(root).render(<Index />);
