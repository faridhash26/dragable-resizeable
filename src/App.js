import React, { useState, useRef } from "react";

import logo from "./logo.svg";
import "./App.css";
import Card from "./component/Card";

function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [list, setList] = useState(["Item 1", "Item 2"]);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
  return (
    <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
      {list &&
        list.map((item, index) => (
          <Card
            key={index}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            title={item}
            index={index}
          />
        ))}
    </div>
  );
}

export default App;
