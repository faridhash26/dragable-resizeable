import React, { useState } from "react";

const Card = (props) => {
  const [drag, setDrag] = useState({
    active: false,
    x: "",
    y: "",
  });

  const [dims, setDims] = useState({
    w: 200,
    h: 200,
  });

  const boxStyle = {
    width: `${dims.w}px`,
    height: `${dims.h}px`,
  };

  const startResize = (e) => {
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const resizeFrame = (e) => {
    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const yDiff = Math.abs(y - e.clientY);
      const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;
      const newH = y > e.clientY ? dims.h + yDiff : dims.h - yDiff;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      setDims({ w: newW, h: newH });
    }
  };

  const stopResize = (e) => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        margin: "20px 25%",
        textAlign: "center",
        fontSize: "40px",
      }}
      //   className="container"
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}
      onDragStart={(e) => props.onDragStart(e)}
      onDragEnter={(e) => props.onDragEnter(e)}
      onDragEnd={props.onDragEnd}
      draggable
    >
      <div className="box" style={boxStyle}>
        <button className="dragger" onMouseDown={startResize}>
          {props.title}
        </button>
      </div>
    </div>
  );
};

export default Card;
