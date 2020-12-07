import React from "react";
import "../../../global.css";
import { withRouter } from "react-router-dom";

const UniverseElement = (props) => {
  let pageContent;
  switch (props.apiName) {
    case "Mars":
      pageContent = (
        <>
          <h1>MARS</h1>
          <h1>Sol On Mars:{props.sol}</h1>
          <h3>Date on Earth:{props.eDate}</h3>
          <p>This image is from the MARS Rover's {props.camera}</p>
          <img
            height="1200"
            width="1000"
            className="imgStyle"
            src={props.imgSrc}
            alt="mars-rover"
          />
        </>
      );
      break;
    case "Epic":
      let date = props.dateTime.split(" ", 1);
      let day = date[0].split("-");
      let source = `https://api.nasa.gov/EPIC/archive/natural/${day[0]}/${day[1]}/${day[2]}/png/${props.imgSrc}.png?api_key=6oOYJwbqYzVk0lRtuaxczzyRjiLZ7sHqqJWnVPzS`;
      pageContent = (
        <>
          <p>
            {props.caption} (image version {props.version})
          </p>
          <img
            className="imgStyle"
            height="1200"
            width="1000"
            src={source}
            alt="earth"
          />
    
        </>
      );
      break;
    case "Apod":
      pageContent =
        props.media === "image" ? (
          <>
            {props.version && <h3>Version:{props.version} </h3>}
            <h2>Date on Earth:{props.date}</h2>
            <p>
              {props.explanation}
              {props.camera} 
              Fun Fact:{props.fact}
            </p>
            <img
              height="1200"
              width="1000"
              className="imgStyle"
              src={props.imgSrc}
              alt="universe"
            />
          </>
        ) : (
          <>
            <h2>Date on Earth:{props.date}</h2>
            <p>
              {props.explanation}
              {props.camera}
            </p>
            This video is only available on NASA's website. Go watch it before
            the daily reset!!!

          </>
        );
      break;

    default:
      pageContent = <></>;
      break;
  }

  return (
    <div className="siteStyle">
      {pageContent}
      <button onClick={() => window.location.reload()} className="submitStyle">
        Return to Home Page
      </button>
    </div>
  );
};

export default withRouter(UniverseElement);
