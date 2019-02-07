import React from "react";
import "./Title.css";

const Title = props => {
  return (
    <div className="titleStyle">
      <h1>{props.head} </h1>
      <h3>{props.subhead}</h3>
    </div>
  );
};

export default Title;
