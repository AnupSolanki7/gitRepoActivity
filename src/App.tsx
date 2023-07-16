import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routing from "./route/routing";


function App() {
  const route = useRoutes(routing());

  return <div className="App">{route}</div>;
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
