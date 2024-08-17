import * as React from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <>
      <div className="container text-left">
        <Navbar />
      </div>
    </>
  );
};

export default Index;
const root = document.getElementById("root");
createRoot(root).render(<Index />);
