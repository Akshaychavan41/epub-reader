import "../Assets/navigator.scss";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import BackgroundColor from "./BackgroundColor";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CancelIcon from "@material-ui/icons/Cancel";
export const Navigator = ({
  handleShowMore,
  handleBackground,
  fontDecrease,
  fontIncrease,
  visible,
  handleNext,
  handlePrev,
  handleClose,
  percent,
  percentString = "$percent of this book",
  handleFontChange,
  font,
  layout,
  changeLayout,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  if (!visible) return null;

  percent = Math.round(percent.toFixed(2) * 100);
  const percentStr = percentString.replace("$percent", percent + "%");

  return (
    <div className="navigator">
      <div className="more-info-area" onClick={handleShowMore}>
        <MenuIcon color="primary" fontSize="medium" />
      </div>
      <div className="icon-container">
        <IconButton>
          <CancelIcon
            fontSize="large"
            color="secondary"
            onClick={handleClose}
          />
        </IconButton>
        <IconButton>
          <ColorLensIcon
            fontSize="large"
            color="primary"
            onClick={() => setShowDialog((old) => !old)}
          />
        </IconButton>
      </div>

      {showDialog && (
        <div className="background-area">
          <BackgroundColor
            fontDecrease={fontDecrease}
            fontIncrease={fontIncrease}
            colorChange={handleBackground}
            handleFontChange={handleFontChange}
            font={font}
            handleClose={() => setShowDialog(false)}
            layout={layout}
            changeLayout={changeLayout}
          />
        </div>
      )}
      <div className="prev-area" onClick={handlePrev}>
        <NavigateBeforeIcon fontSize="large" />
      </div>
      <div className="next-area" onClick={handleNext}>
        <NavigateNextIcon fontSize="large" />
      </div>
      {percent ? <div className="page-number">{percentStr}</div> : null}
    </div>
  );
};

export default Navigator;
