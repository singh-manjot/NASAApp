import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NasaApiForm from "./NasaApiForm/NasaApiForm";
import UniverseElement from "./NasaApiForm/NasaApi/UniverseElement/UniverseElement";
import NasaApi from "./NasaApiForm/NasaApi/NasaApi";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={NasaApiForm} />
        <Route path="/getInfo/" component={NasaApi} />
        <Route path="/results" component={UniverseElement} />
      </div>
    </Router>
  );
};

export default AppRouter;
