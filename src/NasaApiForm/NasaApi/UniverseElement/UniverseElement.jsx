import React, { Component } from "react";
import "./UniverseElement.css";
import { withRouter } from "react-router-dom";

class UniverseElement extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  render() {
    if (this.props.apiName === "Mars") {
      return (
        <div className="siteStyle">
          <h1>MARS</h1>
          <h1>Sol On Mars:{this.props.sol}</h1>
          <h3>Date on Earth:{this.props.eDate}</h3>
          <p>This image is from the MARS Rover's {this.props.camera}</p>
          <center>
            <img
              height="1200"
              width="1000"
              className="imgStyle"
              src={this.props.imgSrc}
              alt="mars-rover"
            />
            <br /> <br />
            <br /> <br />
            <button onClick={this.handleRefresh} className="submitStyle">
              Back to Form
            </button>
          </center>
          <br />
          <br />
        </div>
      );
    } else if (this.props.apiName === "Epic") {
      let date = this.props.dateTime.split(" ", 1);
      let day = date[0].split("-");

      let source = `https://api.nasa.gov/EPIC/archive/natural/${day[0]}/${
        day[1]
      }/${day[2]}/png/${
        this.props.imgSrc
      }.png?api_key=6oOYJwbqYzVk0lRtuaxczzyRjiLZ7sHqqJWnVPzS`;
      return (
        <div className="siteStyle">
          <p>{this.props.caption}</p>
          <p>This is version {this.props.version}</p>
          <center>
            <img
              className="imgStyle"
              height="1200"
              width="1000"
              src={source}
              alt="earth"
            />
            <br /> <br />
            <br /> <br />
            <button onClick={this.handleRefresh} className="submitStyle">
              Back to Form
            </button>
          </center>
          <br />
          <br />
        </div>
      );
    } else if (this.props.apiName === "Apod") {
      if (this.props.media === "image") {
        return (
          <div className="siteStyle">
            <h3>Version: {this.props.version}</h3>
            <h2>Date on Earth:{this.props.date}</h2>
            <p>
              {this.props.explanation}
              {this.props.camera} <br />
              <br />
              <br />
              Fun Fact:{this.props.fact}
            </p>
            <center>
              <img
                height="1200"
                width="1000"
                className="imgStyle"
                src={this.props.imgSrc}
                alt="universe"
              />
              <br />
              <br />
              <br />
              <br />

              <button onClick={this.handleRefresh} className="submitStyle">
                Back to Form
              </button>
            </center>
            <br />
            <br />
          </div>
        );
      } else {
        return (
          <div className="siteStyle">
            <h2>Date on Earth:{this.props.date}</h2>
            <p>
              {this.props.explanation}
              {this.props.camera}
            </p>
            <center>
              This video is only available on NASA's website. Go watch it before
              the daily reset!!!
              <br /> <br />
              <br /> <br />
              <button onClick={this.handleRefresh} className="submitStyle">
                Back to Form
              </button>
            </center>
            <br />
            <br />
          </div>
        );
      }
    }
  }

  handleRefresh() {
    window.location.reload();
  }
}

export default withRouter(UniverseElement);
