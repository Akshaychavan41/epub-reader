import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import book from "./Assets/Eloquent_JavaScript.epub";
import ePub, { Rendition, Location } from "epubjs";
import Reader from "./Components/Reader.js";
import Homepage from "./Components/Homepage";
const root = document.getElementById("root");

const onRelocated = (location) => {
  const cfi = location.start.cfi;
  localStorage.setItem("cfi", cfi);
};

const App = () => {
  const cfi = localStorage.getItem("cfi");
  return (
    <Homepage />
    //<Reader url={book} onRelocated={onRelocated} cfi={cfi} showPercentage />
  );
};

export default App;
