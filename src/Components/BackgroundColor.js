import React, { useEffect, useState } from "react";
import "../Assets/background.scss";
import { GithubPicker } from "react-color";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import {
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
function BackgroundColor({
  colorChange,
  fontIncrease,
  fontDecrease,
  handleFontChange,
  font,
  handleClose,
  layout,
  changeLayout,
}) {
  const colors = ["#FFF", "#F6F0F7", "#171717", "#FEFFE2"];
  const [currentColor, setCurrentColor] = useState();
  const [currentFont, setCurrentFont] = useState(font);
  const handleChange = (color, event) => {
    setCurrentColor(color);
  };
  const decreaseFont = () => {
    fontDecrease();
  };
  const increaseFont = () => {
    fontIncrease();
  };

  const fontChangeHandler = (e) => {
    setCurrentFont(e.target.value);
    handleFontChange(e);
  };

  useEffect(() => {
    colorChange(currentColor);
  }, [currentColor]);

  return (
    <div className="container">
      <IconButton className="close-btn">
        <CancelIcon fontSize="small" color="info" onClick={handleClose} />
      </IconButton>
      <div className="font-size">
        <h4>Font Size</h4>
        <div className="btn">
          <IconButton onClick={decreaseFont}>
            <RemoveCircleIcon color="primary" fontSize="large" />
          </IconButton>
          <IconButton onClick={increaseFont}>
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className="color-container">
        <h4>Background Color</h4>
        <GithubPicker
          color={currentColor}
          colors={colors}
          triangle="hide"
          width="150px"
          className="color-picker"
          onChange={handleChange}
        />
      </div>
      <div className="font-container">
        <h4>Font Family</h4>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentFont}
          onChange={fontChangeHandler}
          className="select"
        >
          <MenuItem value="arial" style={{ fontFamily: "arial" }}>
            Arial
          </MenuItem>
          <MenuItem
            value="Times New Roman"
            style={{ fontFamily: "Times New Roman" }}
          >
            Times New Roman
          </MenuItem>
          <MenuItem value="Verdana" style={{ fontFamily: "Verdana" }}>
            Verdana
          </MenuItem>
          <MenuItem
            value="Comic Sans Serif"
            style={{ fontFamily: "Comic Sans Serif" }}
          >
            Comic Sans Serif
          </MenuItem>
          <MenuItem value="Trebuchet MS" style={{ fontFamily: "Trebuchet MS" }}>
            Trebuchet MS
          </MenuItem>
        </Select>
      </div>
      <div className="layout-container">
        <h4>Layout</h4>
        <RadioGroup
          className="radio-btn"
          name="layout"
          value={layout}
          onChange={changeLayout}
        >
          <FormControlLabel
            value="paginated"
            control={<Radio />}
            label="Paginated"
          />
          <FormControlLabel
            value="scrolled"
            control={<Radio />}
            label="Scrolled"
          />
        </RadioGroup>
      </div>
    </div>
  );
}

export default BackgroundColor;
