import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "My Pizza App"),
    React.createElement("p", null, "Welcome to my pizza app!"),
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));
