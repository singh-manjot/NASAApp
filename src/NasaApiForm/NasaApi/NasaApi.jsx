import React, { useState, useEffect } from "react";
import UniverseElement from "./UniverseElement/UniverseElement";
import "../../global.css";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";

const NasaApi = (props) => {
  const [api, setApi] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleHTTPErrors = (response) => {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  };
  useEffect(() => {
    fetch(props.url)
      .then((response) => handleHTTPErrors(response))
      .then((response) => response.json())
      .then((result) => {
        setApi(result);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.url]);

  const override = css`
    display: block;
    margin: auto;
    text-align:center;
  `;

  let pageContent = (
    <RingLoader size={100} color={"#b7bec9"} loading={isFetching} css={override}/>
  );

  if (!isFetching) {
    switch (props.apiSelected) {
      case "Mars":
        pageContent = (
          <>
            <h1 className="title">Mars Rover</h1>
            <p>
              This API is designed to collect image data gathered by NASA's
              Curiosity, Opportunity, and Spirit rovers on Mars
            </p>
            <UniverseElement
              key={api.photos[0].id}
              sol={api.photos[0].sol}
              camera={api.photos[0].camera.full_name}
              imgSrc={api.photos[0].img_src}
              eDate={api.photos[0].earth_date}
              apiName="Mars"
            />
          </>
        );
        break;
      case "Epic":
        pageContent = (
          <>
            <h1 className="title">Earth Polychromatic Imaging Camera (EPIC)</h1>
            <p>
              The EPIC API provides information on the daily imagery collected
              by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument.
            </p>
            <UniverseElement
              key={api[0].identifier}
              caption={api[0].caption}
              imgSrc={api[0].image}
              version={api[0].version}
              dateTime={api[0].date}
              apiName="Epic"
            />
          </>
        );
        break;
      case "Apod":
        pageContent = (
          <>
            <h1 className="title">Astronomy Picture Of The Day</h1>
            <p>{api.title}</p>
            <UniverseElement
              date={api.date}
              explanation={api.explanation}
              imgSrc={api.hdurl}
              fact="This picture is one of the most popular pictures across all federal agencies!"
              media={api.media_type}
              apiName="Apod"
            />
          </>
        );
        break;
      default:
        break;
    }
  }

  return <div className="form">{pageContent}</div>;
};

export default NasaApi;
