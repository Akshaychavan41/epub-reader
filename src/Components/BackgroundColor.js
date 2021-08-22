import React, { useEffect, useState } from "react";
import "../Assets/background.scss";
import { GithubPicker } from "react-color";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { IconButton } from "@material-ui/core";
function BackgroundColor({ colorChange, fontIncrease, fontDecrease }) {
  const colors = ["#F6F0F7", "#171717", "#FEFFE2"];
  const [currentColor, setCurrentColor] = useState("#F6F0F7");
  const handleChange = (color, event) => {
    setCurrentColor(color);
  };
  const decreaseFont = () => {
    fontDecrease();
  };
  const increaseFont = () => {
    fontIncrease();
  };

  useEffect(() => {
    colorChange(currentColor);
  }, [currentColor]);

  return (
    <div className="container">
      <div className="font-size-container">
        <h3>Font Size</h3>
        <IconButton onClick={decreaseFont}>
          <RemoveCircleIcon color="secondary" fontSize="large" />
        </IconButton>
        <IconButton onClick={increaseFont}>
          <AddCircleIcon color="secondary" fontSize="large" />
        </IconButton>
      </div>
      <div>
        <h3>Background Color</h3>
        <GithubPicker
          color={currentColor}
          colors={colors}
          triangle="hide"
          width="100px"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default BackgroundColor;
