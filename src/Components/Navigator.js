import "../Assets/navigator.scss";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import BackgroundColor from "./BackgroundColor";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { IconButton } from "@material-ui/core";
export const Navigator = ({
  handleShowMore,
  handleBackground,
  fontDecrease,
  fontIncrease,
  visible,
  handleNext,
  handlePrev,
  percent,
  percentString = "$percent of this book",
}) => {
  const [showDialog, setShowDialog] = useState(false);
  if (!visible) return null;

  percent = Math.round(percent.toFixed(2) * 100);
  const percentStr = percentString.replace("$percent", percent + "%");

  return (
    <div className="navigator">
      <div className="more-info-area" onClick={handleShowMore}>
        <MenuIcon color="primary" fontSize="large" />
      </div>
      <IconButton className="icon">
        <ColorLensIcon
          fontSize="large"
          color="primary"
          onClick={() => setShowDialog((old) => !old)}
        />
      </IconButton>

      {showDialog && (
        <div className="background-area">
          <BackgroundColor
            fontDecrease={fontDecrease}
            fontIncrease={fontIncrease}
            colorChange={handleBackground}
          />
        </div>
      )}
      <div className="prev-area" onClick={handlePrev}></div>
      <div className="next-area" onClick={handleNext}></div>
      {percent ? <div className="page-number">{percentStr}</div> : null}
    </div>
  );
};

export default Navigator;
