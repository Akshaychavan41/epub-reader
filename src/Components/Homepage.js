import React, { useState } from "react";
import "../Assets/homepage.scss";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Divider, Typography } from "@material-ui/core";
import ePub, { Rendition, Location } from "epubjs";
import { Input } from "@material-ui/core";
import Reader from "./Reader.js";
import book from "../Assets/Eloquent_JavaScript.epub";
import { ReactComponent as Reading1 } from "../Assets/svg/reading1.svg";
import { ReactComponent as Reading2 } from "../Assets/svg/reading2.svg";
import { ReactComponent as EbookLogo } from "../Assets/svg/ebooklogo.svg";
function Homepage(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [showBook, setShowBook] = useState(false);
  const cfi = localStorage.getItem("cfi");
  const fileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onRelocated = (location) => {
    const cfi = location.start.cfi;
    localStorage.setItem("cfi", cfi);
  };

  const fileUpload = () => {
    if (selectedFile?.name) {
      const fileExtension = selectedFile.name.split(".").pop();
      if (fileExtension === "epub") {
        setShowBook(true);
      }
    }
  };
  const readSampleBook = () => {
    setSelectedFile(book);
    setShowBook(true);
  };

  return (
    <div className="home-container">
      {!showBook && (
        <div className="background">
          <div className="img-container">
            <EbookLogo className="logo" />
            <Reading1 className="img" />
          </div>
          <div className="card-container">
            <Card className="card-root" variant="outlined">
              <Reading2 className="img" />
              <CardContent>
                <Typography
                  component="h1"
                  className="card-title"
                  color="textPrimary"
                  variant="h5"
                  gutterBottom
                >
                  Upload a Epub file to get Started
                </Typography>
              </CardContent>
              <CardActions>
                <Input type="file" onChange={fileChange} />
              </CardActions>
              <CardActions>
                <Button
                  type="file"
                  color="primary"
                  variant="contained"
                  onClick={fileUpload}
                >
                  Start Reading
                </Button>
              </CardActions>

              <h4 className="divider">------------ OR ------------</h4>
              <CardActions>
                <Button
                  type="file"
                  color="primary"
                  variant="contained"
                  onClick={readSampleBook}
                >
                  Read Sample JS Books
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      )}
      {showBook && (
        <Reader
          url={selectedFile}
          onRelocated={onRelocated}
          cfi={cfi}
          showPercentage
          handleClose={() => setShowBook(false)}
        />
      )}
    </div>
  );
}

export default Homepage;
