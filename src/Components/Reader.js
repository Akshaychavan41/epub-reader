import "../Assets/reader.scss";
import React, { useEffect, useRef, useState } from "react";
import ePub, { Rendition, Location } from "epubjs";
import Navigator from "./Navigator.js";
import More from "./More.js";
import Loader from "./Loader.js";
// import { useSwipeable, Swipeable } from "react-swipeable";

export default function Reader({
  url,
  initialFontSize,
  fontFamily,
  fontColor,
  onLoad,
  onNext,
  onPrev,
  onRelocated,
  showPercentage = true,
  percentString,
  className = "",
  cfi,
  renderChapters,
}) {
  const ref = useRef(null);
  const [rendition, setRendition] = useState(null);
  const [isMoreShow, setIsMoreShow] = useState(false);
  const [info, setInfo] = useState();
  const [fontSize, setfontSize] = useState(12);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    console.log(el);

    if (!el) return;
    const ebook = ePub(url);
    const rendition = ebook.renderTo(el, {
      flow: "paginated",
      width: "100%",
      height: "100%",
    });
    onReaderLoad(ebook, rendition);
  }, []);

  const onReaderLoad = (ebook, rendition) => {
    if (!rendition) return;
    setRendition(rendition);

    cfi ? rendition.display(cfi) : rendition.display();

    setupStyles(rendition);

    ebook.ready.then(async () => {
      const { package: { metadata = {} } = {} } = ebook;
      setInfo(metadata);

      await ebook.locations.generate(1600);

      onLoad && onLoad(rendition);
      onRelocated && rendition.on("relocated", handleRelocated(ebook));
    });
  };

  const setupStyles = (rendition) => {
    fontSize &&
      rendition.themes.default({
        p: { "font-size": `${fontSize} !important` },
      });
    fontColor &&
      rendition.themes.default({ p: { color: `${fontColor} !important` } });
    fontFamily &&
      rendition.themes.default({
        p: { fontFamily: `${fontFamily} !important` },
      });
  };

  const handleRelocated = (ebook) => (location) => {
    onRelocated(location);

    const percent = ebook.locations.percentageFromCfi(location.start.cfi);
    setPercent(percent);
  };

  const handleShowMore = () => setIsMoreShow(true);
  const handleHideMore = () => setIsMoreShow(false);

  const handleNext = () => {
    if (!rendition) return;
    rendition.next();
    onNext && onNext(rendition);
  };

  const handleBackgroundChange = (color) => {
    console.log(rendition.themes.default(), color);
    if (rendition) {
      if (color.hex == "#171717") {
        rendition.themes.default({
          body: { background: `${color.hex} !important` },
          "*": { color: "white !important" },
        });
      } else {
        rendition.themes.default({
          body: { background: `${color.hex} !important` },
          "*": { color: "black !important" },
        });
      }
    }
  };

  useEffect(() => {
    rendition && rendition.themes.fontSize(`${fontSize}px`);
  }, [fontSize]);

  const handleFontIncrease = () => {
    setfontSize((old) => old + 2);
  };
  const handleFontDecrease = () => {
    setfontSize((old) => old - 2);
  };

  const handlePrev = () => {
    if (!rendition) return;
    rendition.prev();
    onPrev && onPrev(rendition);
  };

  const handleSwipe = (eventData) => {
    const { dir } = eventData;
    if (dir === "Left") handleNext();
    if (dir === "Right") handlePrev();
  };

  return (
    <div>
      <div onSwiped={handleSwipe} className="react-epubjs">
        {!rendition && <Loader />}
        <Navigator
          handleShowMore={handleShowMore}
          visible={true}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleBackground={handleBackgroundChange}
          fontDecrease={handleFontDecrease}
          fontIncrease={handleFontIncrease}
          percent={showPercentage ? percent : null}
          percentString={percentString}
        />
        <More
          info={info}
          rendition={rendition}
          visible={isMoreShow}
          handleHideMore={handleHideMore}
          renderChapters={renderChapters}
        />
        <div
          className={`reader ${className} ${showPercentage ? "pb-25" : ""}`}
          ref={ref}
        />
      </div>
    </div>
  );
}
