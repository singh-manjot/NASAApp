import React, { Component } from "react";
import Title from "./Title/Title";
import UniverseElement from "./UniverseElement/UniverseElement";
import "./NasaApi.css";

class NasaApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: [],
      isFetching: true
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          api: result,
          isFetching: false
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

  render() {
    if (this.props.apiSelected === "Mars") {
      if (this.state.isFetching) {
        return <div>Loading</div>;
      } else {
        return (
          <div className="favApiStyle">
            <Title
              head="Mars Rover"
              subhead="This API is designed to collect image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars"
            />

            <UniverseElement
              key={this.state.api.photos[0].id}
              sol={this.state.api.photos[0].sol}
              camera={this.state.api.photos[0].camera.full_name}
              imgSrc={this.state.api.photos[0].img_src}
              eDate={this.state.api.photos[0].earth_date}
              apiName="Mars"
            />
          </div>
        );
      }
    }

    if (this.props.apiSelected === "Epic") {
      if (this.state.isFetching) {
        return <div>Loading............</div>;
      } else {
        return (
          <div>
            <Title
              head="Earth Polychromatic Imaging Camera"
              subhead="The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument."
            />
            <UniverseElement
              key={this.state.api[0].identifier}
              caption={this.state.api[0].caption}
              imgSrc={this.state.api[0].image}
              version={this.state.api[0].version}
              dateTime={this.state.api[0].date}
              apiName="Epic"
            />
          </div>
        );
      }
    }
    if (this.props.apiSelected === "Apod") {
      return (
        <div>
          <Title
            head="Astronomy Picture Of The Day"
            subhead={this.state.api.title}
          />
          <UniverseElement
            date={this.state.api.date}
            explanation={this.state.api.explanation}
            imgSrc={this.state.api.hdurl}
            fact="This picture is one of the most popular pictures across all federal agencies!"
            media={this.state.api.media_type}
            apiName="Apod"
          />
        </div>
      );
    }
  }
}

export default NasaApi;
