import React, { useState } from "react";
import NasaApi from "./NasaApi/NasaApi";
import "../global.css";
import { withRouter } from "react-router-dom";

const NasaApiForm = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [apiName, setApiName] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  const changeApiDescription = () => {
    let apiName = document.getElementById("apiName");
    let descApi = apiName.options[apiName.selectedIndex].value;

    if (descApi === "Apod") {
      document.getElementById("description").innerHTML =
        "Click Submit for Astronomy Picture/Video of the Day along with a brief description of the picture!";
    }

    if (descApi === "Mars") {
      document.getElementById("description").innerHTML =
        "Click Submit for a cool picture of planet MARS !!!";
    }

    if (descApi === "Epic") {
      document.getElementById("description").innerHTML =
        "Click Submit for a picture of our very own home planet from NASA's satellite!!!";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let urlToPass = "";
    let apiName = document.getElementById("apiName");
    let selectedApi = apiName.options[apiName.selectedIndex].value;

    switch (selectedApi) {
      case "Apod":
        urlToPass = "https://api.nasa.gov/planetary/apod?hd=true&api_key=";
        break;
      case "Mars":
        urlToPass =
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=";
        break;
      case "Epic":
        urlToPass = "https://api.nasa.gov/EPIC/api/natural?api_key=";
        break;
      default:
        urlToPass = "https://api.nasa.gov/planetary/apod?api_key=";
        break;
    }

    urlToPass += apiKey;

    fetch(urlToPass)
      .then((response) => handleHTTPErrors(response))
      .then(() => {
        setApiUrl(urlToPass);
        setApiName(selectedApi);
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHTTPErrors = (response) => {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  };

  const form = showForm ? (
    <div className="form">
      <h1 className="title">Welcome to NASA's guide to the Universe</h1>
      <form onSubmit={(event) => handleSubmit(event)} className="favFormStyle">
        <h3>Please select a topic from the list below:</h3>
        <select id="apiName" onChange={changeApiDescription}>
          <option value="Epic">Earth Polychromatic Imaging Camera</option>
          <option value="Mars">Mars Rover</option>
          <option value="Apod">Astronomy Picture Of The Day</option>
        </select>
        <div id="description">
          Click Submit for a picture of our very own home planet from NASA's
          satellite!!!
        </div>
        <input type="submit" value="Submit" className="submitStyle" />
      </form>
    </div>
  ) : (
    <NasaApi url={apiUrl} apiSelected={apiName} />
  );
  return form;
};

export default withRouter(NasaApiForm);
