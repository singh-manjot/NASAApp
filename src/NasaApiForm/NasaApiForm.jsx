import React, { Component } from "react";
import NasaApi from "./NasaApi/NasaApi";
import "./NasaApiForm.css";
import Title from "./NasaApi/Title/Title";

class NasaApiForm extends Component {
  constructor(props) {
    super(props);
    this.handleApiCheck = this.handleApiCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      apiUrl: "",
      showForm: true,
      api: {},
      apiKey:"",                      ////////////////////////INSERT YOUR KEY HERE
      apiName: ""
    };
  }

  render() {
    if (this.state.showForm) {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <Title
            head="Welcome to Max's guide to the Universe"
            subhead="I mean NASA's guide to the Universe"
          />
          <form onSubmit={this.handleSubmit} className="favFormStyle">
            <h4>Select a topic from the list below:</h4>
            <select id="apiName" onChange={this.handleApiCheck}>
              <option value="Epic">Earth Polychromatic Imaging Camera</option>
              <option value="Mars">Mars Rover</option>
              <option value="Apod">Astronomy Picture Of The Day</option>
            </select>
            <br />
            <br />
            <br />
            <br />
            <div className="favFormStyle" id="description">
              Click Submit for a picture of our very own earth from NASA's
              satellite!!!
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input type="submit" value="Submit" className="submitStyle" />
            <br />
            <br />
          </form>
        </div>
      );
    } else {
      return (
        <NasaApi url={this.state.apiUrl} apiSelected={this.state.apiName} />
      );
    }
  }

  handleApiCheck(event) {
    let selectedapi = this.state.api;
    selectedapi[event.target.value] = event.target.checked;
    this.setState({
      api: selectedapi
    });
    let a = document.getElementById("apiName");
    let descApi = a.options[a.selectedIndex].value;

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
        "Click Submit for a picture of our very own earth from NASA's satellite!!!";
    }
  }

  handleSubmit(event) {
    var urlToPass = "";

    event.preventDefault();
    let e = document.getElementById("apiName");
    let selectedApi = e.options[e.selectedIndex].value;
    if (selectedApi === "Apod") {
      urlToPass =
        "https://api.nasa.gov/planetary/apod?api_key=" + this.state.apiKey;
    }

    if (selectedApi === "Mars") {
      urlToPass =
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=" +
        this.state.apiKey;
    }
    if (selectedApi === "Epic") {
      urlToPass =
        "https://api.nasa.gov/EPIC/api/natural?api_key=" + this.state.apiKey;
    }

    fetch(urlToPass)
      .then(response => this.handleHTTPErrors(response))
      .then(() => {
        this.setState({
          apiUrl: urlToPass,
          apiName: selectedApi,
          showForm: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }
}

export default withRouter(NasaApiForm);
